import React, { useState } from "react";
import WheelSlider from "../WheelSlider"; // Assuming WheelSlider is in the components directory
import { MovieRatingResponses } from "@/lib/content";
import { useRouter } from "next/navigation"; // Import useRouter

interface Post {
    id: number;
    title: string;
    content: string;
}

interface MovieProfileProps {
    id: number;
    name: string;
    rating: number | null;
    Post: Post[];
}

// Props interface for the modal
export interface RatingModalProps {
    currentRating: any;
    movie: MovieProfileProps;
    userId: string;
    onClose: () => void;
    userRating: number | null;
}

const AddMovieRatingModal: React.FC<RatingModalProps> = ({
    currentRating,
    movie,
    userId,
    userRating,
    onClose,
}) => {
    const router = useRouter(); // Get the router instance
    // State for each category rating (range: 0 to 5 with decimals)
    const [ratings, setRatings] = useState({
        plot: currentRating?.plot || 0,
        acting: currentRating?.acting || 0,
        visuals: currentRating?.visuals || 0,
        emotionalImpact: currentRating?.emotionalImpact || 0,
        originality: currentRating?.originality || 0,
    });

    const getRandomResponseForRange = (range: string) => {
        const filteredResponses = MovieRatingResponses.find(
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
    const handleSliderChange = (category: string, value: number) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };

    const submitNewMovieRating = async (newRating: number) => {
        try {
            // Submit the rating
            const response = await fetch("/api/ratings/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    movieId: movie.id,
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
                      movie.name
                  }. ${randomResponse.response}`
                : `A new rating of ${newRating.toFixed(
                      2
                  )} has been submitted for ${movie.name}. ${
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
                    entityId: movie.id,
                    entityType: "movie",
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
            submitNewMovieRating(averageRating);
        } else {
            alert(
                "Please provide valid ratings between 0 and 5 for all categories."
            );
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Rate This Movie</h2>

                {/* Plot and Storytelling */}
                <div className="mb-4">
                    <WheelSlider
                        value={ratings.plot}
                        onChange={(value) => handleSliderChange("plot", value)}
                        max={5}
                        min={0}
                        step={0.1}
                        label="Plot and Storytelling"
                    />
                </div>

                {/* Character Development and Acting */}
                <div className="mb-4">
                    <WheelSlider
                        value={ratings.acting}
                        onChange={(value) =>
                            handleSliderChange("acting", value)
                        }
                        max={5}
                        min={0}
                        step={0.1}
                        label="Character Development"
                    />
                </div>

                {/* Visuals and Cinematography */}
                <div className="mb-4">
                    <WheelSlider
                        value={ratings.visuals}
                        onChange={(value) =>
                            handleSliderChange("visuals", value)
                        }
                        max={5}
                        min={0}
                        step={0.1}
                        label="Visuals and Cinematography"
                    />
                </div>

                {/* Emotional Impact and Engagement */}
                <div className="mb-4">
                    <WheelSlider
                        value={ratings.emotionalImpact}
                        onChange={(value) =>
                            handleSliderChange("emotionalImpact", value)
                        }
                        max={5}
                        min={0}
                        step={0.1}
                        label="Emotional Impact"
                    />
                </div>

                {/* Originality and Creativity */}
                <div className="mb-4">
                    <WheelSlider
                        value={ratings.originality}
                        onChange={(value) =>
                            handleSliderChange("originality", value)
                        }
                        max={5}
                        min={0}
                        step={0.1}
                        label="Originality"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        className="bg-gray-400 text-white p-2 rounded"
                        onClick={onClose} // Close modal on cancel
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={handleSubmit} // Submit the rating
                    >
                        Submit Rating
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMovieRatingModal;
