import { Movie } from "@prisma/client";
import React from "react";

interface TopMovieProps {
    movies: Movie[]; // Pass an array of movies
}

const TopMovie: React.FC<TopMovieProps> = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="p-6 bg-white shadow-lg rounded-lg w-full mx-auto">
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 text-lg">
                        No Movies Rated
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="p-6 bg-white shadow-lg rounded-lg w-full mx-auto">
                <div className="font-semibold text-gray-800 text-lg mb-4">
                    <h3>Top Rated Movies</h3>
                </div>

                {/* List of top-rated movies */}
                <div className="space-y-6">
                    {movies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="flex items-start space-x-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
                        >
                            {/* Ranking */}
                            <div className="text-2xl font-bold text-gray-700">
                                {index + 1}
                            </div>

                            {/* Movie Details */}
                            <div className="flex flex-col flex-grow">
                                {/* Movie Title */}
                                <h4 className="text-xl font-semibold text-gray-800">
                                    {movie.name}
                                </h4>

                                {/* Movie Rating (Stars) */}
                                <div className="text-sm text-yellow-500 flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill={
                                                i <
                                                Math.round(movie.rating || 0)
                                                    ? "gold"
                                                    : "gray"
                                            }
                                            className="bi bi-star-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.612 15.443c-.392.233-.872-.119-.822-.536l.727-4.251L.173 6.546c-.364-.354-.175-.934.316-.99l4.289-.623 1.918-3.895c.18-.363.77-.364.95 0l1.918 3.895 4.29.623c.49.056.68.636.316.99l-3.343 4.011.727 4.251c.05.417-.43.768-.822.536l-3.94-2.2-3.94 2.2z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Movie Genre */}
                                {/* <p className="text-sm text-gray-600 mt-2">
                                    Genre: {movie.genre?.name || "N/A"}
                                </p> */}

                                {/* Buttons */}
                                <div className="flex items-center gap-4 mt-4">
                                    <button className="text-blue-500 text-sm hover:underline">
                                        More Info
                                    </button>
                                    <button className="text-green-500 text-sm hover:underline">
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default TopMovie;
