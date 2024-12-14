"use server"; // Ensures this component is server-side rendered (for Prisma queries)
//need to make a default page to display all movies and make it so that the user can click on a movie to see more details about it and rate it
// or add a new movie

import BookPage from "@/components/mainPages/bookPage";
import prisma from "@/lib/client";

export default async function Movies() {
    //get movies from the database
    const books = await prisma.book.findMany({
        include: {
            genre: true, // Include genre details with each movie
            ratings: true, // Include ratings for each movie
        },
    });

    console.log(books);

    return <BookPage dbBooks={books} />; // Pass the fetched
}
