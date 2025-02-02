"use client";
import { Movie } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddMovieModal from "../addEvents/AddMovieModal";
import Toast from "../Toast";
import { getAllMovies } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface MoviePageProps {
    dbMovies: Movie[];
}

const MoviePage: React.FC<MoviePageProps> = ({ dbMovies }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    //when the show modal closes, refresh the page
    useEffect(() => {
        if (!showModal) {
            router.refresh();
        }
    }, [showModal, router]);

    useEffect(() => {
        const fetchMovies = async () => {
            const fetchedMovies = await getAllMovies();
            const sortedMovies = [...fetchedMovies].sort(
                (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
            );
            //set all movie ratings to two decimal places
            const moviesWithRatings = sortedMovies.map((movie) => {
                if (movie.rating) {
                    movie.rating = parseFloat(movie.rating.toFixed(2));
                }
                return movie;
            });
            setMovies(moviesWithRatings);
        };
        fetchMovies();
        
    }, [dbMovies]);

    // Filter movies based on the search query
    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 min-h-screen">
            {showModal && (
                <AddMovieModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        🎬 Movie Showcase
                    </h1>
                    <button
                        onClick={() => setShowModal(true)}
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
                        {filteredMovies.map((movie, index) => (
                            <Link key={movie.id} href={`/movie/${movie.id}`}>
                                <div className="relative p-6 bg-white shadow-xl rounded-xl border-2 border-transparent hover:border-purple-400 transition-transform duration-300 hover:scale-105">
                                    <div className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                                        {movie.rating
                                            ? `⭐ ${movie.rating}/5`
                                            : "Unrated"}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {movie.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {movie.director ?? "Director: Unknown"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Rank: {index + 1}
                                    </p>
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
