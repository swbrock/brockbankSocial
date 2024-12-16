import React from "react";
import Post from "./Post";
import prisma from "@/lib/client";

// Feed component to display a list of posts
const Feed = async ({
    username,
    boardGameId,
    movieId,
    bookId,
    gameId,
}: {
    username?: string;
    boardGameId?: number;
    movieId?: number;
    bookId?: number;
    gameId?: number;
}) => {
    let posts = [];
    if (username) {
        posts = await prisma.post.findMany({
            where: {
                user: {
                    username: username,
                },
            },
            include: {
                user: true,
                boardGame: true,
                movie: true,
                book: true,
                game: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } else if (boardGameId) {
        posts = await prisma.post.findMany({
            where: {
                boardGameId: boardGameId,
            },
            include: {
                user: true,
                boardGame: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } else if (movieId) {
        posts = await prisma.post.findMany({
            where: {
                movieId: movieId,
            },
            include: {
                user: true,
                movie: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    // Add the bookId condition
    else if (bookId) {
        posts = await prisma.post.findMany({
            where: {
                bookId: bookId,
            },
            include: {
                user: true,
                book: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } else if (gameId) {
        posts = await prisma.post.findMany({
            where: {
                gameId: gameId,
            },
            include: {
                user: true,
                game: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } else {
        posts = await prisma.post.findMany({
            include: {
                user: true,
                // boardGame: true,
                // movie: true,
                // book: true,
                // game: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
            {posts?.length > 0 ? (
                posts.map((post, index) => <Post key={index} post={post} />)
            ) : (
                <p className="text-gray-600">No posts yet.</p>
            )}
        </div>
    );
};

export default Feed;
