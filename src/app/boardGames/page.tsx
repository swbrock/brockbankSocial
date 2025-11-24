"use server"; // Ensures this component is server-side rendered (for Prisma queries)
//need to make a default page to display all movies and make it so that the user can click on a movie to see more details about it and rate it
// or add a new movie

import BoardGamePage from "@/components/mainPages/boardGamePage";
import { getAllBoardGames } from "@/lib/actions";

const BoardGames = async () => {
    //get movies from the database
    const boardGames = await getAllBoardGames();

    const sortedBoardGames = [...boardGames].sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
    );

    const boardGamesWithRatings = sortedBoardGames.map((game) => {
        if (game.rating) {
            game.rating = Number.parseFloat(game.rating.toFixed(2));
        }
        return game;
    });

    return <BoardGamePage boardGames={boardGamesWithRatings} />; // Pass the sorted board games
};

export default BoardGames;
