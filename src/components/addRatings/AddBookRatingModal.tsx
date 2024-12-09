import React, { useState } from "react";
import WheelSlider from "../WheelSlider";

// Props interface for the modal
interface RatingModalProps {
    currentRating: any;
    onSubmitRating: (rating: any) => void;
    onClose: () => void;
}

const AddBookRatingModal: React.FC<RatingModalProps> = ({
    currentRating,
    onSubmitRating,
    onClose,
}) => {
    const [ratings, setRatings] = useState({
        plot: currentRating?.plot || 0,
        characterDevelopment: currentRating?.characterDevelopment || 0,
        writingStyle: currentRating?.writingStyle || 0,
        emotionalImpact: currentRating?.emotionalImpact || 0,
        originality: currentRating?.originality || 0,
    });

    // Handle rating change for each category
    const handleChange = (category: string, value: number) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        // Check if all categories are rated with a value between 0 and 5
        const isValid = Object.values(ratings).every(
            (value) => value >= 0 && value <= 5
        );

        if (isValid) {
            onSubmitRating(ratings); // Pass ratings back to the parent
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
