import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/actions"; // Import your logic to interact with the database

// Handle POST requests to create a new post
export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId, title, content, entityId, entityType, image } = body;

        // Input validation
        if (!userId || !title || !content) {
            return NextResponse.json(
                { error: "Missing required fields: userId, title, or content" },
                { status: 400 }
            );
        }

        const newPost = await createPost(
            userId,
            title,
            content,
            entityId,
            entityType,
            image
        );
        return NextResponse.json(
            {
                message: "Post created successfully!",
                post: newPost,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error creating post:", error);

        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}

// Handle GET requests (optional: fetch all posts)
export async function GET(req: NextRequest) {
    return NextResponse.json(
        { message: "GET method not implemented for /api/posts yet" },
        { status: 200 }
    );
}
