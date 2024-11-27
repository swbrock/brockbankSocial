import React from "react";

const TopMovie = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg text-sm">
            <div>
                <span className="font-semibold text-gray-500">Top Movie</span>
            </div>
            <div className="flex items-center gap-4 mt-4">
                {/* Show details of the top game */}
                <span className="text-gray-400">Movie Details</span>
            </div>
        </div>
    );
};

export default TopMovie;
