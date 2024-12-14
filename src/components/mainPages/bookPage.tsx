"use client";
import { Book } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface BookPageProps {
    dbBooks: Book[];
}

const BookPage: React.FC<BookPageProps> = ({ dbBooks }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const sortedBooks = [...dbBooks].sort(
            (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        setBooks(sortedBooks);
    }, [dbBooks]);

    const addBook = () => {
        const newBook: Book = {
            id: Date.now(),
            name: "Mystery Book",
            author: "Unknown Author",
            rating: 0,
            genreId: null,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setBooks((prevBooks) => [newBook, ...prevBooks]);
    };

    const addRating = (bookId: number) => {
        const newRating = prompt("Enter a rating (1-5):");
        const parsedRating = parseFloat(newRating || "0");
        if (parsedRating >= 1 && parsedRating <= 5) {
            setBooks((prevBooks) =>
                prevBooks
                    .map((book) =>
                        book.id === bookId
                            ? { ...book, rating: parsedRating }
                            : book
                    )
                    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            );
        } else {
            alert("Please enter a valid rating between 1 and 5.");
        }
    };

    // Filter books based on the search query
    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        📚 Book Library
                    </h1>
                    <button
                        onClick={addBook}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                    >
                        + Add Book
                    </button>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search books..."
                        className="w-full p-4 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>
                {filteredBooks && filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBooks.map((book, index) => (
                            <Link key={book.id} href={`/book/${book.id}`}>
                                <div className="relative p-6 bg-white shadow-xl rounded-xl border-2 border-transparent hover:border-teal-400 transition-transform duration-300 hover:scale-105">
                                    <div className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                                        {book.rating
                                            ? `⭐ ${book.rating}/5`
                                            : "Unrated"}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {book.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Author: {book.author || "Unknown"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Rank: {index + 1}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent navigation on button click
                                            addRating(book.id);
                                        }}
                                        className="w-full bg-blue-400 text-white py-2 rounded-md shadow-md hover:bg-blue-500 transition duration-200"
                                    >
                                        Rate This Book
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-20">
                        No books match your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookPage;
