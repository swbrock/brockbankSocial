import Feed from "@/components/Feed";
import BookProfilePage from "@/components/profile/BookProfile";
import { getBookById, getLoggedInUserId, getUserRating } from "@/lib/actions";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export default async function BookProfilePageServer({
    params,
}: {
    params: { bookId: string };
}) {
    const bookId = Number.parseInt(params.bookId);

    // Ensure movieId is valid
    if (Number.isNaN(bookId)) {
        return notFound();
    }
    // Fetch the book data and related posts from the database
    const book = await getBookById(bookId);

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
                userRating={userRating ?? null}
            />
            <Feed entityId={bookId} entityType="book" />
        </>
    );
}
