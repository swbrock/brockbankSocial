import AddGameModal from "@/components/addEvents/AddGameModal";
import Feed from "@/components/Feed";
import BoardGameProfilePage from "@/components/profile/BoardGameProfile";
import {
    getLoggedInUserId,
    getUserRating,
    getAllUsers,
    getHighestScoresForGame,
} from "@/lib/actions";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

interface HighScore {
    user: string | null;
    score: number;
    date: Date;
}

export default async function BoardGameProfilePageServer({
    params,
}: {
    params: { boardGameId: string };
}) {
    const boardGameId = Number.parseInt(params.boardGameId);

    // Validate the boardGameId
    if (Number.isNaN(boardGameId)) {
        return notFound();
    }

    const loggedInUser = await getLoggedInUserId();

    if (!loggedInUser) {
        return notFound();
    }

    // Fetch the board game
    const boardGame = await prisma.boardGame.findUnique({
        where: { id: boardGameId },
        include: {
            Post: true,
        },
    });

    if (!boardGame) {
        return notFound();
    }

    // Fetch the user's rating for this board game
    const userRating = await getUserRating(
        loggedInUser,
        boardGame.id,
        "BoardGame"
    );

    // Fetch all users and sanitize names
    const users = await getAllUsers();

    for (const user of users) {
        user.firstName ??= "";
        user.lastName ??= "";
    }

    const highScore: HighScore = await getHighestScoresForGame(boardGameId);

    // Render components
    return (
        <>
            <BoardGameProfilePage
                boardGame={boardGame}
                userId={loggedInUser}
                userRating={userRating ?? null}
                highScore={highScore ?? null}
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
