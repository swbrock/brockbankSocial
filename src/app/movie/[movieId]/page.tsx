import Feed from "@/components/Feed";
import MovieProfilePage from "@/components/profile/MovieProfile";
import {
    getUserRating,
    getLoggedInUserId,
    createMovieRating,
} from "@/lib/actions";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export default async function MovieProfilePageServer({
    params,
}: {
    params: { movieId: string };
}) {
    const movieId = parseInt(params.movieId);

    // Ensure movieId is valid
    if (isNaN(movieId)) {
        return notFound();
    }

    const loggedInUser = await getLoggedInUserId();
    // Fetch movie and ratings in parallel
    const [movie, ratings] = await Promise.all([
        prisma.movie.findUnique({
            where: { id: movieId },
            include: {
                Post: true,
                genre: true,
            },
        }),
        prisma.rating.findMany({
            where: { movieId },
        }),
    ]);

    // Handle case when the movie is not found
    if (!movie) {
        return notFound();
    }

    // Calculate average rating safely
    const averageRating =
        ratings.length > 0
            ? ratings.reduce((acc, rating) => acc + rating.rating, 0) /
              ratings.length
            : null;

    // Add calculated rating to the movie object
    const movieWithRating = {
        ...movie,
        rating: averageRating,
    };

    // Determine the genre, only if it exists
    const genre = movie.genreId
        ? await prisma.genre.findUnique({
              where: { id: movie.genreId },
          })
        : null;

    const userRating = await getUserRating(loggedInUser, movie.id, "Movie");

    // Render the MovieProfilePage with the fetched data
    return (
        <>
            <MovieProfilePage
                movie={movieWithRating}
                genre={genre}
                userId={loggedInUser}
                userRating={userRating ? userRating : null}
            />
            <Feed entityId={movieId} entityType="movie" />
        </>
    );
}
