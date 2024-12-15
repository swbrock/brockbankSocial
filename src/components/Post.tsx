"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Post as PostType } from "@prisma/client";

type FeedPostType = PostType & {
    user?: {
        username: string;
        avatar?: string | null;
    };
    boardGame?: {
        id: number;
        name: string;
        length?: number | null;
        rating?: number | null;
        difficulty?: string | null;
        timesPlayed?: number | null;
        image?: string | null;
    };
    movie?: {
        id: number;
        name: string;
        rating?: number | null;
        releaseDate?: Date | null;
        image?: string | null;
    };
    book?: {
        id: number;
        name: string;
        genre?: string | null;
        author?: string | null;
        rating?: number | null;
    };
    game?: {
        id: number;
        name: string;
        platform?: string | null;
        genre?: string | null;
        rating?: number | null;
    };
};

const Post = ({ post }: { post: FeedPostType }) => {
    return (
        <div className="flex flex-col gap-6 p-6 bg-gradient-to-r from-white via-gray-100 to-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
            {/* Header with user info and options */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image
                        src={post.user?.avatar ?? "/noAvatar.png"}
                        alt={post.user?.username ?? "User"}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                    />
                    <span className="font-semibold text-lg text-gray-800">
                        {post.user?.username ?? "Unknown User"}
                    </span>
                </div>
                <Image
                    src="/more.png"
                    alt="More options"
                    width={20}
                    height={20}
                    className="cursor-pointer hover:scale-110 transition-transform"
                />
            </div>

            {/* Main content of the post */}
            <div className="flex flex-col gap-4">
                {post?.image && (
                    <div className="w-full relative aspect-video overflow-hidden rounded-xl shadow-sm">
                        <Image
                            src={post.image}
                            alt="Post content"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {post?.content && (
                    <p className="text-gray-700 text-base leading-relaxed">
                        {post.content}
                    </p>
                )}

                {/* Conditional rendering for polymorphic relationships */}
                {post?.boardGame && (
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">
                            Related Board Game:
                        </span>{" "}
                        {post.boardGame.name}
                    </p>
                )}

                {post?.movie && (
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Related Movie:</span>{" "}
                        {post.movie.name}
                    </p>
                )}

                {post?.book && (
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Related Book:</span>{" "}
                        {post.book.name}
                    </p>
                )}

                {post?.game && (
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Related Game:</span>{" "}
                        {post.game.name}
                    </p>
                )}

                {/* {post?.rating && (
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Rating:</span>{" "}
                        {post.rating.score}/5
                    </p>
                )} */}
            </div>
        </div>
    );
};

export default Post;
