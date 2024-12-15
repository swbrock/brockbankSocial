import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // List of books by Brandon Sanderson, Jane Austen, Rick Riordan, and J.K. Rowling
    const books = [
        // Brandon Sanderson Books
        {
            name: "Mistborn: The Final Empire",
            author: "Brandon Sanderson",
            genreId: 5, // Sci-Fi
        },
        {
            name: "The Way of Kings",
            author: "Brandon Sanderson",
            genreId: 5, // Fantasy
        },
        {
            name: "Warbreaker",
            author: "Brandon Sanderson",
            genreId: 5, // Fantasy
        },
        {
            name: "Elantris",
            author: "Brandon Sanderson",
            genreId: 5, // Fantasy
        },

        // Jane Austen Books
        {
            name: "Pride and Prejudice",
            author: "Jane Austen",
            genreId: 4, // Drama
        },
        {
            name: "Sense and Sensibility",
            author: "Jane Austen",
            genreId: 4, // Drama
        },
        {
            name: "Emma",
            author: "Jane Austen",
            genreId: 4, // Drama
        },
        {
            name: "Mansfield Park",
            author: "Jane Austen",
            genreId: 4, // Drama
        },
        {
            name: "Northanger Abbey",
            author: "Jane Austen",
            genreId: 4, // Drama
        },

        // Rick Riordan Books
        {
            name: "Percy Jackson & The Olympians: The Lightning Thief",
            author: "Rick Riordan",
            genreId: 2, // Sci-Fi/Adventure
        },
        {
            name: "Percy Jackson & The Olympians: The Sea of Monsters",
            author: "Rick Riordan",
            genreId: 2, // Sci-Fi/Adventure
        },
        {
            name: "The Titan's Curse",
            author: "Rick Riordan",
            genreId: 2, // Sci-Fi/Adventure
        },
        {
            name: "The Battle of the Labyrinth",
            author: "Rick Riordan",
            genreId: 2, // Sci-Fi/Adventure
        },
        {
            name: "The Last Olympian",
            author: "Rick Riordan",
            genreId: 2, // Sci-Fi/Adventure
        },
        {
            name: "The Red Pyramid",
            author: "Rick Riordan",
            genreId: 2, // Sci-Fi/Adventure
        },

        // J.K. Rowling Books
        {
            name: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            genreId: 5, // Fantasy
        },
        {
            name: "Harry Potter and the Chamber of Secrets",
            author: "J.K. Rowling",
            genreId: 5, // Fantasy
        },
        {
            name: "Harry Potter and the Prisoner of Azkaban",
            author: "J.K. Rowling",
            genreId: 5, // Fantasy
        },
        {
            name: "Harry Potter and the Goblet of Fire",
            author: "J.K. Rowling",
            genreId: 5, // Fantasy
        },
        {
            name: "Harry Potter and the Order of the Phoenix",
            author: "J.K. Rowling",
            genreId: 5, // Fantasy
        },
        {
            name: "Harry Potter and the Half-Blood Prince",
            author: "J.K. Rowling",
            genreId: 5, // Fantasy
        },
        {
            name: "Harry Potter and the Deathly Hallows",
            author: "J.K. Rowling",
            genreId: 5, // Fantasy
        },
        {
            name: "Fantastic Beasts and Where to Find Them",
            author: "J.K. Rowling",
            genreId: 5, // Fantasy
        },
    ];

    // Insert each book into the database
    for (const book of books) {
        await prisma.book.create({
            data: {
                name: book.name,
                author: book.author,
                genreId: book.genreId,
                rating: null, // Rating is set to null
                image: null, // Image is set to null
            },
        });
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
