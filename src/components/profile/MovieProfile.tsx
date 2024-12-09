"use client"; // Ensures this component is client-side rendered (for hooks like useState)

import React, { useState } from "react";
import AddMovieRatingModal from "@/components/addRatings/AddMovieRatingModal";
import { Genre } from "@prisma/client";

interface Post {
    id: number;
    title: string;
    content: string;
}

export interface MovieProfileProps {
    movie: {
        id: number;
        name: string;
        genre: Genre | null;
        rating: number | null;
        Post: Post[];
    };
}

const MovieProfilePage = ({ movie }: MovieProfileProps) => {
    // Client-side state for managing the modal visibility and rating
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState<number | null>(null);

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold">{movie.name}</h1>
                <p className="mt-2 text-lg">
                    {movie.genre?.name || "Genre: Unknown"}
                </p>
                <p className="mt-1 text-lg">
                    <strong>Rating:</strong>{" "}
                    {movie.rating ? movie.rating : "No rating yet"}
                </p>
            </div>

            {/* Action Section */}
            <div className="mt-6 flex justify-center">
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Rating
                </button>
            </div>

            {/* Modal component to add the rating */}
            {isModalOpen && (
                <AddMovieRatingModal
                    currentRating={rating}
                    onSubmitRating={setRating} // Pass the rating back to the parent
                    onClose={() => setIsModalOpen(false)} // Close modal on cancel
                />
            )}

            {/* Posts Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Related Posts
                </h2>
                {movie.Post.length > 0 ? (
                    <ul className="space-y-4">
                        {movie.Post.map((post) => (
                            <li
                                key={post.id}
                                className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition-all"
                            >
                                <h3 className="text-xl font-semibold text-gray-700">
                                    {post.title}
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    {post.content}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">
                        No posts related to this movie yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MovieProfilePage;
