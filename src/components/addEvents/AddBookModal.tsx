"use client";

import React, { useState, useEffect } from "react";
import {
    createBook,
    getAllGenres,
    getAllBookNames,
    updateBook,
    getBookById,
} from "@/lib/actions";
import { Genre } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    setSuccess: (success: boolean) => void;
    setError: (error: string | null) => void;
    isEdit?: boolean;
    bookId?: number;
}

const AddBookModal: React.FC<AddBookModalProps> = ({
    isOpen,
    onClose,
    setError,
    setSuccess,
    isEdit = false,
    bookId,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        genreId: "",
        image: "",
    });
    const [genres, setGenres] = useState<Genre[]>([]);
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

        if (isEdit && bookId) {
            const fetchBook = async () => {
                const book = await getBookById(bookId);
                setFormData({
                    name: book?.name ?? "",
                    author: book?.author ?? "",
                    genreId: book?.genreId?.toString() ?? "",
                    image: book?.image ?? "",
                });
                setCoverImage({ secure_url: book?.image });
            };
            fetchBook();
        }
    }, [isEdit, bookId]);

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
        formData.image = coverImage?.secure_url;

        const { name, author, genreId, image } = formData;

        if (!name || !author || !genreId || !image) {
            setError("Please fill in all fields.");
            return;
        }

        if (checkBookTitleExists(name) && !isEdit) {
            setError("A book with this title already exists.");
            return;
        }

        try {
            if (isEdit && bookId) {
                await updateBook(
                    bookId,
                    formData.name,
                    formData.author,
                    parseInt(formData.genreId),
                    formData.image
                );
            } else {
                await createBook(name, author, parseInt(genreId), image);
            }
            setSuccess(true);
            setError(null);
            router.refresh(); // Reload the page to see the new rating
            onClose();
        } catch (error) {
            console.error("Error creating/updating book:", error);
            setError("Failed to save book. Please try again.");
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
                <h2 className="text-2xl font-bold mb-4">
                    {isEdit ? "Edit Book" : "Add New Book"}
                </h2>
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
                            {isEdit ? "Save Changes" : "Add Book"}
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
