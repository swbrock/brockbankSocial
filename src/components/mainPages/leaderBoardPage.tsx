"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";

interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
}

interface BoardGame {
    id: number;
    name: string;
    rating: number | null;
    difficulty: string | null;
    image: string | null;
}

interface GameParticipant {
    userId: string;
    gameId: number;
}

interface Game {
    id: number;
    boardGameId: number;
    winnerUserId: string;
    participants: GameParticipant[];
}

interface LeaderBoardPageProps {
    dbUsers: User[];
    dbGames: Game[];
    dbBoardGames: BoardGame[];
}

const LeaderBoardPage: React.FC<LeaderBoardPageProps> = ({
    dbUsers,
    dbGames,
    dbBoardGames,
}) => {
    const [selectedBoardGame, setSelectedBoardGame] = useState<string>("All");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const filteredGames = useMemo(() => {
        if (selectedBoardGame === "All") return dbGames;
        const selectedGame = dbBoardGames.find((bg) => bg.name === selectedBoardGame);
        return selectedGame
            ? dbGames.filter((game) => game.boardGameId === selectedGame.id)
            : [];
    }, [selectedBoardGame, dbGames, dbBoardGames]);

    const leaderboardData = useMemo(() => {
        const userStats: Record<string, { totalGames: number; totalWins: number }> = {};

        dbUsers.forEach((user) => {
            userStats[user.id] = { totalGames: 0, totalWins: 0 };
        });

        filteredGames.forEach((game) => {
            game.participants.forEach((participant) => {
                if (userStats[participant.userId]) {
                    userStats[participant.userId].totalGames++;
                }
            });

            if (userStats[game.winnerUserId]) {
                userStats[game.winnerUserId].totalWins++;
            }
        });

        return dbUsers
            .map((user) => {
                const stats = userStats[user.id];
                const winPercentage =
                    stats.totalGames > 0
                        ? ((stats.totalWins / stats.totalGames) * 100).toFixed(2)
                        : "0.00";
                return {
                    id: user.id,
                    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
                    totalGames: stats.totalGames,
                    totalWins: stats.totalWins,
                    winPercentage: parseFloat(winPercentage),
                    avatar: user.avatar,
                };
            })
            .filter((user) => user.totalGames > 0)
            .sort((a, b) => b.winPercentage - a.winPercentage);
    }, [filteredGames, dbUsers]);

    const dropdownOptions = useMemo(() => ["All", ...dbBoardGames.map((bg) => bg.name)], [dbBoardGames]);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Leaderboard</h1>
            <div className="flex flex-col md:flex-row md:items-center justify-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
                <label htmlFor="boardGameFilter" className="text-gray-700 font-medium">
                    Filter by Board Game:
                </label>

                {/* Dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="p-2 border rounded-md bg-white text-gray-700 w-48"
                        aria-haspopup="listbox"
                        aria-expanded={isDropdownOpen}
                    >
                        {selectedBoardGame}
                    </button>
                    {isDropdownOpen && (
                        <ul
                            className="absolute mt-2 w-full max-h-96 overflow-y-auto border border-gray-300 bg-white rounded-md shadow-lg z-10"
                            role="listbox"
                        >
                            {dropdownOptions.map((option) => (
                                <li
                                    key={option}
                                    onClick={() => {
                                        setSelectedBoardGame(option);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    role="option"
                                    aria-selected={option === selectedBoardGame}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {leaderboardData.length === 0 ? (
                <p className="text-center text-gray-600">No games have been played for the selected board game.</p>
            ) : (
                <>
                    {/* Mobile View */}
                    <div className="block md:hidden grid grid-cols-1 gap-4">
                        {leaderboardData.map((user, index) => (
                            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                                <h2 className="text-lg font-bold text-gray-800">
                                    #{index + 1} {user.name}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Total Games: <span className="font-medium">{user.totalGames}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Total Wins: <span className="font-medium">{user.totalWins}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Win Percentage: <span className="font-medium">{user.winPercentage}%</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="p-4">Rank</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Total Wins</th>
                                    <th className="p-4">Total Games</th>
                                    <th className="p-4">Win Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={`${
                                            index % 2 === 0 ? "bg-gray-100" : ""
                                        } hover:bg-gray-200`}
                                    >
                                        <td className="p-4 text-center">{index + 1}</td>
                                        <td className="p-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <Image
                                                    src={user.avatar ?? "/noAvatar.png"}
                                                    alt={`${user.name}'s Avatar`}
                                                    width={50}
                                                    height={50}
                                                    className="w-12 h-12 rounded-full object-cover mb-1"
                                                />
                                                <span className="font-medium">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">{user.totalWins}</td>
                                        <td className="p-4 text-center">{user.totalGames}</td>
                                        <td className="p-4 text-center">{user.winPercentage}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default LeaderBoardPage;
