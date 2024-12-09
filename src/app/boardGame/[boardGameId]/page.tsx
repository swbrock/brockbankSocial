import BoardGameProfilePage from "@/components/profile/BoardGameProfile";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export default async function BoardGameProfilePageServer({
    params,
}: {
    params: { boardGameId: string };
}) {
    // Fetch the book data and related posts from the database
    const boardGame = await prisma.boardGame.findUnique({
        where: {
            id: parseInt(params.boardGameId), // Ensure the ID is a number
        },
        include: {
            Post: true, // Fetch related posts
        },
    });

    if (!boardGame) {
        return notFound(); // Return 404 if the book is not found
    }

    return <BoardGameProfilePage boardGame={boardGame} />; // Pass the fetched book data to the page component
}
