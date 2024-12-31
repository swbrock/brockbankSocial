import { createBook } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, author, genreId, image } = body;

        // Validate input
        if (!name || !author || !genreId || !image) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newBook = await createBook(name, author, genreId, image);

        return NextResponse.json(
            { message: "Book created successfully!", book: newBook },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating book:", error);
        return NextResponse.json(
            { error: "Failed to create book. Please try again." },
            { status: 500 }
        );
    }
}
