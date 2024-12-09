import MovieProfilePage from "@/components/profile/MovieProfile";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export default async function MovieProfilePageServer({
    params,
}: {
    params: { movieId: string };
}) {
    // Fetch the movie data and related posts from the database
    const movie = await prisma.movie.findUnique({
        where: {
            id: parseInt(params.movieId), // Ensure the ID is a number
        },
        include: {
            Post: true, // Fetch related posts
            genre: true, // Fetch genre
        },
    });

    if (!movie) {
        return notFound(); // Return 404 if the movie is not found
    }

    return <MovieProfilePage movie={movie} />; // Pass the fetched movie data to the page component
}
