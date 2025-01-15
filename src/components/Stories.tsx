import React from "react";
import Image from "next/image";
import Link from "next/link"; // Importing Link from next/link

interface User {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
}

interface StoriesProps {
    users: User[];
}

const Stories = ({ users }: StoriesProps) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
            {users && users.length > 0 && (
                <div className="flex gap-6 md:gap-8 w-max justify-center">
                    {users.map((user) => (
                        <Link key={user.id} href={`/profile/${user.username}`}>
                        <div
                            key={user.id}
                            className="flex flex-col items-center gap-6 cursor-pointer justify-between"  // Increased gap from gap-4 to gap-6
                        >
                                {/* Avatar Image */}
                                <Image
                                    src={user.avatar ?? "/noAvatar.png"} // Default to "/noAvatar.png" if no avatar
                                    alt={`${user.username}'s Avatar`}
                                    className="w-20 h-20 rounded-full ring-2"
                                    width={80}
                                    height={80}
                                />

                                {/* Username with link to profile */}
                                <span className="text-blue-600 hover:underline">
                                        {user.username}
                                </span>
                        </div>
                        </Link>

                    ))}
                </div>
            )}
        </div>
    );
};

export default Stories;
