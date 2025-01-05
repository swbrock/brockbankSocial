import Feed from "@/components/Feed";
import MovieProfilePage from "@/components/profile/MovieProfile";
import { getUserRating, getLoggedInUserId, getMovieById } from "@/lib/actions";
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
    const movie = await getMovieById(movieId);

    // Handle case when the movie is not found
    if (!movie) {
        return notFound();
    }

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
                movie={movie}
                genre={genre}
                userId={loggedInUser}
                userRating={userRating ?? null}
            />
            <Feed entityId={movieId} entityType="movie" />
        </>
    );
}
