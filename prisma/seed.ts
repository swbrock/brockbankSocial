const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

  // Seed Movies
  const movies = [
    { name: 'Snow White and the Seven Dwarfs', genreId: 12, director: 'David Hand', releaseDate: new Date('1937-12-21'), mpaaRating: 'G' },
    { name: 'Pinocchio', genreId: 12, director: 'Ben Sharpsteen, Hamilton Luske', releaseDate: new Date('1940-02-07'), mpaaRating: 'G' },
    { name: 'Fantasia', genreId: 12, director: 'Various', releaseDate: new Date('1940-11-13'), mpaaRating: 'G' },
    { name: 'Dumbo', genreId: 12, director: 'Ben Sharpsteen', releaseDate: new Date('1941-10-23'), mpaaRating: 'G' },
    { name: 'Bambi', genreId: 12, director: 'David Hand', releaseDate: new Date('1942-08-21'), mpaaRating: 'G' },
    { name: 'Cinderella', genreId: 12, director: 'Clyde Geronimi, Wilfred Jackson, Hamilton Luske', releaseDate: new Date('1950-03-04'), mpaaRating: 'G' },
    { name: 'Alice in Wonderland', genreId: 12, director: 'Clyde Geronimi, Wilfred Jackson, Hamilton Luske', releaseDate: new Date('1951-07-28'), mpaaRating: 'G' },
    { name: 'Peter Pan', genreId: 12, director: 'Clyde Geronimi, Wilfred Jackson, Hamilton Luske', releaseDate: new Date('1953-02-05'), mpaaRating: 'G' },
    { name: 'Lady and the Tramp', genreId: 12, director: 'Clyde Geronimi, Wilfred Jackson', releaseDate: new Date('1955-06-22'), mpaaRating: 'G' },
    { name: 'Sleeping Beauty', genreId: 12, director: 'Clyde Geronimi', releaseDate: new Date('1959-01-29'), mpaaRating: 'G' },
    { name: '101 Dalmatians', genreId: 12, director: 'Clyde Geronimi, Hamilton Luske, Wolfgang Reitherman', releaseDate: new Date('1961-01-25'), mpaaRating: 'G' },
    { name: 'The Sword in the Stone', genreId: 12, director: 'Wolfgang Reitherman', releaseDate: new Date('1963-12-25'), mpaaRating: 'G' },
    { name: 'The Jungle Book', genreId: 12, director: 'Wolfgang Reitherman', releaseDate: new Date('1967-10-18'), mpaaRating: 'G' },
    { name: 'The Aristocats', genreId: 12, director: 'Wolfgang Reitherman', releaseDate: new Date('1970-12-11'), mpaaRating: 'G' },
    { name: 'Robin Hood', genreId: 12, director: 'Wolfgang Reitherman', releaseDate: new Date('1973-11-08'), mpaaRating: 'G' },
    { name: 'The Rescuers', genreId: 12, director: 'Wolfgang Reitherman, John Lounsbery, Art Stevens', releaseDate: new Date('1977-06-22'), mpaaRating: 'G' },
    { name: 'The Fox and the Hound', genreId: 12, director: 'Ted Berman, Richard Rich, Art Stevens', releaseDate: new Date('1981-07-10'), mpaaRating: 'G' },
    { name: 'The Little Mermaid', genreId: 12, director: 'Ron Clements, John Musker', releaseDate: new Date('1989-11-17'), mpaaRating: 'G' },
    { name: 'Beauty and the Beast', genreId: 12, director: 'Gary Trousdale, Kirk Wise', releaseDate: new Date('1991-11-22'), mpaaRating: 'G' },
    { name: 'Aladdin', genreId: 12, director: 'Ron Clements, John Musker', releaseDate: new Date('1992-11-25'), mpaaRating: 'G' },
    { name: 'The Lion King', genreId: 12, director: 'Roger Allers, Rob Minkoff', releaseDate: new Date('1994-06-24'), mpaaRating: 'G' },
    { name: 'Pocahontas', genreId: 12, director: 'Mike Gabriel, Eric Goldberg', releaseDate: new Date('1995-06-23'), mpaaRating: 'G' },
    { name: 'The Hunchback of Notre Dame', genreId: 12, director: 'Gary Trousdale, Kirk Wise', releaseDate: new Date('1996-06-21'), mpaaRating: 'G' },
    { name: 'Hercules', genreId: 12, director: 'Ron Clements, John Musker', releaseDate: new Date('1997-06-27'), mpaaRating: 'G' },
    { name: 'Mulan', genreId: 12, director: 'Tony Bancroft, Barry Cook', releaseDate: new Date('1998-06-19'), mpaaRating: 'G' },
    { name: 'Tarzan', genreId: 12, director: 'Kevin Lima, Chris Buck', releaseDate: new Date('1999-06-18'), mpaaRating: 'G' },
    { name: 'The Emperor’s New Groove', genreId: 12, director: 'Mark Dindal', releaseDate: new Date('2000-12-15'), mpaaRating: 'G' },
    { name: 'Lilo & Stitch', genreId: 12, director: 'Chris Sanders, Dean DeBlois', releaseDate: new Date('2002-06-21'), mpaaRating: 'PG' },
    { name: 'Treasure Planet', genreId: 12, director: 'Ron Clements, John Musker', releaseDate: new Date('2002-11-27'), mpaaRating: 'PG' },
    { name: 'Finding Nemo', genreId: 12, director: 'Andrew Stanton', releaseDate: new Date('2003-05-30'), mpaaRating: 'G' },
    { name: 'The Incredibles', genreId: 12, director: 'Brad Bird', releaseDate: new Date('2004-11-05'), mpaaRating: 'PG' },
    { name: 'Cars', genreId: 12, director: 'John Lasseter', releaseDate: new Date('2006-06-09'), mpaaRating: 'G' },
    { name: 'Ratatouille', genreId: 12, director: 'Brad Bird', releaseDate: new Date('2007-06-29'), mpaaRating: 'G' },
    { name: 'WALL-E', genreId: 12, director: 'Andrew Stanton', releaseDate: new Date('2008-06-27'), mpaaRating: 'G' },
    { name: 'Up', genreId: 12, director: 'Pete Docter, Bob Peterson', releaseDate: new Date('2009-05-29'), mpaaRating: 'PG' },
    { name: 'Tangled', genreId: 12, director: 'Nathan Greno, Byron Howard', releaseDate: new Date('2010-11-24'), mpaaRating: 'PG' },
    { name: 'Brave', genreId: 12, director: 'Mark Andrews, Brenda Chapman', releaseDate: new Date('2012-06-22'), mpaaRating: 'PG' },
    { name: 'Frozen', genreId: 12, director: 'Chris Buck, Jennifer Lee', releaseDate: new Date('2013-11-27'), mpaaRating: 'PG' },
    { name: 'Zootopia', genreId: 12, director: 'Byron Howard, Rich Moore, Jared Bush', releaseDate: new Date('2016-03-04'), mpaaRating: 'PG' },
    { name: 'Moana', genreId: 12, director: 'Ron Clements, John Musker', releaseDate: new Date('2016-11-23'), mpaaRating: 'PG' },
    { name: 'Encanto', genreId: 12, director: 'Byron Howard, Jared Bush', releaseDate: new Date('2021-11-24'), mpaaRating: 'PG' }
];


  for (const movie of movies) {
    await prisma.movie.create({
      data: movie
    });
  }

  // Seed Books
  const books = [
    { name: 'War and Peace', author: 'Leo Tolstoy', genreId: 3 },
    { name: 'Brave New World', author: 'Aldous Huxley', genreId: 1 },
    { name: 'The Lord of the Rings: The Fellowship of the Ring', author: 'J.R.R. Tolkien', genreId: 8 },
    { name: 'The Lord of the Rings: The Two Towers', author: 'J.R.R. Tolkien', genreId: 8 },
    { name: 'The Lord of the Rings: The Return of the King', author: 'J.R.R. Tolkien', genreId: 8 },
    { name: 'The Chronicles of Narnia: The Lion, the Witch, and the Wardrobe', author: 'C.S. Lewis', genreId: 8 },
    { name: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genreId: 3 },
    { name: 'Les Misérables', author: 'Victor Hugo', genreId: 3 },
    { name: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genreId: 3 },
    { name: 'Dracula', author: 'Bram Stoker', genreId: 6 },
    { name: 'Frankenstein', author: 'Mary Shelley', genreId: 6 },
    { name: 'Jane Eyre', author: 'Charlotte Brontë', genreId: 9 },
    { name: 'Wuthering Heights', author: 'Emily Brontë', genreId: 9 },
    { name: 'Fahrenheit 451', author: 'Ray Bradbury', genreId: 1 },
    { name: 'The Kite Runner', author: 'Khaled Hosseini', genreId: 3 },
    { name: 'The Book Thief', author: 'Markus Zusak', genreId: 3 },
    { name: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', genreId: 3 },
    { name: 'The Road', author: 'Cormac McCarthy', genreId: 1 },
    { name: 'The Alchemist', author: 'Paulo Coelho', genreId: 3 },
    { name: 'Dune', author: 'Frank Herbert', genreId: 7 },
    { name: 'Ender’s Game', author: 'Orson Scott Card', genreId: 7 },
    { name: 'The Giver', author: 'Lois Lowry', genreId: 1 },
    { name: 'The Name of the Wind', author: 'Patrick Rothfuss', genreId: 8 },
    { name: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genreId: 10 },
    { name: 'Gone Girl', author: 'Gillian Flynn', genreId: 10 },
    { name: 'The Da Vinci Code', author: 'Dan Brown', genreId: 10 },
    { name: 'Sherlock Holmes: The Complete Stories', author: 'Arthur Conan Doyle', genreId: 10 },
    { name: 'The Time Machine', author: 'H.G. Wells', genreId: 7 },
    { name: '20,000 Leagues Under the Sea', author: 'Jules Verne', genreId: 7 },
    { name: 'The War of the Worlds', author: 'H.G. Wells', genreId: 7 },
    { name: 'The Count of Monte Cristo', author: 'Alexandre Dumas', genreId: 3 },
    { name: 'Percy Jackson & The Lightning Thief', author: 'Rick Riordan', genreId: 8 },
    { name: 'The Maze Runner', author: 'James Dashner', genreId: 1 },
    { name: 'Divergent', author: 'Veronica Roth', genreId: 1 },
    { name: 'The Shadow of the Wind', author: 'Carlos Ruiz Zafón', genreId: 10 },
];

  for (const book of books) {
    await prisma.book.create({
      data: book
    });
  }

  // Seed Board Games
  const boardGames = [
    { name: 'Risk', difficulty: 'Medium', length: 120 },
    { name: 'Monopoly', difficulty: 'Easy', length: 90 },
    { name: 'Checkers', difficulty: 'Easy', length: 30 },
    { name: 'Scrabble', difficulty: 'Medium', length: 50 },
    { name: 'Clue', difficulty: 'Easy', length: 45 },
    { name: 'Uno', difficulty: 'Easy', length: 30 },
    { name: 'The Game of Life', difficulty: 'Medium', length: 60 },
    { name: 'Stratego', difficulty: 'Medium', length: 45 },
    { name: 'Battleship', difficulty: 'Easy', length: 30 },
    { name: 'Twilight Imperium', difficulty: 'Hard', length: 240 },
    { name: 'Brass: Birmingham', difficulty: 'Hard', length: 120 },
    { name: 'Agricola', difficulty: 'Hard', length: 90 },
    { name: 'Gloomhaven', difficulty: 'Hard', length: 180 },
    { name: 'Everdell', difficulty: 'Medium', length: 60 },
    { name: 'Ark Nova', difficulty: 'Hard', length: 120 },
    { name: 'Puerto Rico', difficulty: 'Medium', length: 120 },
    { name: 'Great Western Trail', difficulty: 'Hard', length: 120 },
    { name: 'Through the Ages', difficulty: 'Hard', length: 180 },
    { name: 'Mage Knight', difficulty: 'Hard', length: 180 },
    { name: 'Twilight Struggle', difficulty: 'Hard', length: 150 },
    { name: 'King of Tokyo', difficulty: 'Easy', length: 30 },
    { name: 'Castles of Burgundy', difficulty: 'Medium', length: 60 },
    { name: 'Blood Rage', difficulty: 'Medium', length: 90 },
    { name: 'Anachrony', difficulty: 'Hard', length: 120 },
    { name: 'Tzolkin: The Mayan Calendar', difficulty: 'Hard', length: 90 },
    { name: 'The Crew: Mission Deep Sea', difficulty: 'Easy', length: 30 },
    { name: 'Brass: Lancashire', difficulty: 'Hard', length: 120 },
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