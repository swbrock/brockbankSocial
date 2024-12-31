"use client";

import React, { useState, useEffect } from "react";
import { createBoardGame, getAllBoardGameNames } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

interface AddBoardGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    setSuccess: (success: boolean) => void;
    setError: (error: string | null) => void;
}

const AddBoardGameModal: React.FC<AddBoardGameModalProps> = ({
    isOpen,
    onClose,
    setError,
    setSuccess,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        difficulty: "",
        length: 0, // Ensure it's initialized properly
        image: "",
    });
    const [coverImage, setCoverImage] = useState<any>(null);
    const [existingBoardGameTitles, setExistingBoardGameTitles] = useState<
        string[]
    >([]);

    useEffect(() => {
        const fetchBoardGameTitles = async () => {
            const titles = await getAllBoardGameNames();
            setExistingBoardGameTitles(titles);
        };

        fetchBoardGameTitles();
    }, []);

    const checkBoardGameTitleExists = (name: string) => {
        return existingBoardGameTitles.includes(name);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (e.target.name === "length") {
            // Ensure length is a number and convert to integer
            setFormData({ ...formData, length: parseInt(e.target.value) });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData.image = coverImage?.secure_url; // Set the image URL to the cover image URL

        const { name, difficulty, length, image } = formData;

        if (!name || !difficulty || !length || !image) {
            setError("Please fill in all fields.");
            return;
        }

        if (checkBoardGameTitleExists(name)) {
            setError("A board game with this title already exists.");
            return;
        }

        try {
            const newBoardGame = await createBoardGame(
                name,
                difficulty,
                length,
                image
            );

            if (newBoardGame) {
                setSuccess(true);
                setError(null);
                onClose();
            }
        } catch (error) {
            console.error("Error creating board game:", error);
            setError("Failed to create board game. Please try again.");
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
                <h2 className="text-2xl font-bold mb-4">Add New Board Game</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">
                            Board Game Title
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
                        <label className="block text-gray-700">
                            Difficulty
                        </label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        >
                            <option value="">Select Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Casual">Casual</option>
                            <option value="Medium">Medium</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Hard">Hard</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">
                            Length in Minutes
                        </label>
                        <input
                            type="number"
                            name="length"
                            value={formData.length}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                            min={1}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Board Game Cover
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
                            Add Board Game
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

export default AddBoardGameModal;
