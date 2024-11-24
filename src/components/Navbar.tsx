import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

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
            <div className="hidden md:flex w-[50%] text-sm">
                <div className="flex gap-6 text-gray-600">
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
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/movieIcon.png"
                            alt="Movies"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Movies</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/games.png"
                            alt="Games"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Board Games</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/book.png"
                            alt="Books"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Books</span>
                    </Link>
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <MobileMenu />
            </div>
        </div>
    );
};

export default Navbar;
