import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const movieNames = await prisma.movie.findMany({
            select: { name: true }, // Select only the movie names
            distinct: ["name"], // Ensure distinct names
        });

        return NextResponse.json({
            movieNames: movieNames.map((movie) => movie.name),
        });
    } catch (error) {
        console.error("Error fetching movie names:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
