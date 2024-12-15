import BookProfilePage from "@/components/profile/BookProfile";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export default async function BookProfilePageServer({
    params,
}: {
    params: { bookId: string };
}) {
    const bookId = parseInt(params.bookId);

    console.log(bookId);

    // Ensure movieId is valid
    if (isNaN(bookId)) {
        return notFound();
    }
    // Fetch the book data and related posts from the database
    const book = await prisma.book.findUnique({
        where: {
            id: bookId, // Ensure the ID is a number
        },
        include: {
            Post: true, // Fetch related posts
            genre: true, // Fetch genre
        },
    });

    const ratings = await prisma.rating.findMany({
        where: {
            bookId: bookId,
        },
    });

    if (!book) {
        return notFound(); // Return 404 if the book is not found
    }

    book.rating =
        ratings.reduce((acc, rating) => acc + rating.rating, 0) /
        ratings.length;

    return <BookProfilePage book={book} />; // Pass the fetched book data to the page component
}
