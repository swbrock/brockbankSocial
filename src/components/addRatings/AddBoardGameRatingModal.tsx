"use client";
import React, { useEffect, useState } from "react";
import WheelSlider from "../WheelSlider";
import { useRouter } from "next/navigation"; // Import useRouter
import { BoardGameRatingResponses } from "@/lib/content";
import { getBoardGamesNotRatedByUser } from "@/lib/actions"; // Import the function to fetch board games
import { set } from "zod";

interface BoardGameProfileProps {
    id: number;
    name: string;
    difficulty: string | null;
    timesPlayed: number | null;
    rating: number | null;
}

// Props interface for the modal
export interface RatingModalProps {
    boardGame?: BoardGameProfileProps | null;
    userId: string;
    onClose: () => void;
    userRating?: number | null;
    setSuccess?: (value: React.SetStateAction<boolean>) => void;
    setError?: (value: React.SetStateAction<string | null>) => void;
}

const AddBoardGameRatingModal: React.FC<RatingModalProps> = ({
    boardGame,
    userId,
    userRating,
    onClose,
    setSuccess,
    setError,
}) => {
    const router = useRouter(); // Get the router instance
    const [boardGames, setBoardGames] = useState<BoardGameProfileProps[]>([]); // Set the board games
    const [selectedBoardGame, setSelectedBoardGame] = useState<BoardGameProfileProps | null>(boardGame || null); // Set the selected board game

    const [ratings, setRatings] = useState({
        gameplayMechanics: 0,
        funFactor: 0,
        strategyAndDepth: 0,
        replayability: 0,
        themeAndAesthetics: 0,
    });

    useEffect(() => {
        if (!boardGame) {
            const fetchBoardGames = async () => {
                const fetchedBoardGames = await getBoardGamesNotRatedByUser(userId);
                setBoardGames(fetchedBoardGames);
            };
            fetchBoardGames();
        }
    }, [boardGame, userId]);

    const getRandomResponseForRange = (range: string) => {
        const filteredResponses = BoardGameRatingResponses.find(
            (res) => res.range === range
        );
        if (filteredResponses) {
            const randomIndex = Math.floor(
                Math.random() * filteredResponses.responses.length
            );
            return filteredResponses.responses[randomIndex];
        }
        return null;
    };

    // Handle rating change for each category
    const handleChange = (category: string, value: number) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };

    const submitNewBoardGameRating = async (newRating: number) => {
        try {
            // Submit the rating
            const response = await fetch("/api/ratings/boardGames", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    boardGameId: selectedBoardGame?.id,
                    rating: newRating,
                    userId: userId,
                }),
            });

            if (!response.ok) {
                setError && setError("Failed to submit rating");
                throw new Error("Failed to submit rating");
            } else {
                setSuccess && setSuccess(true);
                console.log("Rating submitted successfully!");
            }

            const ratingRange = `${Math.floor(newRating)}-${Math.ceil(
                newRating
            )}`; // Determine the range
            const randomResponse = getRandomResponseForRange(ratingRange);

            if (!randomResponse) {
                throw new Error("Invalid rating range");
            }
            const title = randomResponse.title;

            const content = userRating
                ? `Rating has been updated to ${newRating.toFixed(2)} for ${
                      selectedBoardGame?.name
                  }. ${randomResponse.response}`
                : `A new rating of ${newRating.toFixed(
                      2
                  )} has been submitted for ${selectedBoardGame?.name}. ${
                      randomResponse.response
                  }`;

            // Submit a new post after the rating is saved
            const postResponse = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    content: content,
                    entityId: selectedBoardGame?.id,
                    entityType: "boardGame",
                }),
            });

            if (!postResponse.ok) {
                throw new Error("Failed to submit post");
            } else {
                console.log("Post submitted successfully!");
            }

            onClose(); // Close the modal
            router.refresh(); // Reload the page to see the new rating
        } catch (error) {
            console.error("Error submitting rating or post:", error);
            alert("Failed to submit rating or post. Please try again.");
            setError && setError("Failed to submit rating or post.");
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        // Check if all categories are rated with a value between 0 and 5
        const isValid = Object.values(ratings).every(
            (value) => value >= 0 && value <= 5
        );

        const averageRating = // Calculate the average rating
            //make it to 1 decimal place
            parseFloat(
                (Object.values(ratings).reduce((a, b) => a + b, 0) / 5).toFixed(
                    1
                )
            );

        if (isValid) {
            submitNewBoardGameRating(averageRating);
        } else {
            alert(
                "Please provide valid ratings between 0 and 5 for all categories."
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                {/* Board Game selection */}
                {!boardGame && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Select a Board Game</h2>
                        <select
                            className="w-full p-2 rounded-md border border-gray-300 mb-4"
                            onChange={(e) => {
                                const selected = boardGames.find(
                                    (m) => m.id === parseInt(e.target.value)
                                );
                                setSelectedBoardGame(selected ?? null);
                            }}
                        >
                            <option value="">Select a board game...</option>
                            {boardGames.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Board Game rating */}
                {selectedBoardGame && (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4">Rate This Board Game</h2>

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.gameplayMechanics}
                                onChange={(value) =>
                                    handleChange("gameplayMechanics", value)
                                }
                                max={5}
                                min={0}
                                step={0.1}
                                label="Gameplay Mechanics"
                            />
                        </div>

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.funFactor}
                                onChange={(value) => handleChange("funFactor", value)}
                                max={5}
                                min={0}
                                step={0.1}
                                label="Fun Factor"
                            />
                        </div>

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.strategyAndDepth}
                                onChange={(value) =>
                                    handleChange("strategyAndDepth", value)
                                }
                                max={5}
                                min={0}
                                step={0.1}
                                label="Strategy & Depth"
                            />
                        </div>

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.replayability}
                                onChange={(value) =>
                                    handleChange("replayability", value)
                                }
                                max={5}
                                min={0}
                                step={0.1}
                                label="Replayability"
                            />
                        </div>

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.themeAndAesthetics}
                                onChange={(value) =>
                                    handleChange("themeAndAesthetics", value)
                                }
                                max={5}
                                min={0}
                                step={0.1}
                                label="Theme & Aesthetics"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                className="bg-gray-400 text-white p-2 rounded"
                                onClick={onClose} // Close modal on cancel
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleSubmit} // Submit the ratings
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddBoardGameRatingModal;
