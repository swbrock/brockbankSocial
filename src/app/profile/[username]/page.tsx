import AddEvent from "@/components/AddEvent";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import React from "react";
import Image from "next/image";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import UpdateUser from "@/components/UpdateUser";
import { auth } from "@clerk/nextjs/server";
import { topRatedBooks, topRatedGames, topRatedMovies } from "@/lib/actions";
import RightMenu from "@/components/RightMenu";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    const topGames = await topRatedGames();
    const topMovies = await topRatedMovies();
    const topBooks = await topRatedBooks();

    const user = await prisma.user.findUnique({
        where: {
            username: params.username,
        },
        include: {
            ratings: {
                include: {
                    boardGame: true, // Include related board game
                    movie: true, // Include related movie
                    book: true, // Include related book
                },
            },
        },
    });

    if (!user) {
        return notFound();
    }
    const { userId: currentUserId } = await auth();

    // Find the highest rated game
    const highestRatedGames = user.ratings
        .filter((rating) => rating.boardGame)
        .reduce((acc, rating) => {
            if (!acc.length || rating.rating > acc[0].rating) {
                // If no items in accumulator or current rating is higher, reset the list with this item
                return [rating];
            } else if (rating.rating === acc[0].rating) {
                // If the rating is tied, add it to the accumulator
                acc.push(rating);
            }
            return acc;
        }, [] as typeof user.ratings);

    // Find the highest rated movie
    const highestRatedMovies = user.ratings
        .filter((rating) => rating.movie)
        .reduce((acc, rating) => {
            if (!acc.length || rating.rating > acc[0].rating) {
                // If no items in accumulator or current rating is higher, reset the list with this item
                return [rating];
            } else if (rating.rating === acc[0].rating) {
                // If the rating is tied, add it to the accumulator
                acc.push(rating);
            }
            return acc;
        }, [] as typeof user.ratings);

    // Find the highest rated book
    const highestRatedBooks = user.ratings
        .filter((rating) => rating.book)
        .reduce((acc, rating) => {
            if (!acc.length || rating.rating > acc[0].rating) {
                // If no items in accumulator or current rating is higher, reset the list with this item
                return [rating];
            } else if (rating.rating === acc[0].rating) {
                // If the rating is tied, add it to the accumulator
                acc.push(rating);
            }
            return acc;
        }, [] as typeof user.ratings);

    return (
        <div className="flex gap-6 pt-6">
            <div className="hidden xl:block w-[30%]">
                <LeftMenu type={"profile"} boardGames={topGames} />
            </div>
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full h-64 relative">
                            <Image
                                src={user.cover || "/noCover.png"}
                                layout="fill"
                                objectFit="cover"
                                alt="profile"
                                className="rounded-md"
                            />
                            <Image
                                src={user.avatar || "/noAvatar.png"}
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white"
                                alt={""}
                            />
                        </div>
                        <h1 className="mt-20 mb-4 text-2xl font-medium">
                            {user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.username}
                        </h1>
                        {currentUserId === user.id ? (
                            <div className="flex justify-between items-center font-medium">
                                <UpdateUser user={user} />
                            </div>
                        ) : null}

                        <div className="flex items-center justify-center gap-12 mb-4">
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-medium">Top Game(s)</span>
                                <div className="text-sm">
                                    {highestRatedGames.length
                                        ? highestRatedGames.map((rating) => (
                                              <div key={rating.boardGame?.id}>
                                                  {/* Show name always */}
                                                  {rating.boardGame?.name}
                                                  {/* Show rating only on larger screens */}
                                                  <span className="hidden sm:inline-block">
                                                      - {rating.rating} stars
                                                  </span>
                                              </div>
                                          ))
                                        : "No ratings yet"}
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-medium">
                                    Top Movie(s)
                                </span>
                                <div className="text-sm">
                                    {highestRatedMovies.length
                                        ? highestRatedMovies.map((rating) => (
                                              <div key={rating.movie?.id}>
                                                  {/* Show name always */}
                                                  {rating.movie?.name}
                                                  {/* Show rating only on larger screens */}
                                                  <span className="hidden sm:inline-block">
                                                      - {rating.rating} stars
                                                  </span>
                                              </div>
                                          ))
                                        : "No ratings yet"}
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-medium">Top Book(s)</span>
                                <div className="text-sm">
                                    {highestRatedBooks.length
                                        ? highestRatedBooks.map((rating) => (
                                              <div key={rating.book?.id}>
                                                  {/* Show name always */}
                                                  {rating.book?.name}
                                                  {/* Show rating only on larger screens */}
                                                  <span className="hidden sm:inline-block">
                                                      - {rating.rating} stars
                                                  </span>
                                              </div>
                                          ))
                                        : "No ratings yet"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Feed username={user.username} />
                </div>
            </div>
            <div className="hidden xl:block w-[20%]">
                <RightMenu movies={topMovies} books={topBooks} />
            </div>
        </div>
    );
};

export default ProfilePage;
