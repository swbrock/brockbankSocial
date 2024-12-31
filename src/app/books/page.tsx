"use server";

import BookPage from "@/components/mainPages/bookPage";
import { getAllBooks } from "@/lib/actions";

export default async function Books() {
    //get movies from the database
    const books = await getAllBooks();

    return <BookPage dbBooks={books} />; // Pass the fetched
}
