import Image from "next/image";
import React from "react";

const ProfileCard = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-6">
            <div className="h-20 relative">
                <Image
                    src="/courses.png"
                    alt="profile"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
                <Image
                    src="/profile.jpeg"
                    alt="profile"
                    objectFit="cover"
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
                />
            </div>
            <div className="h-3 flex flex-col items-center">
                <span className="font-semibold">Username</span>
            </div>
            <button className="bg-blue-500 text-white text-sm py-2 rounded-md">
                My Profile
            </button>
        </div>
    );
};

export default ProfileCard;
