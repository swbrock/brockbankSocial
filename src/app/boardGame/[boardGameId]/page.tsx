import AddGameModal from "@/components/addEvents/AddGameModal";
import Feed from "@/components/Feed";
import BoardGameProfilePage from "@/components/profile/BoardGameProfile";
import { getLoggedInUserId, getUserRating, getAllUsers } from "@/lib/actions";
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
    const [boardGame] = await Promise.all([
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

    const userRating = await getUserRating(
        loggedInUser,
        boardGame.id,
        "BoardGame"
    );

    //get all users
    const users = await getAllUsers();

    //for each through users and if firstname or lastname is null, set it to an empty string
    users.forEach((user) => {
        if (!user.firstName) {
            user.firstName = "";
        }
        if (!user.lastName) {
            user.lastName = "";
        }
    });

    // Render the page components
    return (
        <>
            <BoardGameProfilePage
                boardGame={boardGame}
                userId={loggedInUser}
                userRating={userRating ?? null}
            />
            <AddGameModal
                users={users}
                boardGameId={boardGameId}
                boardGameName={boardGame.name}
            />
            <Feed entityId={boardGameId} entityType="boardGame" />
        </>
    );
}
