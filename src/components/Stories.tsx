import React from "react";
import Image from "next/image";

const Stories = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
            <div className="flex gap-8 w-max">
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image
                        src="/profile.jpeg"
                        alt="User"
                        className="w-20 h-20 rounded-full ring-2"
                        width={80}
                        height={80}
                    />
                    <span className="font-medium">Username</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image
                        src="/profile.jpeg"
                        alt="User"
                        className="w-20 h-20 rounded-full ring-2"
                        width={80}
                        height={80}
                    />
                    <span className="font-medium">Username</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image
                        src="/profile.jpeg"
                        alt="User"
                        className="w-20 h-20 rounded-full ring-2"
                        width={80}
                        height={80}
                    />
                    <span className="font-medium">Username</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image
                        src="/profile.jpeg"
                        alt="User"
                        className="w-20 h-20 rounded-full ring-2"
                        width={80}
                        height={80}
                    />
                    <span className="font-medium">Username</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image
                        src="/profile.jpeg"
                        alt="User"
                        className="w-20 h-20 rounded-full ring-2"
                        width={80}
                        height={80}
                    />
                    <span className="font-medium">Username</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image
                        src="/profile.jpeg"
                        alt="User"
                        className="w-20 h-20 rounded-full ring-2"
                        width={80}
                        height={80}
                    />
                    <span className="font-medium">Username</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image
                        src="/profile.jpeg"
                        alt="User"
                        className="w-20 h-20 rounded-full ring-2"
                        width={80}
                        height={80}
                    />
                    <span className="font-medium">Username</span>
                </div>
            </div>
        </div>
    );
};

export default Stories;
