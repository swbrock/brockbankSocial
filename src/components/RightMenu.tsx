import React from "react";
import TopGame from "./TopGame";
import TopMovie from "./TopMovie";
import TopBook from "./TopBook";

const RightMenu = ({ userId }: { userId?: string }) => {
    return (
        <div className="flex flex-col gap-6">
            <TopGame />
            <TopMovie />
            <TopBook />
        </div>
    );
};

export default RightMenu;
