import prisma from "@/lib/client";

import React from "react";

const AddBoardGameReviewModal = () => {
    // const testAction = async (formData: FormData) => {
    //     "use server";
    //     const name = formData.get("name") as string;
    //     try {
    //         prisma.boardGame.create({
    //             data: {
    //                 name: name,
    //             },
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const onClose = () => {};

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Game</h2>
                <form action="">
                    <label>
                        Title:
                        <textarea
                            placeholder="Enter game title"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            name="name"
                        ></textarea>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AddBoardGameReviewModal;
