"use client";

import React, { useState, useEffect } from "react";
import { createBook, getAllGenres, getAllBookNames } from "@/lib/actions";
import { Genre } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import Alert from "../Alert";

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        genreId: "",
        image: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [success, setSuccess] = useState(false);
    const [coverImage, setCoverImage] = useState<any>(null);
    const [existingBookTitles, setExistingBookTitles] = useState<string[]>([]);

    const router = useRouter();

    useEffect(() => {
        const fetchGenres = async () => {
            const genres = await getAllGenres();
            setGenres(genres);
        };

        const fetchBookTitles = async () => {
            const titles = await getAllBookNames();
            setExistingBookTitles(titles);
        };

        fetchGenres();
        fetchBookTitles();
    }, []);

    const checkBookTitleExists = (name: string) => {
        return existingBookTitles.includes(name);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData.image = coverImage?.secure_url; // Set the image URL to the cover image URL

        const { name, author, genreId, image } = formData;

        if (!name || !author || !genreId || !image) {
            setError("Please fill in all fields.");
            return;
        }

        if (checkBookTitleExists(name)) {
            setError("A book with this title already exists.");
            return;
        }

        try {
            const newBook = await createBook(
                name,
                author,
                parseInt(genreId),
                image
            );

            if (newBook) {
                setSuccess(true);
                setError(null);
                onClose();
                //alert("Book added successfully!");
                //instead of alert i want to create a nice looking success
            }
        } catch (error) {
            console.error("Error creating book:", error);
            setError("Failed to create book. Please try again.");
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
                <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        onClose={() => setError(null)}
                    />
                )}
                {success && (
                    <Alert
                        type="success"
                        message="Book added successfully!"
                        onClose={() => setSuccess(false)}
                    />
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">
                            Book Title
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
                        <label className="block text-gray-700">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
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
                            Book Cover
                        </label>
                        <CldUploadWidget
                            uploadPreset="social"
                            onSuccess={(result) => setCoverImage(result.info)}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                                >
                                    {coverImage
                                        ? "Change Cover"
                                        : "Upload Cover"}
                                </button>
                            )}
                        </CldUploadWidget>
                        {coverImage && (
                            <img
                                src={coverImage.secure_url}
                                alt="Uploaded Cover"
                                className="mt-2 w-32 h-48 object-cover rounded"
                            />
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            Add Book
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

export default AddBookModal;
