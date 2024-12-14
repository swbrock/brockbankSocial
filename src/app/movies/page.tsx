"use server"; // Ensures this component is server-side rendered (for Prisma queries)
//need to make a default page to display all movies and make it so that the user can click on a movie to see more details about it and rate it
// or add a new movie

import MoviePage from "@/components/mainPages/moviePage";
import prisma from "@/lib/client";

export default async function Movies() {
    //get movies from the database
    const movies = await prisma.movie.findMany({
        include: {
            genre: true, // Include genre details with each movie
            ratings: true, // Include ratings for each movie
        },
    });
    //for each movie, get the ratings and the average rating for each movie and add it to the movie object as rating
    movies.forEach((movie) => {
        movie.rating =
            movie.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
            movie.ratings.length;
    });

    return <MoviePage dbMovies={movies} />; // Pass the fetched
}
