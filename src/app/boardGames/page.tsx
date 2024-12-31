"use server"; // Ensures this component is server-side rendered (for Prisma queries)
//need to make a default page to display all movies and make it so that the user can click on a movie to see more details about it and rate it
// or add a new movie

import BoardGamePage from "@/components/mainPages/boardGamePage";
import { getAllBoardGames } from "@/lib/actions";

export default async function Movies() {
    //get movies from the database
    const boardGames = await getAllBoardGames();

    return <BoardGamePage dbBoardGames={boardGames} />; // Pass the fetched
}
