"use server"; // Ensures this component is server-side rendered (for Prisma queries)
import UsersPage from "@/components/mainPages/usersPage";
import {
    getAllUsers,
    getTopRatedMovieForUser,
    getTopRatedBookForUser,
    getTopRatedBoardGameForUser,
    getBestWinPercentageGame} from "@/lib/actions";

type UserProps = {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    highestRatedMovie: string | null;
    highestRatedBook: string | null;
    highestRatedBoardGame: string | null;
    mostWonBoardGame: string | null;
};

const Users = async () => {
    // Get users from the database
    const users = await getAllUsers();

    // Fetch additional data for each user
    const userProps: UserProps[] = await Promise.all(
        users.map(async (user) => {
            const highestRatedMovie = await getTopRatedMovieForUser(user.id);
            const highestRatedBook = await getTopRatedBookForUser(user.id);
            const highestRatedBoardGame = await getTopRatedBoardGameForUser(user.id);
            const mostWonBoardGame = await getBestWinPercentageGame(user.id);

            return {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                highestRatedMovie: highestRatedMovie ?? null,
                highestRatedBook: highestRatedBook ?? null,
                highestRatedBoardGame: highestRatedBoardGame ?? null,
                mostWonBoardGame: mostWonBoardGame ?? null,
            };
        })
    );

    // Pass the enriched user data to the UsersPage component
    return <UsersPage dbUsers={userProps} />;
}

export default Users;