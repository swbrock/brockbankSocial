"use client";

import React, { useState } from "react";
import AddBoardGameRatingModal from "@/components/addRatings/AddBoardGameRatingModal";

interface Post {
    id: number;
    title: string;
    content: string;
}

export interface BoardGameProfileProps {
    boardGame: {
        id: number;
        name: string;
        difficulty: string | null;
        timesPlayed: number | null;
        rating: number | null;
        Post: Post[];
    };
    userId: string;
    userRating: number | null;
}

const BoardGameProfilePage = ({
    boardGame,
    userId,
    userRating,
}: BoardGameProfileProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
                {/* User Rating - Top Right */}
                <div className="absolute top-6 right-6 text-right">
                    <p className="text-sm text-blue-200">Your Rating:</p>
                    <p
                        className="text-2xl font-bold text-white"
                        title={
                            userRating
                                ? `Your rating: ${userRating.toFixed(2)}`
                                : "You haven't rated this game yet"
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

                {/* Board Game Details */}
                <h1 className="text-4xl font-extrabold mb-4">
                    {boardGame.name}
                </h1>
                <div className="space-y-2">
                    <p className="text-lg">
                        <strong>Difficulty:</strong>{" "}
                        {boardGame.difficulty || "N/A"}
                    </p>
                    <p className="text-lg">
                        <strong>Times Played:</strong>{" "}
                        {boardGame.timesPlayed || "0"}
                    </p>
                    <p className="text-lg">
                        <strong>Average Rating:</strong>{" "}
                        {boardGame.rating ? boardGame.rating.toFixed(2) : "N/A"}
                    </p>
                </div>
            </div>

            {/* Modal Component */}
            {isModalOpen && (
                <AddBoardGameRatingModal
                    boardGame={boardGame}
                    onClose={() => setIsModalOpen(false)}
                    userId={userId}
                    userRating={userRating}
                />
            )}
        </div>
    );
};

export default BoardGameProfilePage;
