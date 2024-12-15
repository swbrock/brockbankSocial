import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

// Feed component to display a list of posts
const Feed = async ({ username }: { username?: string }) => {
    const { userId } = await auth();

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
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } else {
        posts = await prisma.post.findMany();
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
