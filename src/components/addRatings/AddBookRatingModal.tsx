import React, { useState, useEffect } from "react";
import WheelSlider from "../WheelSlider";
import { BookRatingResponses } from "@/lib/content";
import { useRouter } from "next/navigation";
import { getBooksNotRatedByUser } from "@/lib/actions";

// Props interface for the modal
interface BookProfileProps {
    id: number;
    name: string;
    rating: number | null;
}

export interface RatingModalProps {
    book?: BookProfileProps | null;
    userId: string;
    onClose: () => void;
    userRating?: number | null;
    setSuccess?: (value: React.SetStateAction<boolean>) => void;
    setError?: (value: React.SetStateAction<string | null>) => void;
}

const AddBookRatingModal: React.FC<RatingModalProps> = ({
    book,
    userId,
    userRating,
    onClose,
    setSuccess,
    setError,
}) => {
    const router = useRouter(); // Get the router instance
    const [books, setBooks] = useState<BookProfileProps[]>([]); // Set the books
    const [selectedBook, setSelectedBook] = useState<BookProfileProps | null>(book || null); // Set the selected book
    const [ratings, setRatings] = useState({
        plot: 0,
        characterDevelopment: 0,
        writingStyle: 0,
        emotionalImpact: 0,
        originality: 0,
    });

    // Fetch books that the user hasn't rated yet
    useEffect(() => {
        if (!book) {
            const fetchBooks = async () => {
                const fetchedBooks = await getBooksNotRatedByUser(userId);
                setBooks(fetchedBooks);
            };
            fetchBooks();
        }
    }, [book, userId]);

    const getRandomResponseForRange = (range: string) => {
        const filteredResponses = BookRatingResponses.find(
            (res) => res.range === range
        );

        if (filteredResponses) {
            const randomIndex = Math.floor(
                Math.random() * filteredResponses.responses.length
            );
            return filteredResponses.responses[randomIndex];
        }

        return null;
    };

    const submitNewBookRating = async (newRating: number) => {
        try {
            // Submit the rating
            const response = await fetch("/api/ratings/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookId: selectedBook?.id,
                    rating: newRating,
                    userId: userId,
                }),
            });

            if (!response.ok) {
                setError && setError("Failed to submit rating");
                throw new Error("Failed to submit rating");
            } else {
                setSuccess && setSuccess(true);
                console.log("Rating submitted successfully!");
            }

            const ratingRange = `${Math.floor(newRating)}-${Math.ceil(newRating)}`; // Determine the range
            const randomResponse = getRandomResponseForRange(ratingRange);

            if (!randomResponse) {
                setError && setError("Invalid rating range");
                throw new Error("Invalid rating range");
            }

            const title = randomResponse.title;
            const content = userRating
                ? `Rating has been updated to ${newRating.toFixed(2)} for ${selectedBook?.name}. ${randomResponse.response}`
                : `A new rating of ${newRating.toFixed(2)} has been submitted for ${selectedBook?.name}. ${randomResponse.response}`;

            // Submit a new post after the rating is saved
            const postResponse = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    content: content,
                    entityId: selectedBook?.id,
                    entityType: "book",
                }),
            });

            if (!postResponse.ok) {
                throw new Error("Failed to submit post");
            } else {
                console.log("Post submitted successfully!");
            }
            //reset ratings and close modal
            setRatings({
                plot: 0,
                characterDevelopment: 0,
                writingStyle: 0,
                emotionalImpact: 0,
                originality: 0,
            });
            onClose(); // Close the modal
            router.refresh(); // Reload the page to see the new rating
        } catch (error) {
            console.error("Error submitting rating or post:", error);
            setError && setError("Error submitting rating or post");}
    };

    // Handle rating change for each category
    const handleChange = (category: string, value: number) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };

    const handleSubmit = () => {
        // Check if all categories are rated with a value between 0 and 5
        const isValid = Object.values(ratings).every(
            (value) => value >= 0 && value <= 5
        );

        const averageRating = // Calculate the average rating
            parseFloat(
                (Object.values(ratings).reduce((a, b) => a + b, 0) / 5).toFixed(1)
            );

        if (isValid) {
            submitNewBookRating(averageRating);
        } else {
            alert("Please provide valid ratings between 0 and 5 for all categories.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96 flex flex-col space-y-6">
                {!book && (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-4">Select a Book</h2>
                        <select
                            className="w-full p-2 rounded-md border border-gray-300 mb-4"
                            onChange={(e) => {
                                const selected = books.find(
                                    (b) => b.id === parseInt(e.target.value)
                                );
                                setSelectedBook(selected ?? null);
                            }}
                        >
                            <option value="">Select a book...</option>
                            {books.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedBook && (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4">Rate This Book</h2>
                        {[
                            ["plot", "Plot and Pacing"],
                            ["characterDevelopment", "Character Development"],
                            ["writingStyle", "Writing Style & Language"],
                            ["emotionalImpact", "Emotional Impact"],
                            ["originality", "Originality"]
                        ].map(([category, label]) => (
                            <div className="mb-4" key={category}>
                                <WheelSlider
                                    value={ratings[category as keyof typeof ratings]}
                                    onChange={(value) => handleChange(category, value)}
                                    max={5}
                                    step={0.1}
                                    min={0}
                                    label={label}
                                />
                            </div>
                        ))}

                        <div className="flex justify-between">
                            <button
                                className="bg-gray-400 text-white p-2 rounded"
                                onClick={onClose} // Close modal on cancel
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleSubmit} // Submit the ratings
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddBookRatingModal;
