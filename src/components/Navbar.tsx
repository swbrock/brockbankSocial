"use client";
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
    return (
        <div className="h-24 flex items-center justify-between">
            {/* LEFT */}
            <div className="md:hidden lg:block w-[20%]">
                <Link href="/" className="font-bold text-xl text-blue-500">
                    Brockbank Social
                </Link>
            </div>
            {/* CENTER */}
            <div className="hidden md:flex w-[90%] text-sm items-center justify-between">
                <div className="flex gap-3 text-gray-600">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/home.png"
                            alt="Home"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Homepage</span>
                    </Link>
                    <Link href="/movies" className="flex items-center gap-2">
                        <Image
                            src="/movieIcon.jpg"
                            alt="Movies"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Movies</span>
                    </Link>
                    <Link
                        href="/boardGames"
                        className="flex items-center gap-2"
                    >
                        <Image
                            src="/games.png"
                            alt="Games"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Board Games</span>
                    </Link>
                    <Link href="/books" className="flex items-center gap-2">
                        <Image
                            src="/book.png"
                            alt="Books"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Books</span>
                    </Link>
                    <Link
                        href="/leaderboard"
                        className="flex items-center gap-2"
                    >
                        <Image
                            src="/leaderboards.png"
                            alt="Leaderboard"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Leaderboard</span>
                    </Link>
                </div>
                <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
                    <input
                        type="text"
                        placeholder="search..."
                        className="bg-transparent outline-none"
                    />
                    <Image src="/search.png" alt="" width={14} height={14} />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="cursor-pointer">
                        <Link
                        href="/users"
                        className="flex items-center gap-2"
                    >
                        <Image
                                src="/people.png"
                                alt=""
                                width={20}
                                height={20}
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
