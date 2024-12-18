import { createMovieRating, updateRating } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client"; // Import Prisma client

// Handle POST requests (Create or Update Ratings)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { movieId, rating, userId } = body;

        console.log("POST request received:", { movieId, rating, userId });

        // Check if a rating already exists for this user and board game
        const existingRating = await prisma.rating.findFirst({
            where: {
                movieId: movieId,
                userId: userId,
            },
        });

        if (existingRating) {
            // Update the existing rating
            const updatedRating = await updateRating(existingRating.id, rating);
            console.log("Rating updated:", updatedRating);

            return NextResponse.json(
                { message: "Rating updated successfully!", updatedRating },
                { status: 200 }
            );
        } else {
            // Create a new rating if none exists
            const newRating = await createMovieRating(userId, movieId, rating);
            console.log("New rating created:", newRating);

            return NextResponse.json(
                { message: "Rating created successfully!", newRating },
                { status: 201 }
            );
        }
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
    try {
        const { searchParams } = new URL(req.url);
        const movieId = searchParams.get("movieId");

        if (!movieId) {
            return NextResponse.json(
                { error: "Missing movieId parameter." },
                { status: 400 }
            );
        }

        // Fetch all ratings for a specific board game
        const ratings = await prisma.rating.findMany({
            where: { movieId: parseInt(movieId) },
        });

        return NextResponse.json(
            { message: "Ratings fetched successfully!", ratings },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in GET /api/ratings:", error);

        return NextResponse.json(
            { error: "Failed to fetch ratings." },
            { status: 500 }
        );
    }
}
