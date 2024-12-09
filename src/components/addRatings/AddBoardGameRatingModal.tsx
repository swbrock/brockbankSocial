import React, { useState } from "react";
import WheelSlider from "../WheelSlider";

// Props interface for the modal
interface RatingModalProps {
    currentRating: any;
    onSubmitRating: (rating: any) => void;
    onClose: () => void;
}

const AddBoardGameRatingModal: React.FC<RatingModalProps> = ({
    currentRating,
    onSubmitRating,
    onClose,
}) => {
    const [ratings, setRatings] = useState({
        gameplayMechanics: currentRating?.gameplayMechanics || 0,
        funFactor: currentRating?.funFactor || 0,
        strategyAndDepth: currentRating?.strategyAndDepth || 0,
        replayability: currentRating?.replayability || 0,
        themeAndAesthetics: currentRating?.themeAndAesthetics || 0,
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
