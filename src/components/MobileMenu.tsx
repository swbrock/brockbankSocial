import Link from "next/link";
import React, { useState } from "react";

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);  // Close the menu when a link is clicked
    };


    return (
        <div className="md:hidden">
            <div
                className="flex flex-col gap-[4.5px] cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-full ${
                        isOpen ? "rotate-45" : ""
                    } origin-left ease-in-out duration-500`}
                ></div>
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-full ${
                        isOpen ? "opacity-0" : ""
                    } duration-500`}
                ></div>
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-full ${
                        isOpen ? "-rotate-45" : ""
                    } origin-left ease-in-out duration-500`}
                ></div>
            </div>
            {isOpen && (
                <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
                    <Link
                        href="/"
                        className="w-full py-3 text-center rounded-lg bg-gray-100"
                        onClick={handleLinkClick}
                    >
                        Home
                    </Link>
                    <Link
                        href="/boardGames"
                        className="w-full py-3 text-center rounded-lg bg-gray-100"
                        onClick={handleLinkClick}
                    >
                        Board Games
                    </Link>
                    <Link
                        href="/movies"
                        className="w-full py-3 text-center rounded-lg bg-gray-100"
                        onClick={handleLinkClick}
                    >
                        Movies
                    </Link>
                    <Link
                        href="/books"
                        className="w-full py-3 text-center rounded-lg bg-gray-100"
                        onClick={handleLinkClick}
                    >
                        Books
                    </Link>
                    <Link
                        href="/leaderboard"
                        className="w-full py-3 text-center rounded-lg bg-gray-100"
                        onClick={handleLinkClick}
                    >
                        Leaderboard
                    </Link>
                    <Link
                        href="/users"
                        className="w-full py-3 text-center rounded-lg bg-gray-100"
                        onClick={handleLinkClick}
                    >
                        Users
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
