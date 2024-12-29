"use client";

import React, { useState, useEffect } from "react";
import { createMovie, getAllGenres, getAllMovieNames } from "@/lib/actions";
import { Genre } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface AddMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        director: "",
        genreId: "",
        releaseDate: "",
        mpaaRating: "",
        image: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [success, setSuccess] = useState(false);
    const [poster, setPoster] = useState<any>(null);
    const [existingMovieNames, setExistingMovieNames] = useState<string[]>([]); // To store existing movie names

    const router = useRouter();

    useEffect(() => {
        const fetchGenres = async () => {
            const genres = await getAllGenres();
            setGenres(genres);
        };

        const fetchMovieNames = async () => {
            const movies = await getAllMovieNames();
            setExistingMovieNames(movies);
        };
        fetchGenres();
        fetchMovieNames();
    }, []);

    const checkMovieNameExists = (name: string) => {
        return existingMovieNames.includes(name); // Check if the movie name exists
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData.image = poster.secure_url; // Set the image URL to the poster URL

        const { name, director, genreId, releaseDate, mpaaRating, image } =
            formData;

        if (
            !name ||
            !director ||
            !genreId ||
            !releaseDate ||
            !mpaaRating ||
            !image
        ) {
            console.log("Missing required fields");
            console.log({
                name,
                director,
                genreId,
                releaseDate,
                mpaaRating,
                image,
            });
            setError("Please fill in all fields.");
            return;
        }
        if (checkMovieNameExists(name)) {
            setError("A movie with this name already exists.");
            return;
        }

        try {
            const newMovie = await createMovie(
                name,
                director,
                parseInt(genreId),
                new Date(releaseDate),
                mpaaRating,
                image
            );

            if (newMovie) {
                setSuccess(true);
                setError(null);
                onClose();
                alert("Movie added successfully!");
            }
        } catch (error) {
            console.error("Error creating movie:", error);
            setError("Failed to create movie. Please try again.");
            setSuccess(false);
        }
    };

    const handleClose = () => {
        setSuccess(false);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && (
                    <p className="text-green-500 mb-4">
                        Movie added successfully!
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">
                            Movie Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Director</label>
                        <input
                            type="text"
                            name="director"
                            value={formData.director}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Genre</label>
                        <select
                            name="genreId"
                            value={formData.genreId}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        >
                            <option value="">Select Genre</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Release Date
                        </label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            MPAA Rating
                        </label>
                        <select
                            name="mpaaRating"
                            value={formData.mpaaRating}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        >
                            <option value="">Select Rating</option>
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Movie Poster
                        </label>
                        <CldUploadWidget
                            uploadPreset="social"
                            onSuccess={(result) => setPoster(result.info)}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                                >
                                    {poster ? "Change Poster" : "Upload Poster"}
                                </button>
                            )}
                        </CldUploadWidget>
                        {poster && (
                            <img
                                src={poster.secure_url}
                                alt="Uploaded Poster"
                                className="mt-2 w-32 h-48 object-cover rounded"
                            />
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            Add Movie
                        </button>
                        <button
                            type="button"
                            className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMovieModal;
