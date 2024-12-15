import React from "react";
import TopMovie from "./TopMovie";
import TopBook from "./TopBook";
import { Book, Movie } from "@prisma/client";

const RightMenu = ({ movies, books }: { movies: Movie[]; books: Book[] }) => {
    console.log(movies);
    return (
        <div className="flex flex-col gap-6">
            <TopMovie movies={movies} />
            <TopBook books={books} />
        </div>
    );
};

export default RightMenu;
