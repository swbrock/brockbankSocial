import AddEvent from "@/components/AddEvent";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import React from "react";
import Image from "next/image";

const ProfilePage = () => {
    return (
        <div className="flex gap-6 pt-6">
            <div className="hidden xl:block w-[20%]">
                <LeftMenu type={"profile"} />
            </div>
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full h-64 relative">
                            <Image
                                src="/profile.jpeg"
                                layout="fill"
                                objectFit="cover"
                                alt="profile"
                                className="rounded-md"
                            />
                            <Image
                                src="/profile.jpeg"
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white"
                                alt={""}
                            />
                        </div>
                        <h1 className="mt-20 mb-4 text-2xl font-medium">
                            Username
                        </h1>
                        <div className="flex items-center justify-center gap-12 mb-4">
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-medium">TopGame</span>
                                <span className="text-sm">Favorite Game</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-medium">TopMovie</span>
                                <span className="text-sm">Favorite Movie</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-medium">TopBook</span>
                                <span className="text-sm">Favorite Book</span>
                            </div>
                        </div>
                    </div>
                    <Feed />
                </div>
            </div>
            <div className="hidden lg:block w-[30%]">
                <RightMenu />
            </div>
        </div>
    );
};

export default ProfilePage;
