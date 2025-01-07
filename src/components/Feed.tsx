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
    const [isLoading, setIsLoading] = useState(false); // For loading state
    const [error, setError] = useState<string | null>(null); // For error handling
    const [showBackToTop, setShowBackToTop] = useState(false); // To control "Back to Top" button visibility


    // Function to fetch posts
    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let fetchedPosts = [];
    
            if (username) {
                // Fetch posts by user
                fetchedPosts = await getPostsByUser(username);
            } else if (entityType && entityId) {
                // Fetch posts by entity
                fetchedPosts = await getPostsByEntity(entityId, entityType);
            } else {
                // Fetch all posts
                fetchedPosts = await getPosts();
            }
    
            setPosts(fetchedPosts);
            setHasMore(fetchedPosts.length > displayedPosts);
        } catch (err) {
            setError("Failed to fetch posts. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch posts when the component mounts or when the dependencies change
    useEffect(() => {
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

    // Handle scroll to show/hide "Back to Top" button
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300); // Show button when scrolled 300px down
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // Cleanup
    }, []);

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Slice the posts array based on how many posts should be displayed
    const postsToDisplay = posts.slice(0, displayedPosts);

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
            {isLoading ? (
                <p className="text-gray-600">Loading posts...</p>
            ) : postsToDisplay.length > 0 ? (
                postsToDisplay.map((post, index) => <Post key={index} post={post} />)
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-gray-600">No posts yet.</p>
                </div>
            )}

            {hasMore && posts.length > displayedPosts && (
                <button
                    onClick={loadMorePosts}
                    className="mt-4 p-2 bg-blue-500 text-white rounded-md"
                >
                    More
                </button>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-md"
                >
                    ↑ Top
                </button>
            )}
        </div>
    );
};

export default Feed;
