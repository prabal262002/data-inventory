const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const {initializeDB} = require("./db/db.connect");
const fs = require("fs");
const Book = require("./models/book.model");
const { log } = require("console");

initializeDB();

const jsonData = fs.readFileSync('books.json', 'utf-8');
const booksData = JSON.parse(jsonData);

function seedData(){
    try{
        for(const book of booksData){
            const newBooks = new Book({
                title: book.title,
                author: book.author,
                publishedYear: book.publishedYear,
                genre: book.genre,
                language: book.language,
                country: book.country,
                rating: book.rating,
                summary: book.summary,
                coverImageUrl: book.coverImageUrl
            });
            console.log(newBooks.title);
            newBooks.save()
        }
    }catch(error){
        log("Error seeding the data..", error);
    }
}

seedData();