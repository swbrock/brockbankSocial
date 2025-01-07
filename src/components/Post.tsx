"use client";
import Image from "next/image";
import React from "react";
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
            </div>

            {/* Main content of the post */}
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    {post.title}
                </h2>

                {/* Conditional rendering for image */}
                {post?.image && (
                    <div className="w-full relative overflow-hidden rounded-xl shadow-sm">
                        <Image
                            src={post.image}
                            alt="Post content"
                            width={300}
                            height={300}
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {post?.content && (
                    <p className="text-gray-700 text-base leading-relaxed">
                        {post.content}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Post;
