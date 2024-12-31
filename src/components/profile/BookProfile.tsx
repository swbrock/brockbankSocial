"use client"; // Ensures this component is client-side rendered (for hooks like useState)

import React, { useState } from "react";
import AddBookRatingModal from "@/components/addRatings/AddBookRatingModal";
import { Genre } from "@prisma/client";

interface Post {
    id: number;
    title: string;
    content: string;
}

export interface BookProfileProps {
    book: {
        id: number;
        name: string;
        author: string | null;
        genre: Genre | null;
        rating: number | null;
        Post: Post[];
    };
    genre?: Genre | null;
    userId: string;
    userRating: number | null;
}

const BookProfilePage = ({
    book,
    genre,
    userId,
    userRating,
}: BookProfileProps) => {
    // Client-side state for managing the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                {/* User Rating - Top Right */}
                <div className="absolute top-6 right-6 text-right">
                    <p className="text-sm text-teal-200">Your Rating:</p>
                    <p
                        className="text-2xl font-bold text-white"
                        title={
                            userRating
                                ? `Your rating: ${userRating.toFixed(2)}`
                                : "You haven't rated this book yet"
                        }
                    >
                        {userRating ? userRating.toFixed(2) : "N/A"}
                    </p>
                    <button
                        className="mt-1 bg-white text-blue-600 font-semibold text-xs py-0.5 px-2 rounded-md shadow hover:bg-gray-200 transition-transform transform hover:scale-105"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {userRating ? "Edit" : "Add"} Rating
                    </button>
                </div>

                {/* Book Details */}
                <h1 className="text-4xl font-extrabold">{book.name}</h1>
                <p className="mt-2 text-lg">
                    {book.author ?? "Author: Unknown"}
                </p>
                <p className="mt-1 text-lg">
                    <strong>Genre:</strong> {genre?.name ?? "Genre: N/A"}
                </p>
                <p className="mt-1 text-lg">
                    <strong>Rating:</strong>{" "}
                    {book.rating ? book.rating.toFixed(2) : "No rating yet"}
                </p>
            </div>

            {/* Modal Component */}
            {isModalOpen && (
                <AddBookRatingModal
                    onClose={() => setIsModalOpen(false)} // Close modal on cancel
                    book={book}
                    userId={userId}
                    userRating={userRating}
                />
            )}
        </div>
    );
};

export default BookProfilePage;
