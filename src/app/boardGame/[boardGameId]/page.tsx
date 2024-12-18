import Feed from "@/components/Feed";
import BoardGameProfilePage from "@/components/profile/BoardGameProfile";
import {
    getLoggedInUserId,
    createBoardGameRating,
    getUserRating,
} from "@/lib/actions";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export default async function BoardGameProfilePageServer({
    params,
}: {
    params: { boardGameId: string }; // IDs from Next.js params are strings
}) {
    // Convert the ID to a number
    const boardGameId = parseInt(params.boardGameId);

    const loggedInUser = await getLoggedInUserId();

    // Ensure the ID is valid
    if (isNaN(boardGameId)) {
        return notFound();
    }

    // Fetch the board game and ratings
    const [boardGame, ratings] = await Promise.all([
        prisma.boardGame.findUnique({
            where: { id: boardGameId },
            include: {
                Post: true,
            },
        }),
        prisma.rating.findMany({
            where: { boardGameId },
        }),
    ]);

    // Handle the case where the board game is not found
    if (!boardGame) {
        return notFound();
    }

    // Calculate average rating, if ratings exist
    const averageRating =
        ratings.length > 0
            ? ratings.reduce((acc, rating) => acc + rating.rating, 0) /
              ratings.length
            : null;

    // Add the average rating to the board game object
    boardGame.rating = averageRating;

    const userRating = await getUserRating(
        loggedInUser,
        boardGame.id,
        "BoardGame"
    );

    // Render the page components
    return (
        <>
            <BoardGameProfilePage
                boardGame={boardGame}
                userId={loggedInUser}
                userRating={userRating ? userRating : null}
            />
            <Feed entityId={boardGameId} entityType="boardGame" />
        </>
    );
}
