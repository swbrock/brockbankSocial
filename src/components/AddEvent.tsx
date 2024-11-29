"use client";
import Image from "next/image";
import React, { use, useState } from "react";
import AddBoardGameReviewModal from "./addEvents/AddBoardGameReviewModal";

const AddEvent = () => {
    const [showAddGameReviewModal, setShowAddGameReviewModal] = useState(false);

    return (
        <>
            {showAddGameReviewModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <AddBoardGameReviewModal />
                    </div>
                </div>
            )}

            <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
                <Image
                    src="/profile.jpeg"
                    alt="Add Event"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Image
                                src="/games.png"
                                alt="Add Game Review"
                                width={40}
                                height={40}
                            />
                            <button
                                onClick={() => setShowAddGameReviewModal(true)}
                            >
                                Add Game Review
                            </button>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Image
                                src="/movieIcon.png"
                                alt="Add Movie Review"
                                width={40}
                                height={40}
                            />
                            Add Movie Review
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Image
                                src="/book.png"
                                alt="Add Book Review"
                                width={40}
                                height={40}
                            />
                            Add Book Review
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEvent;
