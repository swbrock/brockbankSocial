"use client";

import React, { useState, useEffect } from "react";
import {
    createMovie,
    updateMovie,
    getAllGenres,
    getAllMovieNames,
    getMovieById,
} from "@/lib/actions";
import { Genre } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface AddMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
    setSuccess: (success: boolean) => void;
    setError: (error: string | null) => void;
    isEdit?: boolean;
    movieId?: number;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({
    isOpen,
    onClose,
    setSuccess,
    setError,
    isEdit = false,
    movieId,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        director: "",
        genreId: "",
        releaseDate: new Date(),
        mpaaRating: "",
        image: "",
    });
    const [genres, setGenres] = useState<Genre[]>([]);
    const [poster, setPoster] = useState<any>(null);
    const [existingMovieNames, setExistingMovieNames] = useState<string[]>([]);
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

        if (isEdit && movieId) {
            const fetchMovie = async () => {
                const movie = await getMovieById(movieId);
                setFormData({
                    name: movie?.name ?? "",
                    director: movie?.director ?? "",
                    genreId: movie?.genreId?.toString() ?? "",
                    releaseDate: movie?.releaseDate ?? new Date(),
                    mpaaRating: movie?.mpaaRating ?? "",
                    image: movie?.image ?? "",
                });
                setPoster({ secure_url: movie?.image });
            };
            fetchMovie();
        }
    }, [isEdit, movieId]);

    const checkMovieNameExists = (name: string) => {
        return existingMovieNames.includes(name);
    };

    useEffect(() => {
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        return () => {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'auto';
        }
        }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData.image = poster?.secure_url;

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
            setError("Please fill in all fields.");
            return;
        }

        if (checkMovieNameExists(name) && !isEdit) {
            setError("A movie with this name already exists.");
            return;
        }

        try {
            if (isEdit && movieId) {
                await updateMovie(
                    movieId,
                    name,
                    director,
                    parseInt(genreId),
                    new Date(releaseDate),
                    mpaaRating,
                    image
                );
            } else {
                await createMovie(
                    name,
                    director,
                    parseInt(genreId),
                    new Date(releaseDate),
                    mpaaRating,
                    image
                );
            }
            setSuccess(true);
            setError(null);
            router.refresh(); // Reload the page to see the updated content
            onClose();
        } catch (error) {
            console.error("Error creating/updating movie:", error);
            setError("Failed to save movie. Please try again.");
        }
    };

    const handleClose = () => {
        setSuccess(false);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000, // Ensure it's above the other content
            overflow: 'auto', // Ensures modal content can scroll if needed
          }}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                    {isEdit ? "Edit Movie" : "Add New Movie"}
                </h2>
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
                            value={
                                formData.releaseDate.toISOString().split("T")[0]
                            }
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
                            {isEdit ? "Save Changes" : "Add Movie"}
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
        </div>
    );
};

export default AddMovieModal;
