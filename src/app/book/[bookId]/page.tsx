import Feed from "@/components/Feed";
import BookProfilePage from "@/components/profile/BookProfile";
import { getLoggedInUserId, getUserRating } from "@/lib/actions";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export default async function BookProfilePageServer({
    params,
}: {
    params: { bookId: string };
}) {
    const bookId = parseInt(params.bookId);

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

    const userId = await getLoggedInUserId();

    const genre = book.genreId
        ? await prisma.genre.findUnique({
              where: { id: book.genreId },
          })
        : null;

    const userRating = await getUserRating(userId, book.id, "Book");

    return (
        <>
            <BookProfilePage
                book={book}
                genre={genre}
                userId={userId}
                userRating={userRating ? userRating : null}
            />
            <Feed entityId={bookId} entityType="book" />
        </>
    );
}
