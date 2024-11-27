import React from "react";
import ProfileCard from "./infoCards/ProfileCard";
import Link from "next/link";
import Image from "next/image";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
    return (
        <div className="flex flex-col gap-6">
            {type === "home" && <ProfileCard />}
            <div className="p-4 bg-white shadow-md rounded-lg text-sm text-gray-500 flex flex-col gap-2">
                <Link
                    href={"/"}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                >
                    <Image
                        src="/posts.png"
                        alt="myposts"
                        width={20}
                        height={20}
                    />
                    <span>My Posts</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"></hr>
                <Link
                    href={"/"}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                >
                    <Image
                        src="/activity.png"
                        alt="activity"
                        width={20}
                        height={20}
                    />
                    <span>Activities</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"></hr>
                <Link
                    href={"/"}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                >
                    <Image
                        src="/events.png"
                        alt="events"
                        width={20}
                        height={20}
                    />
                    <span>Events</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"></hr>
                <Link
                    href={"/"}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                >
                    <Image
                        src="/albums.png"
                        alt="albums"
                        width={20}
                        height={20}
                    />
                    <span>albums</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"></hr>
                <Link
                    href={"/"}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                >
                    <Image
                        src="/videos.png"
                        alt="videos"
                        width={20}
                        height={20}
                    />
                    <span>Videos</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"></hr>
                <Link
                    href={"/"}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                >
                    <Image src="/news.png" alt="news" width={20} height={20} />
                    <span>News</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"></hr>
                <Link
                    href={"/"}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                >
                    <Image
                        src="/settings.png"
                        alt="settings"
                        width={20}
                        height={20}
                    />
                    <span>Settings</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"></hr>
            </div>
        </div>
    );
};

export default LeftMenu;
