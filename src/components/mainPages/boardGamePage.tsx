"use client";
import { BoardGame } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface BoardGamePageProps {
    dbBoardGames: BoardGame[];
}

const BoardGamePage: React.FC<BoardGamePageProps> = ({ dbBoardGames }) => {
    const [boardGames, setBoardGames] = useState<BoardGame[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const sortedBoardGames = [...dbBoardGames].sort(
            (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        setBoardGames(sortedBoardGames);
    }, [dbBoardGames]);

    const addBoardGame = () => {
        const newBoardGame: BoardGame = {
            id: Date.now(),
            name: "Mystery Game",
            rating: 0,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            difficulty: null,
            length: null,
            timesPlayed: 0,
        };
        setBoardGames((prevBoardGames) => [newBoardGame, ...prevBoardGames]);
    };

    const addRating = (gameId: number) => {
        const newRating = prompt("Enter a rating (1-5):");
        const parsedRating = parseFloat(newRating || "0");
        if (parsedRating >= 1 && parsedRating <= 5) {
            setBoardGames((prevBoardGames) =>
                prevBoardGames
                    .map((game) =>
                        game.id === gameId
                            ? { ...game, rating: parsedRating }
                            : game
                    )
                    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            );
        } else {
            alert("Please enter a valid rating between 1 and 5.");
        }
    };

    // Filter board games based on the search query
    const filteredBoardGames = boardGames.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        🎲 Board Game Collection
                    </h1>
                    <button
                        onClick={addBoardGame}
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                    >
                        + Add Game
                    </button>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search board games..."
                        className="w-full p-4 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                {filteredBoardGames && filteredBoardGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBoardGames.map((game, index) => (
                            <Link key={game.id} href={`/boardGame/${game.id}`}>
                                <div className="relative p-6 bg-white shadow-xl rounded-xl border-2 border-transparent hover:border-orange-400 transition-transform duration-300 hover:scale-105">
                                    <div className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                                        {game.rating
                                            ? `⭐ ${game.rating}/5`
                                            : "Unrated"}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {game.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Rank: {index + 1}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent navigation on button click
                                            addRating(game.id);
                                        }}
                                        className="w-full bg-red-400 text-white py-2 rounded-md shadow-md hover:bg-red-500 transition duration-200"
                                    >
                                        Rate This Game
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-20">
                        No board games match your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BoardGamePage;