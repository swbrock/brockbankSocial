import Link from "next/link";
import React from "react";

const BookInfoCard = () => {
    const bookId = "123";

    return (
        <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Book Information</span>
                <Link href="/" className="text-blue-500 text-sm">
                    View All
                </Link>
            </div>
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Name:</span>
                    <span>Book Name</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Author:</span>
                    <span>Book Author</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Genre:</span>
                    <span>Book Genre</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Rating:</span>
                    <span>Book Rating</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Pages:</span>
                    <span>Book Pages</span>
                </div>
            </div>
        </div>
    );
};

export default BookInfoCard;
