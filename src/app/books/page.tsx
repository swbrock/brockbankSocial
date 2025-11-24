"use server";

import BookPage from "@/components/mainPages/bookPage";
import { getAllBooks } from "@/lib/actions";

const Books = async () => {
    //get books from the database
    const books = await getAllBooks();

    const sortedBooks = [...books].sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
    );

    const booksWithRatings = sortedBooks.map((book) => {
        if (book.rating) {
            book.rating = Number.parseFloat(book.rating.toFixed(2));
        }
        return book;
    });

    return <BookPage books={booksWithRatings} />; // Pass the fetched sorted books
};

export default Books;
