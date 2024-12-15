import { BoardGame, Movie, Book } from "@prisma/client"; // Import types from Prisma
import prisma from "@/lib/client"; // Import Prisma client
import AddEvent from "@/components/AddEvent";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";
import { topRatedGames, topRatedBooks, topRatedMovies } from "@/lib/actions"; // Import topRatedGames function

const Homepage = async () => {
    const topGames = await topRatedGames(); // Get top rated games
    const topMovies = await topRatedMovies(); // Get top rated movies
    const topBooks = await topRatedBooks(); // Get top rated

    return (
        <div className="flex gap-6 pt-6">
            <div className="hidden xl:block w-[30%]">
                <LeftMenu type={"home"} boardGames={topGames} />
            </div>
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    <Stories />
                    <AddEvent />
                    <Feed />
                </div>
            </div>
            <div className="hidden lg:block w-[30%]">
                <RightMenu movies={topMovies} books={topBooks} />
            </div>
        </div>
    );
};

export default Homepage;
