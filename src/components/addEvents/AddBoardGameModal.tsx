"use client";
import React, { useState, useEffect } from "react";
import {
    createBoardGame,
    updateBoardGame,
    getAllBoardGameNames,
    getBoardGameById,
} from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AddBoardGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    setSuccess: (success: boolean) => void;
    setError: (error: string | null) => void;
    isEdit?: boolean;
    boardGameId?: number;
}

const AddBoardGameModal: React.FC<AddBoardGameModalProps> = ({
    isOpen,
    onClose,
    setError,
    setSuccess,
    isEdit = false,
    boardGameId,
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

    const router = useRouter();


    useEffect(() => {
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        return () => {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'auto';
        }
        }, []);

    useEffect(() => {
        if (isEdit && boardGameId) {
            const fetchBoardGame = async () => {
                const boardGame = await getBoardGameById(boardGameId);
                setFormData({
                    name: boardGame?.name ?? "",
                    difficulty: boardGame?.difficulty ?? "",
                    length: boardGame?.length ?? 0,
                    image: boardGame?.image ?? "",
                });
                setCoverImage({ secure_url: boardGame?.image });
            };
            fetchBoardGame();
        }
    }, [isEdit, boardGameId]);

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
            setFormData({ ...formData, length: parseInt(e.target.value, 10) });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData.image = coverImage?.secure_url;

        const { name, difficulty, length, image } = formData;

        if (!name || !difficulty || !length || !image) {
            setError("Please fill in all fields.");
            return;
        }

        if (checkBoardGameTitleExists(name) && !isEdit) {
            setError("A board game with this title already exists.");
            return;
        }

        try {
            if (isEdit && boardGameId) {
                await updateBoardGame(
                    boardGameId,
                    formData.name,
                    formData.difficulty,
                    formData.length,
                    formData.image
                );
            } else {
                await createBoardGame(name, difficulty, length, image);
            }
            setSuccess(true);
            setError(null);
            router.refresh(); // Reload the page to see the new rating

            onClose();
        } catch (error) {
            console.error("Error creating/updating board game:", error);
            setError("Failed to save board game. Please try again.");
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
                        {isEdit ? "Edit Board Game" : "Add New Board Game"}
                    </h2>
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
                                <Image
                                    src={coverImage.secure_url}
                                    alt="Board Game Cover"
                                    width={200}
                                    height={200}
                                    className="mt-2 rounded-lg"
                                />
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                {isEdit ? "Save Changes" : "Add Board Game"}
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

export default AddBoardGameModal;
