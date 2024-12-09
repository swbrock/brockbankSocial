import React from "react";
import ProfileCard from "./infoCards/ProfileCard";
import TopGame from "./TopGame";
import { BoardGame } from "@prisma/client";

const LeftMenu = ({
    type,
    boardGames,
}: {
    type: "home" | "profile";
    boardGames: BoardGame[];
}) => {
    return (
        <div className="flex flex-col gap-6">
            {type === "home" && <ProfileCard />}
            <div className="p-4 bg-white shadow-md rounded-lg text-sm text-gray-500 flex flex-col gap-2">
                <TopGame boardGames={boardGames} />

                <hr className="border-t-1 border-gray-50 w-36 self-center"></hr>
            </div>
        </div>
    );
};

export default LeftMenu;
