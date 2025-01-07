"use client";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import { getPosts, getPostsByEntity, getPostsByUser } from "@/lib/actions";
import { Post as PostType } from "@prisma/client";

// Feed component to display a list of posts
const Feed = ({
    username,
    entityId,
    entityType,
}: {
    username?: string;
    entityId?: number;
    entityType?: string;
}) => {
    const [posts, setPosts] = useState([] as PostType[]);
    const [displayedPosts, setDisplayedPosts] = useState(5); // Initially display 5 posts
    const [hasMore, setHasMore] = useState(true); // To check if more posts are available    

    // Fetch posts when the component mounts or when the dependencies change
    useEffect(() => {
        const fetchPosts = async () => {
            let fetchedPosts = [];
    
            if (username) {
                // Fetch posts by user
                const userPosts = await getPostsByUser(username);
                fetchedPosts = userPosts;
            } else if (entityType && entityId) {
                // Fetch posts by entity
                const entityPosts = await getPostsByEntity(entityId, entityType);
                fetchedPosts = entityPosts;
            } else {
                // Fetch all posts
                const allPosts = await getPosts();
                fetchedPosts = allPosts;
            }
    
            setPosts(fetchedPosts);
        };
        fetchPosts();
    }, [username, entityId, entityType]);

    // Function to handle loading more posts
    const loadMorePosts = () => {
        const nextDisplayedPosts = displayedPosts + 5;
        setDisplayedPosts(nextDisplayedPosts);

        if (nextDisplayedPosts >= posts.length) {
            setHasMore(false); // No more posts to load
        }
    };

    // Slice the posts array based on how many posts should be displayed
    const postsToDisplay = posts.slice(0, displayedPosts);

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
            {postsToDisplay?.length > 0 ? (
                postsToDisplay.map((post, index) => <Post key={index} post={post} />)
            ) : (
                <p className="text-gray-600">No posts yet.</p>
            )}

            {hasMore && posts.length > displayedPosts && (
                <button
                    onClick={loadMorePosts}
                    className="mt-4 p-2 bg-blue-500 text-white rounded-md"
                >
                    More
                </button>
            )}
        </div>
    );
};

export default Feed;
