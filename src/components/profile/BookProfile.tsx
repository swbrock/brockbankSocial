"use client";

import React, { useEffect, useState } from "react";
import AddBookRatingModal from "@/components/addRatings/AddBookRatingModal";
import AddBookModal from "../addEvents/AddBookModal";
import Toast from "../Toast";
import { Genre } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export interface BookProfileProps {
    book: {
        id: number;
        name: string;
        author: string | null;
        rating: number | null;
        image: string | null;
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const router = useRouter();

    // make sure rating is two decimal places
    useEffect(() => {
        if (book.rating) {
            book.rating = parseFloat(book.rating.toFixed(2));
        }
    }, [book]);

    //when the edit modal closes, refresh the page
    useEffect(() => {
        if (!editModalOpen || !isModalOpen) {
            router.refresh();
        }
    }, [editModalOpen, isModalOpen, router]);

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Toast Notifications */}
            {/* {success && (
                <Toast
                    type="success"
                    message="Book updated successfully!"
                    onClose={() => setSuccess(false)}
                />
            )}
            {error && (
                <Toast
                    type="error"
                    message={error}
                    onClose={() => setError(null)}
                />
            )} */}

            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                {/* Book Image and Info */}
                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                    {book.image && (
                        <Image
                            src={book.image}
                            alt={book.name}
                            width={160}
                            height={256}
                            className="rounded-lg shadow-lg border border-white mb-4 md:mb-0"
                        />
                    )}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                            {book.name}
                        </h1>
                        <div className="space-y-2">
                            <p className="text-lg">
                                <strong>Author:</strong> {book.author ?? "Unknown"}
                            </p>
                            <p className="text-lg">
                                <strong>Genre:</strong> {genre?.name ?? "N/A"}
                            </p>
                            <p className="text-lg">
                                <strong>Rating:</strong>{" "}
                                {book.rating ? book.rating.toFixed(2) : "N/A"}
                            </p>
                        </div>
                        <div className="mt-4">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-md shadow transition-transform transform hover:scale-105"
                                onClick={() => setEditModalOpen(true)}
                            >
                                Edit Book
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Rating and Add/Edit Rating Button */}
                <div className="mt-4 w-full md:w-auto md:absolute md:top-6 md:right-6 md:text-right flex flex-col items-center md:items-end">
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
                        className="mt-1 bg-white text-blue-600 font-semibold text-xs py-1 px-3 rounded-md shadow hover:bg-gray-200 transition-transform transform hover:scale-105"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {userRating ? "Edit" : "Add"} Rating
                    </button>
                </div>
            </div>

            {/* Rating Modal with Backdrop */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-4 shadow-lg overflow-y-auto max-h-screen">
                        <AddBookRatingModal
                            onClose={() => setIsModalOpen(false)}
                            book={book}
                            userId={userId}
                            userRating={userRating}
                        />
                    </div>
                </div>
            )}

            {/* Edit Book Modal with Backdrop */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-4 shadow-lg overflow-y-auto max-h-screen">
                        <AddBookModal
                            isOpen={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                            isEdit={true}
                            bookId={book.id}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookProfilePage;
