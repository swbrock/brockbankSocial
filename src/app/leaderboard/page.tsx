"use server";

import LeaderBoardPage from "@/components/mainPages/leaderBoardPage";
import { getAllBoardGames, getAllGames, getAllUsers } from "@/lib/actions";

export default async function Leaderboard() {
    const dbUsers = await getAllUsers();
    const games = await getAllGames();
    const boardGames = await getAllBoardGames();

    return (
        <LeaderBoardPage
            dbUsers={dbUsers}
            dbGames={games}
            dbBoardGames={boardGames}
        />
    );
}
