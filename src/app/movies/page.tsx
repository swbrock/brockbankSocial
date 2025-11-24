"use server"; // Ensures this component is server-side rendered (for Prisma queries)
//need to make a default page to display all movies and make it so that the user can click on a movie to see more details about it and rate it
// or add a new movie

import MoviePage from "@/components/mainPages/moviePage";
import { getAllMovies } from "@/lib/actions";

const Movies = async () => {
    //get movies from the database
    const movies = await getAllMovies();

    const sortedMovies = [...movies].sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
    );

    const moviesWithRatings = sortedMovies.map((movie) => {
        if (movie.rating) {
            movie.rating = Number.parseFloat(movie.rating.toFixed(2));
        }
        return movie;
    });

    return <MoviePage movies={moviesWithRatings} />; // Pass the fetched
};

export default Movies;
