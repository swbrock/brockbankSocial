import { createBoardGameRating, createPost } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

// Handle POST requests
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { boardGameId, rating, userId } = body;

        console.log("POST request received:", { boardGameId, rating, userId });

        // Create the board game rating
        const newRating = await createBoardGameRating(
            userId,
            boardGameId,
            rating
        );

        // Create a new post related to the rating

        return NextResponse.json(
            { message: "Rating and post created successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in POST /api/ratings/submit:", error);

        return NextResponse.json(
            { error: "Failed to submit rating. Please try again." },
            { status: 500 }
        );
    }
}

// Handle GET requests
export async function GET(req: NextRequest) {
    return NextResponse.json(
        { message: "GET request received!" },
        { status: 200 }
    );
}
