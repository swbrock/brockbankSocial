import Link from "next/link";
import React from "react";

const MovieInfoCard = () => {
    const movieId = "123";

    return (
        <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">movie Information</span>
                <Link href="/" className="text-blue-500 text-sm">
                    View All
                </Link>
            </div>
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Name:</span>
                    <span>movie Name</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Director:</span>
                    <span>movie Director</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Genre:</span>
                    <span>movie Genre</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Rating:</span>
                    <span>movie Rating</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Length:</span>
                    <span>movie Length</span>
                </div>
            </div>
        </div>
    );
};

export default MovieInfoCard;
