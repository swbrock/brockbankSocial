import React, { useEffect, useState } from "react";
import WheelSlider from "../WheelSlider";
import { MovieRatingResponses } from "@/lib/content";
import { useRouter } from "next/navigation";
import { getMoviesNotRatedByUser } from "@/lib/actions";

interface MovieProfileProps {
    id: number;
    name: string;
    rating: number | null;
}

export interface RatingModalProps {
    movie?: MovieProfileProps | null;
    userId: string;
    onClose: () => void;
    userRating?: number | null;
    setSuccess?: (value: React.SetStateAction<boolean>) => void;
    setError?: (value: React.SetStateAction<string | null>) => void;
}

const AddMovieRatingModal: React.FC<RatingModalProps> = ({
    movie,
    userId,
    userRating,
    onClose,
    setSuccess,
    setError,
}) => {
    const router = useRouter();
    const [movies, setMovies] = useState<MovieProfileProps[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieProfileProps | null>(movie || null);
    const [ratings, setRatings] = useState({
        plot: 0,
        acting: 0,
        visuals: 0,
        emotionalImpact: 0,
        originality: 0,
    });

    useEffect(() => {
        if (!movie) {
            const fetchMovies = async () => {
                const fetchedMovies = await getMoviesNotRatedByUser(userId);
                setMovies(fetchedMovies);
            };
            fetchMovies();
        }
    }, [movie, userId]);

    useEffect(() => {
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden';
      
        return () => {
          // Re-enable scrolling when modal is closed
          document.body.style.overflow = 'auto';
        }
        }, []);
      

    useEffect(() => {
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden';
      
        return () => {
          // Re-enable scrolling when modal is closed
          document.body.style.overflow = 'auto';
        }
        }, []);
      

    const getRandomResponseForRange = (range: string) => {
        const filteredResponses = MovieRatingResponses.find(
            (res) => res.range === range
        );
        if (filteredResponses) {
            const randomIndex = Math.floor(Math.random() * filteredResponses.responses.length);
            return filteredResponses.responses[randomIndex];
        }
        return null;
    };

    const handleSliderChange = (category: string, value: number) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };

    const submitNewMovieRating = async (newRating: number) => {
        try {
            const response = await fetch("/api/ratings/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    movieId: selectedMovie?.id,
                    rating: newRating,
                    userId,
                }),
            });

            if (!response.ok) throw new Error("Failed to submit rating");

            const ratingRange = `${Math.floor(newRating)}-${Math.ceil(newRating)}`;
            const randomResponse = getRandomResponseForRange(ratingRange);

            if (!randomResponse) throw new Error("Invalid rating range");

            const title = randomResponse.title;
            const content = userRating
                ? `Rating has been updated to ${newRating.toFixed(2)} for ${selectedMovie?.name}. ${randomResponse.response}`
                : `A new rating of ${newRating.toFixed(2)} has been submitted for ${selectedMovie?.name}. ${randomResponse.response}`;

            const postResponse = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    title,
                    content,
                    entityId: selectedMovie?.id,
                    entityType: "movie",
                }),
            });

            if (!postResponse.ok) throw new Error("Failed to submit post");
            setSuccess && setSuccess(true);
            onClose();
            router.refresh();
        } catch (error) {
            setError && setError("Error submitting rating or post");
            console.error("Error submitting rating or post:", error);
            alert("Failed to submit rating or post. Please try again.");
        }
    };

    const handleSubmit = () => {
        const isValid = Object.values(ratings).every((value) => value >= 0 && value <= 5);
        const averageRating = parseFloat((Object.values(ratings).reduce((a, b) => a + b, 0) / 5).toFixed(1));

        if (isValid) {
            submitNewMovieRating(averageRating);
        } else {
            alert("Please provide valid ratings between 0 and 5 for all categories.");
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000, // Ensure it's above the other content
            overflow: 'auto', // Ensures modal content can scroll if needed
          }}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex flex-col items-center bg-white p-6 rounded-md shadow-lg w-96 space-y-6">
                {/* Movie selection */}
                {!movie && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Select a Movie</h2>
                        <select
                            className="w-full p-2 rounded-md border border-gray-300 mb-4"
                            onChange={(e) => {
                                const selected = movies.find(
                                    (m) => m.id === parseInt(e.target.value)
                                );
                                setSelectedMovie(selected ?? null);
                            }}
                        >
                            <option value="">Select a movie...</option>
                            {movies.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                        {!selectedMovie && (
                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        )}
                    </div>
                )}

                {/* Movie rating */}
                {selectedMovie && (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4">Rate This Movie</h2>

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

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.acting}
                                onChange={(value) => handleSliderChange("acting", value)}
                                max={5}
                                min={0}
                                step={0.1}
                                label="Character Development"
                            />
                        </div>

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.visuals}
                                onChange={(value) => handleSliderChange("visuals", value)}
                                max={5}
                                min={0}
                                step={0.1}
                                label="Visuals and Cinematography"
                            />
                        </div>

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.emotionalImpact}
                                onChange={(value) => handleSliderChange("emotionalImpact", value)}
                                max={5}
                                min={0}
                                step={0.1}
                                label="Emotional Impact"
                            />
                        </div>

                        <div className="mb-4">
                            <WheelSlider
                                value={ratings.originality}
                                onChange={(value) => handleSliderChange("originality", value)}
                                max={5}
                                min={0}
                                step={0.1}
                                label="Originality"
                            />
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-gray-400 text-white p-2 rounded"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleSubmit}
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default AddMovieRatingModal;

