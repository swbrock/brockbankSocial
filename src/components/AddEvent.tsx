"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddMovieRatingModal from "./addRatings/AddMovieRatingModal";
import AddBookRatingModal from "./addRatings/AddBookRatingModal";
import Toast from "./Toast";
import AddBoardGameRatingModal from "./addRatings/AddBoardGameRatingModal";

interface AddEventProps {
    userId: string;
}

const AddEvent = ({ userId }: AddEventProps) => {
    const [showAddGameReviewModal, setShowAddGameReviewModal] = useState(false);
    const [showAddMovieReviewModal, setShowAddMovieReviewModal] = useState(false);
    const [showAddBookReviewModal, setShowAddBookReviewModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (showAddGameReviewModal || showAddMovieReviewModal || showAddBookReviewModal) {
            document.body.style.overflow = "hidden"; // Disable body scroll
        } else {
            document.body.style.overflow = "auto"; // Re-enable body scroll when modal is closed
        }
    
        return () => {
            document.body.style.overflow = "auto"; // Cleanup on unmount
        };
    }, [showAddGameReviewModal, showAddMovieReviewModal, showAddBookReviewModal]);
    

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
            {success && (
                <Toast
                    type="success"
                    message="Review added successfully!"
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
            <div className="flex-1">
                <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src="/games.png"
                            alt="Add Game Review"
                            width={40}
                            height={40}
                        />
                        <button onClick={() => setShowAddGameReviewModal(true)}>
                            Add Game Review
                        </button>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src="/movieIcon.jpg"
                            alt="Add Movie Review"
                            width={40}
                            height={40}
                        />
                        <button onClick={() => setShowAddMovieReviewModal(true)}>
                            Add Movie Review
                        </button>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src="/book.png"
                            alt="Add Book Review"
                            width={40}
                            height={40}
                        />
                        <button onClick={() => setShowAddBookReviewModal(true)}>
                            Add Book Review
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showAddMovieReviewModal && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <AddMovieRatingModal
                        onClose={() => setShowAddMovieReviewModal(false)}
                        userId={userId}
                        setError={setError}
                        setSuccess={setSuccess}
                    />
                </>
            )}
            {showAddBookReviewModal && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <AddBookRatingModal
                        onClose={() => setShowAddBookReviewModal(false)}
                        userId={userId}
                        setError={setError}
                        setSuccess={setSuccess}
                    />
                </>
            )}
            {showAddGameReviewModal && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <AddBoardGameRatingModal
                        onClose={() => setShowAddGameReviewModal(false)}
                        userId={userId}
                        setError={setError}
                        setSuccess={setSuccess}
                    />
                </>
            )}
        </div>
    );
};

export default AddEvent;
