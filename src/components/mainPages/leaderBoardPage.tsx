"use client";
import React, { useMemo, useState } from "react";

interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
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

    const filteredGames = useMemo(() => {
        if (selectedBoardGame === "All") return dbGames;

        const selectedGame = dbBoardGames.find(
            (bg) => bg.name === selectedBoardGame
        );
        return selectedGame
            ? dbGames.filter((game) => game.boardGameId === selectedGame.id)
            : [];
    }, [selectedBoardGame, dbGames, dbBoardGames]);

    const leaderboardData = useMemo(() => {
        const userStats: Record<
            string,
            { totalGames: number; totalWins: number }
        > = {};

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
                        ? ((stats.totalWins / stats.totalGames) * 100).toFixed(
                              2
                          )
                        : "0.00";
                return {
                    id: user.id,
                    name: `${user.firstName ?? ""} ${
                        user.lastName ?? ""
                    }`.trim(),
                    totalGames: stats.totalGames,
                    totalWins: stats.totalWins,
                    winPercentage: parseFloat(winPercentage),
                };
            })
            .filter((user) => user.totalGames > 0)
            .sort((a, b) => b.winPercentage - a.winPercentage);
    }, [filteredGames, dbUsers]);

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#f0f8ff",
                minHeight: "100vh",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#4a90e2",
                    fontSize: "36px",
                    marginBottom: "20px",
                }}
            >
                Leaderboard
            </h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                <label
                    htmlFor="boardGameFilter"
                    style={{
                        marginRight: "10px",
                        fontSize: "16px",
                        color: "#333",
                    }}
                >
                    Filter by Board Game:
                </label>
                <select
                    id="boardGameFilter"
                    value={selectedBoardGame}
                    onChange={(e) => setSelectedBoardGame(e.target.value)}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        backgroundColor: "#e3f2fd",
                        color: "#333",
                    }}
                >
                    <option value="All">All</option>
                    {dbBoardGames.map((boardGame) => (
                        <option key={boardGame.id} value={boardGame.name}>
                            {boardGame.name}
                        </option>
                    ))}
                </select>
            </div>
            {leaderboardData.length === 0 ? (
                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        fontSize: "18px",
                        marginTop: "20px",
                    }}
                >
                    No games have been played for the selected board game.
                </p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        marginTop: "20px",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#4a90e2",
                                color: "#fff",
                                textAlign: "left",
                                borderBottom: "2px solid #ddd",
                            }}
                        >
                            <th style={headerStyle}>Rank</th>
                            <th style={headerStyle}>Name</th>
                            <th style={headerStyle}>Total Wins</th>
                            <th style={headerStyle}>Total Games</th>
                            <th style={headerStyle}>Win Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((user, index) => (
                            <tr
                                key={user.id}
                                style={{
                                    backgroundColor:
                                        index % 2 === 0 ? "#ffffff" : "#e3f2fd",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "#bbdefb")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        index % 2 === 0 ? "#ffffff" : "#e3f2fd")
                                }
                            >
                                <td style={cellStyle}>{index + 1}</td>
                                <td style={cellStyle}>
                                    {user.name || "Unknown User"}
                                </td>
                                <td style={cellStyle}>{user.totalWins}</td>
                                <td style={cellStyle}>{user.totalGames}</td>
                                <td style={cellStyle}>{user.winPercentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const headerStyle = {
    padding: "15px",
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "center" as const,
};

const cellStyle = {
    padding: "15px",
    border: "1px solid #ddd",
    fontSize: "14px",
    textAlign: "center" as const,
    color: "#333",
};

export default LeaderBoardPage;
