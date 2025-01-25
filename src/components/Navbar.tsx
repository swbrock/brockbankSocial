"use client";
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
    return (
        <div className="h-24 flex flex-col items-center justify-between px-4">
            {/* HEADER */}
            <div className="w-full text-center mb-4 md:hidden">
                <Link href="/" className="font-bold text-xl text-blue-500">
                    Brockbank Social
                </Link>
            </div>
            
            {/* ICONS */}
            <div className="flex flex-col md:flex-row gap-3 text-gray-600 items-center justify-between w-full text-sm">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/home.png"
                        alt="Home"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        style={{ objectFit: "cover" }}
                    />
                    <span className="hidden md:inline">Homepage</span>
                </Link>
                <Link href="/movies" className="flex items-center gap-2">
                    <Image
                        src="/movieIcon.jpg"
                        alt="Movies"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        style={{ objectFit: "cover" }}
                    />
                    <span className="hidden md:inline">Movies</span>
                </Link>
                <Link href="/boardGames" className="flex items-center gap-2">
                    <Image
                        src="/games.png"
                        alt="Games"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        style={{ objectFit: "cover" }}
                    />
                    <span className="hidden md:inline">Board Games</span>
                </Link>
                <Link href="/books" className="flex items-center gap-2">
                    <Image
                        src="/book.png"
                        alt="Books"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        style={{ objectFit: "cover" }}
                    />
                    <span className="hidden md:inline">Books</span>
                </Link>
                <Link href="/leaderboard" className="flex items-center gap-2">
                    <Image
                        src="/leaderboards.png"
                        alt="Leaderboard"
                        width={16}
                        height={16}
                        style={{ objectFit: "cover" }}
                        className="w-4 h-4"
                    />
                    <span className="hidden md:inline">Leaderboard</span>
                </Link>
            </div>

            {/* SEARCH */}
            <div className="hidden md:flex p-2 bg-slate-100 items-center rounded-xl mt-4">
                <input
                    type="text"
                    placeholder="search..."
                    className="bg-transparent outline-none"
                />
                <Image src="/search.png" alt="" width={14} height={14} />
            </div>

            {/* RIGHT */}
            <div className="w-full flex items-center gap-4 xl:gap-8 justify-center mt-4">
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="cursor-pointer">
                            <Link href="/users" className="flex items-center gap-2">
                                <Image
                                    src="/people.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                    style={{ objectFit: "cover" }}
                                    className="w-8 h-8"
                                />
                            </Link>
                        </div>
                        <UserButton />
                        <MobileMenu />
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            <Image
                                src="/noAvatar.png"
                                alt=""
                                width={20}
                                height={20}
                                style={{ objectFit: "cover" }}
                                className="w-8 h-8"
                            />
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </div>
    );
};

export default Navbar;
