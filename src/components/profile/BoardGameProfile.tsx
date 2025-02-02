"use client"
import React, { useState, useEffect, use } from "react";
import AddBoardGameRatingModal from "@/components/addRatings/AddBoardGameRatingModal";
import AddBoardGameModal from "../addEvents/AddBoardGameModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

// interface HighScore {
//     user: string | null;
//     score: number;
//     date: Date;
// }

export interface BoardGameProfileProps {
    boardGame: {
        id: number;
        name: string;
        difficulty: string | null;
        timesPlayed: number | null;
        rating: number | null;
        image: string | null;
    };
    userId: string;
    userRating: number | null;
   // highScore: HighScore | null;
}



const BoardGameProfilePage = ({
    boardGame,
    userId,
    userRating,
    //highScore,
}: BoardGameProfileProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const router = useRouter();

    // make sure rating is two decimal places
    useEffect(() => {
        if (boardGame.rating) {
            boardGame.rating = parseFloat(boardGame.rating.toFixed(2));
        }
    }, [boardGame]);

    //when the edit modal closes, refresh the page
    useEffect(() => {
        if (!editModalOpen || !isModalOpen) {
            router.refresh();
        }
    }, [editModalOpen, isModalOpen, router]);

    // get high score for this board game

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
                {/* Board Game Image and Info */}
                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                    {boardGame.image ? (
                        <Image
                            src={boardGame.image}
                            alt={boardGame.name}
                            width={160}
                            height={160}
                            className="rounded-lg shadow-lg border border-white mb-4 md:mb-0"
                        />
                    ) : (
                        null
                    )}

                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                            {boardGame.name}
                        </h1>
                        <div className="space-y-2">
                            <p className="text-lg">
                                <strong>Difficulty:</strong>{" "}
                                {boardGame.difficulty ?? "N/A"}
                            </p>
                            <p className="text-lg">
                                <strong>Times Played:</strong>{" "}
                                {boardGame.timesPlayed ?? "0"}
                            </p>
                            <p className="text-lg">
                                <strong>Average Rating:</strong>{" "}
                                {boardGame.rating
                                    ? boardGame.rating.toFixed(2)
                                    : "N/A"}
                            </p>
                            {/* {highScore && highScore?.score != 0 && (
                                <p className="text-lg">
                                    <strong>High Score:</strong>{" "}
                                    {highScore.score} by {highScore.user} on{" "}
                                    {new Date(highScore.date).toLocaleDateString()}
                                </p>
                            )} */}
                        </div>
                        <div className="mt-4">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
                                onClick={() => setEditModalOpen(true)}
                            >
                                Edit Board Game
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add/Edit Rating Button */}
                <div className="mt-4 w-full md:w-auto md:absolute md:top-6 md:right-6 md:text-right flex flex-col items-center md:items-end">
                    <p className="text-sm text-teal-200">Your Rating:</p>
                    <p
                        className="text-2xl font-bold text-white"
                        title={
                            userRating
                                ? `Your rating: ${userRating.toFixed(2)}`
                                : "You haven't rated this board game yet"
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

            {/* Rating Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <AddBoardGameRatingModal
                            boardGame={boardGame}
                            onClose={() => setIsModalOpen(false)}
                            userId={userId}
                            userRating={userRating}
                        />
                    </div>
                </div>
            )}

            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <AddBoardGameModal
                            isOpen={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                            isEdit={true}
                            boardGameId={boardGame.id}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardGameProfilePage;
