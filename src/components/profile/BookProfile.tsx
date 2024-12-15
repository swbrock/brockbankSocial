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
}

const BookProfilePage = ({ book }: BookProfileProps) => {
    // Client-side state for managing the modal visibility and rating
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState<number | null>(null);

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold">{book.name}</h1>
                <p className="mt-2 text-lg">
                    {book.author || "Author: Unknown"}
                </p>
                <p className="mt-1 text-lg">
                    <strong>Genre:</strong> {book.genre?.name || "Genre: N/A"}
                </p>
                <p className="mt-1 text-lg">
                    <strong>Rating:</strong>{" "}
                    {book.rating ? book.rating : "No rating yet"}
                </p>
            </div>

            {/* Action Section */}
            <div className="mt-6 flex justify-center">
                <button
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Rating
                </button>
            </div>

            {/* Modal component to add the rating */}
            {isModalOpen && (
                <AddBookRatingModal
                    currentRating={rating}
                    onSubmitRating={setRating} // Pass the rating back to the parent
                    onClose={() => setIsModalOpen(false)} // Close modal on cancel
                />
            )}
        </div>
    );
};

export default BookProfilePage;
