import MovieProfilePage from "@/components/profile/MovieProfile";
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

    // Fetch movie and ratings in parallel
    const [movie, ratings, posts] = await Promise.all([
        prisma.movie.findUnique({
            where: { id: movieId },
            include: {
                Post: {
                    include: {
                        user: true, // Include the user relationship
                    },
                },
                genre: true,
            },
        }),
        prisma.rating.findMany({
            where: { movieId },
        }),
        prisma.post.findMany({
            where: {
                movieId: movieId,
            },
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

    // Render the MovieProfilePage with the fetched data
    return (
        <MovieProfilePage
            movie={movieWithRating}
            posts={posts || []}
            genre={genre}
        />
    );
}
