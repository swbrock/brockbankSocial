"use server";

import BookPage from "@/components/mainPages/bookPage";
import { getAllBooks } from "@/lib/actions";

const Books  = async () => {
    //get books from the database
    const books = await getAllBooks();

    return <BookPage dbBooks={books} />; // Pass the fetched
}

export default Books;
