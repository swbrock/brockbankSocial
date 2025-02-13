"use server";
import SportsPredictionsPage from "@/components/mainPages/sportsPredictionsPage";
import { getLoggedInUser } from "@/lib/actions";

 // Ensures this component is server-side rendered (for Prisma queries)
//need to make a default page to display all movies and make it so that the user can click on a movie to see more details about it and rate it
// or add a new movie



const SportsPredictions = async () => {
    //get movies from the database
    //const boardGames = await getAllBoardGames();
    //get logged in user
    const user = await getLoggedInUser();
    

    return <SportsPredictionsPage />; // Pass the fetched
}

export default SportsPredictions;