import React, { useState } from "react";
import WheelSlider from "../WheelSlider"; // Assuming WheelSlider is in the components directory

// Props interface for the modal
interface RatingModalProps {
    currentRating: any;
    onSubmitRating: (rating: any) => void;
    onClose: () => void;
}

const AddMovieRatingModal: React.FC<RatingModalProps> = ({
    currentRating,
    onSubmitRating,
    onClose,
}) => {
    // State for each category rating (range: 0 to 5 with decimals)
    const [ratings, setRatings] = useState({
        plot: currentRating?.plot || 0,
        acting: currentRating?.acting || 0,
        visuals: currentRating?.visuals || 0,
        emotionalImpact: currentRating?.emotionalImpact || 0,
        originality: currentRating?.originality || 0,
    });

    // Handle rating change for each category
    const handleSliderChange = (category: string, value: number) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };

    // Calculate the total rating by averaging the valid ratings
    const calculateTotalRating = () => {
        const ratingsArray = Object.values(ratings);
        const validRatings = ratingsArray.filter((rating) => rating !== null);
        const total = validRatings.reduce((acc, rating) => acc + rating, 0);
        return validRatings.length > 0 ? total / validRatings.length : null;
    };

    // Handle form submission
    const handleSubmit = () => {
        const totalRating = calculateTotalRating();
        if (totalRating !== null) {
            onSubmitRating(totalRating); // Pass total rating back to the parent
        } else {
            alert("Please provide ratings for all categories.");
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

                {/* Display Total Rating */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        <strong>Total Rating:</strong>{" "}
                        {calculateTotalRating()?.toFixed(1) || "Incomplete"}
                    </p>
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
