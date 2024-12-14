"use client";
import { Movie } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface MoviePageProps {
    dbMovies: Movie[];
}

const MoviePage: React.FC<MoviePageProps> = ({ dbMovies }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const sortedMovies = [...dbMovies].sort(
            (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        setMovies(sortedMovies);
    }, [dbMovies]);

    const addMovie = () => {
        const newMovie: Movie = {
            id: Date.now(),
            name: "Surprise Movie",
            director: "Mystery Director",
            rating: 0,
            genreId: null,
            mpaaRating: null,
            releaseDate: null,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setMovies((prevMovies) => [newMovie, ...prevMovies]);
    };

    const addRating = (movieId: number) => {
        const newRating = prompt("Enter a rating (1-5):");
        const parsedRating = parseFloat(newRating || "0");
        if (parsedRating >= 1 && parsedRating <= 5) {
            setMovies((prevMovies) =>
                prevMovies
                    .map((movie) =>
                        movie.id === movieId
                            ? { ...movie, rating: parsedRating }
                            : movie
                    )
                    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            );
        } else {
            alert("Please enter a valid rating between 1 and 5.");
        }
    };

    // Filter movies based on the search query
    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        🎬 Movie Showcase
                    </h1>
                    <button
                        onClick={addMovie}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                    >
                        + Add Movie
                    </button>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search movies..."
                        className="w-full p-4 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>
                {filteredMovies && filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMovies.map((movie) => (
                            <Link key={movie.id} href={`/movie/${movie.id}`}>
                                <div
                                    key={movie.id}
                                    className="relative p-6 bg-white shadow-xl rounded-xl border-2 border-transparent hover:border-purple-400 transition-transform duration-300 hover:scale-105"
                                >
                                    <div className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                                        {movie.rating
                                            ? `⭐ ${movie.rating}/5`
                                            : "Unrated"}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {movie.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {movie.director || "Director: Unknown"}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent navigation on button click
                                            addRating(movie.id);
                                        }}
                                        className="w-full bg-green-400 text-white py-2 rounded-md shadow-md hover:bg-green-500 transition duration-200"
                                    >
                                        Rate This Movie
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-20">
                        No movies match your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MoviePage;
