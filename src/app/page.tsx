import AddEvent from "@/components/AddEvent";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import QuoteBoard from "@/components/QuoteBoard";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";
import { topRatedGames, topRatedBooks, topRatedMovies, getLoggedInUserId, getAllUsers } from "@/lib/actions"; // Import topRatedGames function

const Homepage = async () => {
    const topGames = await topRatedGames(); // Get top rated games
    const topMovies = await topRatedMovies(); // Get top rated movies
    const topBooks = await topRatedBooks(); // Get top rated books
    const userId = await getLoggedInUserId(); // Get the logged in user
    const users = await getAllUsers(); // Get all users


    return (
        <>
        <div className="banner bg-gradient-to-r from-blue-500 to-orange-500 text-white text-center py-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Brockbank Social</h1>
        </div>
        <div className="flex gap-6 pt-6">
            
            <div className="hidden xl:block w-[30%]">

                <LeftMenu type={"home"} boardGames={topGames} />
            </div>
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    <QuoteBoard />
                    <Stories users={users} />
                    <AddEvent userId={userId} />
                    <Feed />
                </div>
            </div>
            <div className="hidden lg:block w-[30%]">
                <RightMenu movies={topMovies} books={topBooks} />
            </div>
        </div>
        </>
    );
};

export default Homepage;
