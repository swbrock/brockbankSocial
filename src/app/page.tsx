import { BoardGame, Movie, Book } from "@prisma/client"; // Import types from Prisma
import prisma from "@/lib/client"; // Import Prisma client
import AddEvent from "@/components/AddEvent";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";

const Homepage = async () => {
    // Fetch top-rated data on the server-side
    const topRatedGames = await prisma.boardGame.findMany({
        orderBy: {
            rating: "desc", // Order by rating (highest to lowest)
        },
        take: 5, // Fetch top 5 only
        include: {
            ratings: true, // Include ratings if needed
        },
    });

    const topRatedMovies = await prisma.movie.findMany({
        orderBy: {
            rating: "desc", // Order by rating (highest to lowest)
        },
        take: 5, // Fetch top 5 only
        include: {
            ratings: true, // Include ratings if needed
            genre: true, // Include genre
        },
    });

    const topRatedBooks = await prisma.book.findMany({
        orderBy: {
            rating: "desc", // Order by rating (highest to lowest)
        },
        take: 5, // Fetch top 5 only
        include: {
            ratings: true, // Include ratings if needed
            genre: true, // Include genre
        },
    });

    return (
        <div className="flex gap-6 pt-6">
            <div className="hidden xl:block w-[30%]">
                <LeftMenu type={"home"} boardGames={topRatedGames} />
            </div>
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    <Stories />
                    <AddEvent />
                    <Feed />
                </div>
            </div>
            <div className="hidden lg:block w-[30%]">
                <RightMenu movies={topRatedMovies} books={topRatedBooks} />
            </div>
        </div>
    );
};

export default Homepage;
