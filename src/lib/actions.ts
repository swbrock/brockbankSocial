"use server";
import { auth } from "@clerk/nextjs/server";
import {
    BoardGame,
    Book,
    Movie,
    PrismaClient,
    Rating,
    SportsEvents,
    SportsPredictions,
} from "@prisma/client";
import { z } from "zod";

// Initialize Prisma Client
const prisma = new PrismaClient();

// ------------------------------- Post Actions ------------------------------

// Create a new post
export async function createPost(
    userId: string,
    title: string,
    content: string,
    entityId?: number,
    entityType?: string,
    image?: string
) {
    let boardGameId = null;
    let movieId = null;
    let bookId = null;

    if (entityType === "boardGame") {
        boardGameId = entityId;
    } else if (entityType === "movie") {
        movieId = entityId;
    } else if (entityType === "book") {
        bookId = entityId;
    }

    try {
        const post = await prisma.post.create({
            data: {
                userId,
                title,
                content,
                boardGameId,
                movieId,
                bookId,
                image,
            },
        });
        return post;
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Error creating post");
    }
}

export async function updatePost(
    userId: string,
    postId: number,
    title: string,
    content: string,
    boardGameId?: number,
    movieId?: number,
    bookId?: number
) {
    try {
        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                userId,
                title,
                content,
                boardGameId,
                movieId,
                bookId,
            },
        });
        return post;
    } catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Error updating post");
    }
}

// Delete a post
export async function deletePost(postId: number) {
    try {
        const post = await prisma.post.delete({
            where: { id: postId },
        });
        return post;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Error deleting post");
    }
}

// ------------------------------- Game Actions -------------------------------

interface CreateGameParams {
    boardGameId: number;
    winnerUserId: string;
    playDate: Date;
    playDuration: number;
    image?: string;
}

// Create a new game
export async function createGame({
    boardGameId,
    winnerUserId,
    playDate,
    playDuration,
    image,
}: CreateGameParams) {
    try {
        const game = await prisma.game.create({
            data: {
                boardGameId,
                winnerUserId,
                playDate,
                playDuration,
                image,
            },
        });
        return game;
    } catch (error) {
        console.error("Error creating game:", error);
        throw new Error("Error creating game");
    }
}

//create game participants
export async function createGameParticipants(
    gameId: number,
    userIds: string[]
) {
    try {
        const participants = await prisma.gameParticipant.createMany({
            data: userIds.map((userId) => ({
                gameId,
                userId,
            })),
        });
        return participants;
    } catch (error) {
        console.error("Error creating game participants:", error);
        throw new Error("Error creating game participants");
    }
}

// Update a game
export async function updateGame({
    gameId,
    winnerUserId,
    playDate,
    playDuration,
    image,
}: { gameId: number } & CreateGameParams) {
    try {
        const game = await prisma.game.update({
            where: { id: gameId },
            data: {
                winnerUserId,
                playDate,
                playDuration,
                //image,
            },
        });
        return game;
    } catch (error) {
        console.error("Error updating game:", error);
        throw new Error("Error updating game");
    }
}

// Delete a game
export async function deleteGame(gameId: number) {
    try {
        const game = await prisma.game.delete({
            where: { id: gameId },
        });
        return game;
    } catch (error) {
        console.error("Error deleting game:", error);
        throw new Error("Error deleting game");
    }
}

//get all games
export async function getAllGames() {
    const games = await prisma.game.findMany({
        include: {
            boardGame: true,
            participants: true,
        },
    });
    return games;
}

// ------------------------------- SportsEvent and SportsPrediction Actions -------------------------------

// Create a new SportsEvent
interface CreateSportsEventParams {
    sport: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo?: string;
    awayTeamLogo?: string;
    homeScore?: number;
    awayScore?: number;
    time: Date;
}

export async function createSportsEvent({
    sport,
    homeTeam,
    awayTeam,
    homeTeamLogo,
    awayTeamLogo,
    homeScore,
    awayScore,
    time,
}: CreateSportsEventParams): Promise<SportsEvents> {
    try {
        const sportsEvent = await prisma.sportsEvents.create({
            data: {
                sport,
                homeTeam,
                awayTeam,
                homeTeamLogo,
                awayTeamLogo,
                homeScore,
                awayScore,
                time,
            },
        });
        return sportsEvent;
    } catch (error) {
        console.error("Error creating SportsEvent:", error);
        throw new Error("Error creating SportsEvent");
    }
}

// Update an existing SportsEvent
interface UpdateSportsEventParams extends CreateSportsEventParams {
    eventId: number;
}

export async function updateSportsEvent({
    eventId,
    sport,
    homeTeam,
    awayTeam,
    homeTeamLogo,
    awayTeamLogo,
    homeScore,
    awayScore,
    time,
}: UpdateSportsEventParams): Promise<SportsEvents> {
    try {
        const sportsEvent = await prisma.sportsEvents.update({
            where: { id: eventId },
            data: {
                sport,
                homeTeam,
                awayTeam,
                homeTeamLogo,
                awayTeamLogo,
                homeScore,
                awayScore,
                time,
            },
        });
        return sportsEvent;
    } catch (error) {
        console.error("Error updating SportsEvent:", error);
        throw new Error("Error updating SportsEvent");
    }
}

// Delete a SportsEvent
export async function deleteSportsEvent(
    eventId: number
): Promise<SportsEvents> {
    try {
        const sportsEvent = await prisma.sportsEvents.delete({
            where: { id: eventId },
        });
        return sportsEvent;
    } catch (error) {
        console.error("Error deleting SportsEvent:", error);
        throw new Error("Error deleting SportsEvent");
    }
}

// Create a SportsPrediction
interface CreateSportsPredictionParams {
    userId: string;
    sportsEventId: number;
    homeScore: number;
    awayScore: number;
}

export async function createSportsPrediction({
    userId,
    sportsEventId,
    homeScore,
    awayScore,
}: CreateSportsPredictionParams): Promise<SportsPredictions> {
    try {
        const prediction = await prisma.sportsPredictions.create({
            data: {
                userId,
                sportsEventId,
                homeScore,
                awayScore,
            },
        });
        return prediction;
    } catch (error) {
        console.error("Error creating SportsPrediction:", error);
        throw new Error("Error creating SportsPrediction");
    }
}

// Update a SportsPrediction
export async function updateSportsPrediction({
    predictionId,
    homeScore,
    awayScore,
}: { predictionId: number } & Omit<
    CreateSportsPredictionParams,
    "userId" | "sportsEventId"
>): Promise<SportsPredictions> {
    try {
        const prediction = await prisma.sportsPredictions.update({
            where: { id: predictionId },
            data: {
                homeScore,
                awayScore,
            },
        });
        return prediction;
    } catch (error) {
        console.error("Error updating SportsPrediction:", error);
        throw new Error("Error updating SportsPrediction");
    }
}

// Delete a SportsPrediction
export async function deleteSportsPrediction(
    predictionId: number
): Promise<SportsPredictions> {
    try {
        const prediction = await prisma.sportsPredictions.delete({
            where: { id: predictionId },
        });
        return prediction;
    } catch (error) {
        console.error("Error deleting SportsPrediction:", error);
        throw new Error("Error deleting SportsPrediction");
    }
}

// ------------------------------- User Actions -------------------------------

export const updateProfile = async (
    prevState: { success: boolean; error: boolean },
    payload: { formData: FormData; cover: string }
) => {
    const { formData, cover } = payload;
    const fields = Object.fromEntries(formData);

    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== "")
    );

    const Profile = z.object({
        cover: z.string().optional(),
        firstName: z.string().max(60).optional(),
        lastName: z.string().max(60).optional(),
    });

    const validatedFields = Profile.safeParse({ cover, ...filteredFields });

    if (!validatedFields.success) {
        return { success: false, error: true };
    }

    const { userId } = await auth();

    if (!userId) {
        return { success: false, error: true };
    }

    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: validatedFields.data,
        });
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

//get logged in user
export async function getLoggedInUserId() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    return userId;
}

//get all users
export async function getAllUsers() {
    //just get the users name and id
    const users = await prisma.user.findMany({
        select: { id: true, firstName: true, lastName: true },
    });
    return users;
}

/// ------------------------------- Board Game Actions -------------------------------

export async function topRatedGames(): Promise<BoardGame[]> {
    const games = await prisma.boardGame.findMany({
        orderBy: {
            rating: "desc", // Order by rating (highest to lowest)
        },
        take: 5, // Fetch top 5 only
        include: {
            ratings: true, // Include ratings if needed
        },
    });
    return games;
}

//get all board game names
export async function getAllBoardGameNames() {
    const boardGames = await prisma.boardGame.findMany({
        select: { name: true },
    });
    return boardGames.map((boardGame: { name: string }) => boardGame.name);
}

//get all board games
export async function getAllBoardGames() {
    const boardGames = await prisma.boardGame.findMany({
        include: {
            ratings: true, // Include ratings for each board game
        },
    });
    return boardGames;
}

//create a new board game
export async function createBoardGame(
    name: string,
    difficulty: string,
    length: number,
    image: string
): Promise<BoardGame> {
    try {
        const boardGame = await prisma.boardGame.create({
            data: {
                name,
                difficulty,
                length,
                image,
            },
        });
        return boardGame;
    } catch (error) {
        console.error("Error creating board game:", error);
        throw new Error("Error creating board game");
    }
}

//update board game
export async function updateBoardGame(
    boardGameId: number,
    name: string,
    difficulty: string,
    length: number,
    image: string
) {
    try {
        const boardGame = await prisma.boardGame.update({
            where: { id: boardGameId },
            data: {
                name,
                difficulty,
                length,
                image,
            },
        });
        return boardGame;
    } catch (error) {
        console.error("Error updating board game:", error);
        throw new Error("Error updating board game");
    }
}

//update times played
export async function updateTimesPlayed(boardGameId: number) {
    try {
        const boardGame = await prisma.boardGame.update({
            where: { id: boardGameId },
            data: {
                timesPlayed: {
                    increment: 1,
                },
            },
        });
        return boardGame;
    } catch (error) {
        console.error("Error updating times played:", error);
        throw new Error("Error updating times played");
    }
}

//get board game by id
export async function getBoardGameById(boardGameId: number) {
    const boardGame = await prisma.boardGame.findUnique({
        where: { id: boardGameId },
    });
    return boardGame;
}

// ------------------------------- Movie Actions -------------------------------

//add new movie
export async function createMovie(
    name: string,
    director: string,
    genreId: number,
    releaseDate: Date,
    mpaaRating: string,
    image: string
): Promise<Movie> {
    try {
        const movie = await prisma.movie.create({
            data: {
                name,
                director,
                genreId,
                releaseDate,
                mpaaRating,
                image,
            },
        });
        return movie;
    } catch (error) {
        console.error("Error creating movie:", error);
        throw new Error("Error creating movie");
    }
}

export async function topRatedMovies(): Promise<Movie[]> {
    const movies = await prisma.movie.findMany({
        orderBy: {
            rating: "desc", // Order by rating (highest to lowest)
        },
        take: 5, // Fetch top 5 only
        include: {
            ratings: true, // Include ratings if needed
            genre: true, // Include genre
        },
    });
    return movies;
}

//get just movie names
export async function getAllMovieNames() {
    const movies = await prisma.movie.findMany({
        select: { name: true },
    });
    return movies.map((movie: { name: string }) => movie.name);
}

//get all movies
export async function getAllMovies() {
    const movies = await prisma.movie.findMany({
        include: {
            genre: true, // Include genre details with each movie
            ratings: true, // Include ratings for each movie
        },
    });
    return movies;
}

// ------------------------------- Book Actions -------------------------------

export async function topRatedBooks(): Promise<Book[]> {
    const books = await prisma.book.findMany({
        orderBy: {
            rating: "desc", // Order by rating (highest to lowest)
        },
        take: 5, // Fetch top 5 only
        include: {
            ratings: true, // Include ratings if needed
            genre: true, // Include genre
        },
    });
    return books;
}

//get all book names
export async function getAllBookNames() {
    const books = await prisma.book.findMany({
        select: { name: true },
    });
    return books.map((book: { name: string }) => book.name);
}

export async function createBook(
    name: string,
    author: string,
    genreId: number,
    image: string
): Promise<Book> {
    try {
        const book = await prisma.book.create({
            data: {
                name,
                author,
                genreId,
                image,
            },
        });
        return book;
    } catch (error) {
        console.error("Error creating book:", error);
        throw new Error("Error creating book");
    }
}

//get all books
export async function getAllBooks() {
    const books = await prisma.book.findMany({
        include: {
            genre: true, // Include genre details with each book
            ratings: true, // Include ratings for each book
        },
    });

    return books;
}

//get book by id
export async function getBookById(bookId: number) {
    const book = await prisma.book.findUnique({
        where: { id: bookId },
    });
    return book;
}

//update book
export async function updateBook(
    bookId: number,
    name: string,
    author: string,
    genreId: number,
    image: string
) {
    try {
        const book = await prisma.book.update({
            where: { id: bookId },
            data: {
                name,
                author,
                genreId,
                image,
            },
        });
        return book;
    } catch (error) {
        console.error("Error updating book:", error);
        throw new Error("Error updating book");
    }
}

// ------------------------------- Rating Actions -------------------------------

//update average rating
export async function updateAverageRating(
    entityId: number,
    entityType: "BoardGame" | "Movie" | "Book"
) {
    let averageRating = null;
    let ratings: { rating: number }[];

    if (entityType === "BoardGame") {
        ratings = await prisma.rating.findMany({
            where: { boardGameId: entityId },
            select: { rating: true },
        });
    } else if (entityType === "Movie") {
        ratings = await prisma.rating.findMany({
            where: { movieId: entityId },
            select: { rating: true },
        });
    } else if (entityType === "Book") {
        ratings = await prisma.rating.findMany({
            where: { bookId: entityId },
            select: { rating: true },
        });
    } else {
        throw new Error("Invalid entity type for rating update");
    }

    const totalRatings = ratings.length;
    if (totalRatings > 0) {
        const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
        averageRating = sum / totalRatings;
    }

    if (entityType === "BoardGame") {
        await prisma.boardGame.update({
            where: { id: entityId },
            data: { rating: averageRating },
        });
    } else if (entityType === "Movie") {
        await prisma.movie.update({
            where: { id: entityId },
            data: { rating: averageRating },
        });
    } else if (entityType === "Book") {
        await prisma.book.update({
            where: { id: entityId },
            data: { rating: averageRating },
        });
    }
}

//get all ratings for a board game
export async function getBoardGameRatings(boardGameId: number) {
    if (!boardGameId) {
        throw new Error("Invalid boardGameId provided.");
    }
    const ratings = await prisma.rating.findMany({
        where: { boardGameId },
    });
    return ratings;
}

// Create a new rating for BoardGame
export async function createBoardGameRating(
    userId: string,
    boardGameId: number,
    ratingValue: number
): Promise<Rating> {
    try {
        const rating = await prisma.rating.create({
            data: {
                userId,
                boardGameId,
                rating: ratingValue,
            },
        });

        // Optionally, update the average rating for the BoardGame
        await updateAverageRating(boardGameId, "BoardGame");

        return rating;
    } catch (error) {
        console.error("Error creating BoardGame rating:", error);
        throw new Error("Error creating BoardGame rating");
    }
}

// Create a new rating for Movie
export async function createMovieRating(
    userId: string,
    movieId: number,
    ratingValue: number
): Promise<Rating> {
    try {
        const rating = await prisma.rating.create({
            data: {
                userId,
                movieId,
                rating: ratingValue,
            },
        });

        // Optionally, update the average rating for the Movie
        await updateAverageRating(movieId, "Movie");

        return rating;
    } catch (error) {
        console.error("Error creating Movie rating:", error);
        throw new Error("Error creating Movie rating");
    }
}

// Create a new rating for Book
export async function createBookRating(
    userId: string,
    bookId: number,
    ratingValue: number
): Promise<Rating> {
    try {
        const rating = await prisma.rating.create({
            data: {
                userId,
                bookId,
                rating: ratingValue,
            },
        });

        // Optionally, update the average rating for the Book
        await updateAverageRating(bookId, "Book");

        return rating;
    } catch (error) {
        console.error("Error creating Book rating:", error);
        throw new Error("Error creating Book rating");
    }
}

// Update a rating
export async function updateRating(
    ratingId: number,
    ratingValue: number
): Promise<Rating> {
    try {
        const rating = await prisma.rating.update({
            where: { id: ratingId },
            data: {
                rating: ratingValue,
            },
        });

        // Optionally, update the average rating for the related entity (BoardGame, Movie, Book)
        if (rating.boardGameId) {
            await updateAverageRating(rating.boardGameId, "BoardGame");
        } else if (rating.movieId) {
            await updateAverageRating(rating.movieId, "Movie");
        } else if (rating.bookId) {
            await updateAverageRating(rating.bookId, "Book");
        }

        return rating;
    } catch (error) {
        console.error("Error updating rating:", error);
        throw new Error("Error updating rating");
    }
}

// Delete a rating
export async function deleteRating(ratingId: number): Promise<Rating> {
    try {
        const rating = await prisma.rating.delete({
            where: { id: ratingId },
        });

        // Optionally, update the average rating for the related entity (BoardGame, Movie, Book)
        if (rating.boardGameId) {
            await updateAverageRating(rating.boardGameId, "BoardGame");
        } else if (rating.movieId) {
            await updateAverageRating(rating.movieId, "Movie");
        } else if (rating.bookId) {
            await updateAverageRating(rating.bookId, "Book");
        }

        return rating;
    } catch (error) {
        console.error("Error deleting rating:", error);
        throw new Error("Error deleting rating");
    }
}

//get user rating for specific entity
export async function getUserRating(
    userId: string,
    entityId: number,
    entityType: "BoardGame" | "Movie" | "Book"
) {
    let rating = null;

    if (entityType === "BoardGame") {
        rating = await prisma.rating.findFirst({
            where: { userId, boardGameId: entityId },
        });
    } else if (entityType === "Movie") {
        rating = await prisma.rating.findFirst({
            where: { userId, movieId: entityId },
        });
    } else if (entityType === "Book") {
        rating = await prisma.rating.findFirst({
            where: { userId, bookId: entityId },
        });
    } else {
        throw new Error("Invalid entity type for rating fetch");
    }

    return rating?.rating;
}

// ------------------------------- Genre Actions -------------------------------
export async function getAllGenres() {
    const genres = await prisma.genre.findMany();
    return genres;
}
