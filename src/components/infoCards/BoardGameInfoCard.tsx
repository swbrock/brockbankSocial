import Link from "next/link";
import React from "react";

const BoardGameInfoCard = () => {
    const boardGameId = "123";

    return (
        <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Board Game Information</span>
                <Link href="/" className="text-blue-500 text-sm">
                    View All
                </Link>
            </div>
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Name:</span>
                    <span>Board Game Name</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Genre:</span>
                    <span>Board Game Genre</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Rating:</span>
                    <span>Board Game Rating</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Length:</span>
                    <span>Board Game Length</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Players:</span>
                    <span>Board Game Players</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Difficulty:</span>
                    <span>Board Game Difficulty</span>
                </div>
            </div>
        </div>
    );
};

export default BoardGameInfoCard;
