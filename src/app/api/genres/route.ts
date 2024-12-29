import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Fetch all genres from the database
        const genres = await prisma.genre.findMany({
            include: {
                Movie: true, // Include associated movies
                Book: true, // Include associated books
            },
        });

        return NextResponse.json({ genres }, { status: 200 });
    } catch (error) {
        console.error("Error fetching genres:", error);
        return NextResponse.json(
            { error: "Failed to fetch genres. Please try again." },
            { status: 500 }
        );
    }
}
