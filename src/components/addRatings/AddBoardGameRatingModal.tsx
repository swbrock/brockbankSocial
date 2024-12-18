import React, { useEffect, useState } from "react";
import WheelSlider from "../WheelSlider";
import { useRouter } from "next/navigation"; // Import useRouter
import { BoardGameRatingResponses } from "@/lib/content";

interface Post {
    id: number;
    title: string;
    content: string;
}

interface BoardGameProfileProps {
    id: number;
    name: string;
    difficulty: string | null;
    timesPlayed: number | null;
    rating: number | null;
    Post: Post[];
}
// Props interface for the modal
export interface RatingModalProps {
    currentRating: any;
    boardGame: BoardGameProfileProps;
    userId: string;
    onClose: () => void;
    userRating: number | null;
}

const AddBoardGameRatingModal: React.FC<RatingModalProps> = ({
    currentRating,
    boardGame,
    userId,
    userRating,
    onClose,
}) => {
    const router = useRouter(); // Get the router instance

    const [ratings, setRatings] = useState({
        gameplayMechanics: currentRating?.gameplayMechanics || 0,
        funFactor: currentRating?.funFactor || 0,
        strategyAndDepth: currentRating?.strategyAndDepth || 0,
        replayability: currentRating?.replayability || 0,
        themeAndAesthetics: currentRating?.themeAndAesthetics || 0,
    });

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
                    boardGameId: boardGame.id,
                    rating: newRating,
                    userId: userId,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit rating");
            } else {
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
                      boardGame.name
                  }. ${randomResponse.response}`
                : `A new rating of ${newRating.toFixed(
                      2
                  )} has been submitted for ${boardGame.name}. ${
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
                    entityId: boardGame.id,
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
                <h2 className="text-xl font-semibold mb-4">
                    Rate This Board Game
                </h2>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.gameplayMechanics}
                        onChange={(value) =>
                            handleChange("gameplayMechanics", value)
                        }
                        max={5}
                        step={0.1}
                        min={0}
                        label={"Gameplay Mechanics"}
                    />
                </div>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.funFactor}
                        onChange={(value) => handleChange("funFactor", value)}
                        step={0.1}
                        min={0}
                        max={5}
                        label={"Fun Factor"}
                    />
                </div>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.strategyAndDepth}
                        onChange={(value) =>
                            handleChange("strategyAndDepth", value)
                        }
                        step={0.1}
                        min={0}
                        max={5}
                        label={"Strategy & Depth"}
                    />
                </div>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.replayability}
                        onChange={(value) =>
                            handleChange("replayability", value)
                        }
                        step={0.1}
                        min={0}
                        max={5}
                        label={"Replayability"}
                    />
                </div>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.themeAndAesthetics}
                        onChange={(value) =>
                            handleChange("themeAndAesthetics", value)
                        }
                        step={0.1}
                        min={0}
                        max={5}
                        label={"Theme & Aesthetics"}
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
        </div>
    );
};

export default AddBoardGameRatingModal;
