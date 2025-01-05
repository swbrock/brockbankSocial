import React, { useState } from "react";
import WheelSlider from "../WheelSlider";
import { BookRatingResponses } from "@/lib/content";
import { useRouter } from "next/navigation";

// Props interface for the modal

interface BookProfileProps {
    id: number;
    name: string;
    rating: number | null;
}

export interface RatingModalProps {
    book: BookProfileProps;
    userId: string;
    onClose: () => void;
    userRating: number | null;
}

const AddBookRatingModal: React.FC<RatingModalProps> = ({
    book,
    userId,
    userRating,
    onClose,
}) => {
    const router = useRouter(); // Get the router instance

    const [ratings, setRatings] = useState({
        plot: 0,
        characterDevelopment: 0,
        writingStyle: 0,
        emotionalImpact: 0,
        originality: 0,
    });

    const getRandomResponseForRange = (range: string) => {
        const filteredResponses = BookRatingResponses.find(
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

    const submitNewBookRating = async (newRating: number) => {
        try {
            // Submit the rating
            const response = await fetch("/api/ratings/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookId: book.id,
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
                      book.name
                  }. ${randomResponse.response}`
                : `A new rating of ${newRating.toFixed(
                      2
                  )} has been submitted for ${book.name}. ${
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
                    entityId: book.id,
                    entityType: "book",
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

    // Handle rating change for each category
    const handleChange = (category: string, value: number) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };
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
            submitNewBookRating(averageRating);
        } else {
            alert(
                "Please provide valid ratings between 0 and 5 for all categories."
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Rate This Book</h2>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.plot}
                        onChange={(value) => handleChange("plot", value)}
                        max={5}
                        step={0.1}
                        min={0}
                        label={"Plot and Pacing"}
                    />
                </div>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.characterDevelopment}
                        onChange={(value) =>
                            handleChange("characterDevelopment", value)
                        }
                        step={0.1}
                        min={0}
                        max={5}
                        label={"Character Development"}
                    />
                </div>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.writingStyle}
                        onChange={(value) =>
                            handleChange("writingStyle", value)
                        }
                        step={0.1}
                        min={0}
                        max={5}
                        label={"Writing Style & Language"}
                    />
                </div>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.emotionalImpact}
                        onChange={(value) =>
                            handleChange("emotionalImpact", value)
                        }
                        step={0.1}
                        min={0}
                        max={5}
                        label={"Emotional Impact"}
                    />
                </div>

                <div className="mb-4">
                    <WheelSlider
                        value={ratings.originality}
                        onChange={(value) => handleChange("originality", value)}
                        step={0.1}
                        min={0}
                        max={5}
                        label={"Originality"}
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

export default AddBookRatingModal;
