"use client";

import React, { useEffect, useState } from "react";
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
    const [rating, setRating] = useState<number | null>(boardGame.rating);

    useEffect(() => {
        console.log("Board game:", boardGame);
    }, [boardGame]);

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold">{boardGame.name}</h1>
                <p className="mt-2 text-lg">
                    {boardGame.difficulty || "Difficulty: N/A"}
                </p>
                <p className="mt-1 text-lg">
                    <strong>Times Played:</strong>{" "}
                    {boardGame.timesPlayed || "0"}
                </p>
                <p className="mt-1 text-lg">
                    <strong>Rating:</strong>{" "}
                    {boardGame.rating ? boardGame.rating.toFixed(2) : "N/A"}
                </p>
            </div>

            {/* Action Section */}
            <div className="mt-6 flex justify-center">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    onClick={() => setIsModalOpen(true)}
                >
                    {userRating ? "Edit" : "Add"} Rating
                </button>
            </div>

            {userRating && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">
                        Your Rating: {userRating.toFixed(2)}
                    </h2>
                </div>
            )}

            {/* Post Section */}

            {/* Modal Component */}
            {isModalOpen && (
                <AddBoardGameRatingModal
                    currentRating={rating}
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
