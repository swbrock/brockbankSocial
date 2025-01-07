"use client";
import React, { useState } from "react";
import AddMovieRatingModal from "@/components/addRatings/AddMovieRatingModal";
import Toast from "@/components/Toast";
import { Genre } from "@prisma/client";
import AddMovieModal from "../addEvents/AddMovieModal";

export interface MovieProfileProps {
    movie: {
        id: number;
        name: string;
        rating: number | null;
        director: string | null;
        image: string | null;
    };
    genre?: Genre | null;
    userId: string;
    userRating: number | null;
}

const MovieProfilePage = ({
    movie,
    genre,
    userId,
    userRating,
}: MovieProfileProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="container mx-auto px-6 py-8">
            {success && (
                <Toast
                    type="success"
                    message="Movie updated successfully!"
                    onClose={() => setSuccess(false)}
                />
            )}
            {error && (
                <Toast
                    type="error"
                    message={error}
                    onClose={() => setError(null)}
                />
            )}

            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
                {/* Movie Image and Info */}
                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                    {movie.image && (
                        <img
                            src={movie.image}
                            alt={movie.name}
                            className="w-40 h-64 object-cover rounded-lg shadow-lg border border-white mb-4 md:mb-0"
                        />
                    )}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                            {movie.name}
                        </h1>
                        <div className="space-y-2">
                            <p className="text-lg">
                                <strong>Director:</strong> {movie.director}
                            </p>
                            <p className="text-lg">
                                <strong>Genre:</strong> {genre?.name ?? "N/A"}
                            </p>
                            <p className="text-lg">
                                <strong>Rating:</strong>{" "}
                                {movie.rating ? movie.rating.toFixed(2) : "N/A"}
                            </p>
                        </div>
                        <div className="mt-4">
                            <button
                                className="bg-green-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-md shadow"
                                onClick={() => setEditModalOpen(true)}
                            >
                                Edit Movie
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Rating and Add/Edit Rating Button */}
                <div className="mt-4 w-full md:w-auto md:absolute md:top-6 md:right-6 md:text-right flex flex-col items-center md:items-start">
                    <p className="text-sm text-purple-200">Your Rating:</p>
                    <p
                        className="text-2xl font-bold text-white"
                        title={
                            userRating
                                ? `Your rating: ${userRating.toFixed(2)}`
                                : "You haven't rated this movie yet"
                        }
                    >
                        {userRating ? userRating.toFixed(2) : "N/A"}
                    </p>
                    <button
                        className="mt-1 bg-white text-purple-600 font-semibold text-xs py-0.5 px-2 rounded-md shadow hover:bg-gray-200 transition-transform transform hover:scale-105"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {userRating ? "Edit" : "Add"} Rating
                    </button>
                </div>
            </div>

            {/* Modal Components */}
            {isModalOpen && (
                <AddMovieRatingModal
                    onClose={() => setIsModalOpen(false)}
                    movie={movie}
                    userId={userId}
                    userRating={userRating}
                />
            )}
            {editModalOpen && (
                <AddMovieModal
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    isEdit={true}
                    movieId={movie.id}
                    setSuccess={setSuccess}
                    setError={setError}
                />
            )}
        </div>
    );
};

export default MovieProfilePage;
