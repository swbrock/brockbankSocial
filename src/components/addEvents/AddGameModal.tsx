"use client";

import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import MultiSelectDropdown from "../MultiSelectDropdown";
import {
    createGame,
    createGameParticipants,
    updateTimesPlayed,
} from "@/lib/actions"; // Replace with actual action for game creation
import Toast from "../Toast";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
}

interface AddGameModalProps {
    users: User[];
    boardGameId: number;
    boardGameName: string;
}

const AddGameModal: React.FC<AddGameModalProps> = ({
    users,
    boardGameId,
    boardGameName,
}) => {
    const [formData, setFormData] = useState({
        boardGameId: boardGameId,
        winnerUserId: "",
        playDate: new Date(), // Changed from string to Date
        playDuration: 0, // Default to 0 as number
        image: "",
    });
    const [coverImage, setCoverImage] = useState<any>(null);
    const [participants, setParticipants] = useState<User[] | null>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const router = useRouter(); // Get the router instance

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            if (name === "playDate") {
                return { ...prev, playDate: new Date(value) }; // Convert string to Date
            } else if (name === "playDuration") {
                return { ...prev, playDuration: Number(value) }; // Convert string to number
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    const onClose = () => {
        setIsDropdownOpen(false);
        setFormData({
            boardGameId: boardGameId,
            winnerUserId: "",
            playDate: new Date(),
            playDuration: 0,
            image: "",
        });
        setCoverImage(null);
        setParticipants(null);
    };

    const handleParticipantsChange = (user: User) => {
        setParticipants((prev) => {
            if (prev?.some((u) => u.id === user.id)) {
                return prev.filter((u) => u.id !== user.id);
            } else {
                return [...(prev || []), user];
            }
        });
    };

    useEffect(() => {
        if (participants?.length === 1) {
            setFormData({ ...formData, winnerUserId: participants[0].id });
        } else if (participants?.length === 0) {
            setFormData({ ...formData, winnerUserId: "" });
        }
    }, [participants]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { boardGameId, winnerUserId, playDate, playDuration } = formData;

        if (!boardGameId || !winnerUserId || !playDate || !playDuration) {
            setError("Please fill in all fields.");
            return;
        }

        const gameData = {
            ...formData,
            image: coverImage?.secure_url || "",
        };

        try {
            const result = await createGame(gameData);

            if (result) {
                try {
                    const gameParticipants =
                        participants?.map((p) => p.id) || [];
                    await createGameParticipants(result.id, gameParticipants);
                } catch (error) {
                    console.error("Error adding game participants:", error);
                    setError(
                        "Failed to add game participants. Please try again."
                    );
                }
                try {
                    await updateTimesPlayed(boardGameId);
                } catch (error) {
                    console.error("Error updating times played:", error);
                    setError(
                        "Failed to update times played for the board game. Please try again."
                    );
                }
                const title = `Played ${boardGameName}`;
                //content will include the players who played, who won and the duration
                const content = `Played by ${participants
                    ?.map((p) => `${p.firstName} ${p.lastName}`)
                    .join(", ")}. ${
                    participants?.find((p) => p.id === winnerUserId)?.firstName
                } ${
                    participants?.find((p) => p.id === winnerUserId)?.lastName
                } won the game. The game lasted for ${playDuration} minutes.`;
                const postResponse = await fetch("/api/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: winnerUserId,
                        title: title,
                        content: content,
                        entityId: result.boardGameId,
                        entityType: "boardGame",
                        image: result.image ?? "",
                    }),
                });

                if (!postResponse.ok) {
                    throw new Error("Failed to submit post");
                } else {
                    console.log("Post submitted successfully!");
                }
                onClose(); // Close the modal
                router.refresh(); // Reload the page to see the new rating
                setSuccess(true);
                setError(null);
                onClose();
            }
        } catch (error) {
            console.error("Error adding game:", error);
            setError("Failed to add game. Please try again.");
            setSuccess(false);
        }
    };

    return (
        <div className="flex justify-center items-center p-4">
            <button
                onClick={() => setIsDropdownOpen(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Add New Game
            </button>
            {success && (
                <Toast
                    type="success"
                    message="Game added successfully!"
                    onClose={() => setSuccess(false)}
                />
            )}
            {error && (
                <Toast
                    type="error"
                    message={error}
                    onClose={() => setError(null)}
                />
            )}

            {isDropdownOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4 text-center">
                            Add New Game for {boardGameName}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="participants"
                                        className="block text-gray-700"
                                    >
                                        Participants
                                    </label>
                                    <span className="text-gray-500 text-sm ml-2">
                                        (Select participants for the game)
                                    </span>
                                    <MultiSelectDropdown
                                        options={users}
                                        selectedOptions={participants || []}
                                        onChange={handleParticipantsChange}
                                    />
                                </div>

                                {participants && (
                                    <div>
                                        <label
                                            htmlFor="winnerUserId"
                                            className="block text-gray-700"
                                        >
                                            Winner
                                        </label>
                                        <span className="text-gray-500 text-sm ml-2">
                                            (Select the winner of the game)
                                        </span>
                                        <select
                                            id="winnerUserId"
                                            name="winnerUserId"
                                            value={formData.winnerUserId}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border rounded"
                                            required
                                        >
                                            <option value="">
                                                Select Winner
                                            </option>
                                            {participants.map((participant) => (
                                                <option
                                                    key={participant.id}
                                                    value={participant.id}
                                                >
                                                    {participant.firstName}{" "}
                                                    {participant.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div>
                                    <label
                                        htmlFor="playDate"
                                        className="block text-gray-700"
                                    >
                                        Play Date
                                    </label>
                                    <input
                                        id="playDate"
                                        name="playDate"
                                        type="date"
                                        value={
                                            formData.playDate
                                                .toISOString()
                                                .split("T")[0]
                                        } // Format as date string
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="playDuration"
                                        className="block text-gray-700"
                                    >
                                        Play Duration (Minutes)
                                    </label>
                                    <input
                                        id="playDuration"
                                        name="playDuration"
                                        type="number"
                                        placeholder="Enter duration in minutes"
                                        value={formData.playDuration}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded"
                                        required
                                        min={1}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">
                                        Board Game Cover
                                    </label>
                                    <CldUploadWidget
                                        uploadPreset="social"
                                        onSuccess={(result) =>
                                            setCoverImage(result.info)
                                        }
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
                            </div>

                            <div className="flex justify-center mt-6 space-x-3">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddGameModal;
