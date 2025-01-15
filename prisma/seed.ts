const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed Genres
  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Horror',
    'Thriller', 'Sci-Fi', 'Fantasy', 'Mystery', 'Romance',
    'Documentary', 'Animation', 'Historical', 'Crime', 'Family'
  ];

  for (const genre of genres) {
    await prisma.genre.create({
      data: {
        name: genre
      }
    });
  }

  // Seed Movies
  const movies = [
    { name: 'The Avengers', genreId: 1, director: 'Joss Whedon', releaseDate: new Date('2012-05-04'), mpaaRating: 'PG-13' },
    { name: 'Inception', genreId: 7, director: 'Christopher Nolan', releaseDate: new Date('2010-07-16'), mpaaRating: 'PG-13' },
    { name: 'The Dark Knight', genreId: 1, director: 'Christopher Nolan', releaseDate: new Date('2008-07-18'), mpaaRating: 'PG-13' },
    { name: 'Forrest Gump', genreId: 3, director: 'Robert Zemeckis', releaseDate: new Date('1994-07-06'), mpaaRating: 'PG-13' },
    { name: 'Shrek', genreId: 12, director: 'Andrew Adamson, Vicky Jenson', releaseDate: new Date('2001-04-22'), mpaaRating: 'PG' },
    { name: 'Jaws', genreId: 6, director: 'Steven Spielberg', releaseDate: new Date('1975-06-20'), mpaaRating: 'PG' },
    { name: 'The Shawshank Redemption', genreId: 3, director: 'Frank Darabont', releaseDate: new Date('1994-09-23'), mpaaRating: 'R' },
    { name: 'Interstellar', genreId: 7, rating: 8.6, director: 'Christopher Nolan', releaseDate: new Date('2014-11-07'), mpaaRating: 'PG-13' }
  ];

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie
    });
  }

  // Seed Books
  const books = [
    { name: '1984', author: 'George Orwell', genreId: 1 },
    { name: 'To Kill a Mockingbird', author: 'Harper Lee', genreId: 3 },
    { name: 'The Catcher in the Rye', author: 'J.D. Salinger', genreId: 3},
    { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genreId: 3 },
    { name: 'The Hobbit', author: 'J.R.R. Tolkien', genreId: 8},
    { name: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genreId: 8},
    { name: 'Pride and Prejudice', author: 'Jane Austen', genreId: 9 },
    { name: 'The Hunger Games', author: 'Suzanne Collins', genreId: 1 },
    { name: 'Moby-Dick', author: 'Herman Melville', genreId: 8}
  ];

  for (const book of books) {
    await prisma.book.create({
      data: book
    });
  }

  // Seed Board Games
  const boardGames = [
    { name: 'Settlers of Catan', difficulty: 'Medium', length: 60 },
    { name: 'Ticket to Ride', difficulty: 'Easy', length: 60 },
    { name: 'Carcassonne', difficulty: 'Medium', length: 35 },
    { name: 'Pandemic', difficulty: 'Hard', length: 45 },
    { name: 'Codenames', difficulty: 'Easy', length: 60 },
    { name: 'Betrayal at House on the Hill', difficulty: 'Medium', length: 60 },
    { name: 'Splendor', difficulty: 'Easy', length: 30 },
    { name: 'Dixit', difficulty: 'Easy', length: 30 },
    { name: '7 Wonders', difficulty: 'Medium', length: 45 },
    { name: 'Azul', difficulty: 'Medium', length: 45 }
  ];

  for (const boardGame of boardGames) {
    await prisma.boardGame.create({
      data: boardGame
    });
  }

  console.log('Data has been seeded!');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });