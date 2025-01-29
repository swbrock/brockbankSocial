"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { getAllUsers, getUsersWithTopRatings } from "@/lib/actions";

type UserProps = {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    highestRatedMovie: string | null;
    highestRatedBook: string | null;
    highestRatedBoardGame: string | null;
    mostWonBoardGame: string | null;
};

const UsersPage = ({ dbUsers }: { dbUsers: UserProps[] }) => {

    const [users, setUsers] = React.useState<UserProps[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getUsersWithTopRatings();
            setUsers(fetchedUsers);
        }
        fetchUsers();
    }, []);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Users</h1>
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="p-4">Username</th>
                            <th className="p-4">First Name</th>
                            <th className="p-4">Last Name</th>
                            <th className="p-4">Highest Rated Movie</th>
                            <th className="p-4">Highest Rated Book</th>
                            <th className="p-4">Highest Rated Board Game</th>
                            <th className="p-4">Most Won Board Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="even:bg-gray-100 hover:bg-blue-100 transition"
                            >
                                <td className="p-4">
                                    <Link
                                        href={`/profile/${user.username}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {user.username}
                                    </Link>
                                </td>
                                <td className="p-4">{user.firstName}</td>
                                <td className="p-4">{user.lastName}</td>
                                <td className="p-4">
                                    {user.highestRatedMovie ?? "N/A"}
                                </td>
                                <td className="p-4">
                                    {user.highestRatedBook ?? "N/A"}
                                </td>
                                <td className="p-4">
                                    {user.highestRatedBoardGame ?? "N/A"}
                                </td>
                                <td className="p-4">
                                    {user.mostWonBoardGame ?? "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                    >
                        <h2 className="text-xl font-bold text-gray-700">
                            <Link
                                href={`/profile/${user.username}`}
                                className="text-blue-600 hover:underline"
                            >
                                {user.username}
                            </Link>
                        </h2>
                        <p className="text-gray-600">
                            <span className="font-semibold">First Name:</span> {user.firstName}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Last Name:</span> {user.lastName}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Highest Rated Movie:</span>{" "}
                            {user.highestRatedMovie ?? "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Highest Rated Book:</span>{" "}
                            {user.highestRatedBook ?? "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Highest Rated Board Game:</span>{" "}
                            {user.highestRatedBoardGame ?? "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Most Won Board Game:</span>{" "}
                            {user.mostWonBoardGame ?? "N/A"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersPage;
