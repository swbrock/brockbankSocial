"use client"; // Ensures this component is client-side rendered (for hooks like useState)

import React, { useState } from "react";
import AddMovieRatingModal from "@/components/addRatings/AddMovieRatingModal";
import { Genre, Movie } from "@prisma/client";

interface Post {
    id: number;
    title: string;
    content: string;
}

export interface MovieProfileProps {
    movie: {
        id: number;
        name: string;
        rating: number | null;
        Post: Post[];
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
    // Client-side state for managing the modal visibility and rating
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
                {/* User Rating - Top Right */}
                <div className="absolute top-6 right-6 text-right">
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

                {/* Movie Details */}
                <h1 className="text-4xl font-extrabold">{movie.name}</h1>
                <p className="mt-2 text-lg">
                    {genre?.name ?? "Genre: Unknown"}
                </p>
                <p className="mt-1 text-lg">
                    <strong>Rating:</strong>{" "}
                    {movie.rating !== null
                        ? movie.rating.toFixed(2)
                        : "No rating yet"}
                </p>
            </div>

            {/* Modal Component */}
            {isModalOpen && (
                <AddMovieRatingModal
                    movie={movie}
                    userId={userId}
                    userRating={userRating}
                    onClose={() => setIsModalOpen(false)} // Close modal on cancel
                />
            )}

            {/* Edit Modal Component */}
        </div>
    );
};

export default MovieProfilePage;
