"use server"; // Ensures this component is server-side rendered (for Prisma queries)
//need to make a default page to display all movies and make it so that the user can click on a movie to see more details about it and rate it
// or add a new movie

import BoardGamePage from "@/components/mainPages/boardGamePage";
import prisma from "@/lib/client";

export default async function Movies() {
    //get movies from the database
    const boardGames = await prisma.boardGame.findMany({
        include: {
            ratings: true, // Include ratings for each movie
        },
    });

    boardGames.forEach((boardGame) => {
        boardGame.rating =
            boardGame.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
            boardGame.ratings.length;
    });

    return <BoardGamePage dbBoardGames={boardGames} />; // Pass the fetched
}
