"use server"; // Ensures this component is server-side rendered (for Prisma queries)
//need to make a default page to display all movies and make it so that the user can click on a movie to see more details about it and rate it
// or add a new movie

import SportsPredictionsPage from "@/components/mainPages/sportsPredictionsPage";
import { getAllBoardGames } from "@/lib/actions";

const SportsPredictions = async () => {
    //get movies from the database
    //const boardGames = await getAllBoardGames();

    return <SportsPredictionsPage />; // Pass the fetched
}

export default SportsPredictions;