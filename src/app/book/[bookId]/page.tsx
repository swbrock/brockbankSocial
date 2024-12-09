import BookProfilePage from "@/components/profile/BookProfile";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export default async function BookProfilePageServer({
    params,
}: {
    params: { bookId: string };
}) {
    // Fetch the book data and related posts from the database
    const book = await prisma.book.findUnique({
        where: {
            id: parseInt(params.bookId), // Ensure the ID is a number
        },
        include: {
            Post: true, // Fetch related posts
            genre: true, // Fetch genre
        },
    });

    if (!book) {
        return notFound(); // Return 404 if the book is not found
    }

    return <BookProfilePage book={book} />; // Pass the fetched book data to the page component
}
