import { createMovie } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, director, genreId, releaseDate, mpaaRating, image } =
            body;

        // Validate input
        if (
            !name ||
            !director ||
            !genreId ||
            !releaseDate ||
            !mpaaRating ||
            !image
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newMovie = await createMovie(
            name,
            director,
            genreId,
            releaseDate,
            mpaaRating,
            image
        );

        return NextResponse.json(
            { message: "Movie created successfully!", movie: newMovie },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating movie:", error);
        return NextResponse.json(
            { error: "Failed to create movie. Please try again." },
            { status: 500 }
        );
    }
}
