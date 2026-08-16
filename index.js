const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const { initializeDB } = require("./db/db.connect");
const fs = require("fs");
const Book = require("./models/book.model");
const { log, error } = require("console");
const express = require("express");
const { findByIdAndDelete } = require("./models/employee.model");
// const { find, findByIdAndUpdate } = require("./models/book.model");
const app = express();
app.use(express.json());

initializeDB();

// const jsonData = fs.readFileSync("books.json", "utf-8");
// const booksData = JSON.parse(jsonData);

// const filePath = path.join(process.cwd(), 'books.json');
// const fileData = fs.readFileSync(filePath, 'utf8');
// function seedData(){
//     try{
//         for(const book of booksData){
//             const newBooks = new Book({
//                 title: book.title,
//                 author: book.author,
//                 publishedYear: book.publishedYear,
//                 genre: book.genre,
//                 language: book.language,
//                 country: book.country,
//                 rating: book.rating,
//                 summary: book.summary,
//                 coverImageUrl: book.coverImageUrl
//             });
//             console.log(newBooks.title);
//             newBooks.save()
//         }
//     }catch(error){
//         log("Error seeding the data..", error);
//     }
// }

// seedData();
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}.`);
});

async function createBook(newBook) {
  try {
    const book = new Book(newBook);
    const savedBook = await book.save();
    return savedBook;
  } catch (err) {
    throw err;
  }
}

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res.status(201).json({
      message: "Book added successfully.",
      book: savedBook,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to add books - ${error}` });
  }
});

async function readAllBooks() {
  try {
    const allBooks = await Book.find();
    return allBooks;
  } catch (err) {
    throw err;
  }
}

app.get("/books", async (req, res) => {
  try {
    const allBooks = await readAllBooks();
    if (allBooks) {
      res.status(200).json(allBooks);
    } else {
      res.status(400).json({ error: `Error reading the restaurants` });
    }
  } catch (error) {
    res.status(400).json({ error: `Failed!! - ${error}` });
  }
});

async function readByTitle(title) {
  try {
    const bookData = await Book.findOne({ title });
    return bookData;
  } catch (error) {
    throw error;
  }
}

app.get("/books/:bookName", async (req, res) => {
  try {
    const data = await readByTitle(req.params.bookName);
    if (data) {
      res.json(data);
    } else {
      res.status(400).json({ error: "error in reading!!" });
    }
  } catch (error) {
    res.status(400).json({ error: `Failed!! - ${error}` });
  }
});

async function readAllByAuthor(author) {
  try {
    const bookData = await Book.find({ author });
    return bookData;
  } catch (error) {
    throw error;
  }
}

app.get("/books/author/:author", async (req, res) => {
  try {
    const data = await readAllByAuthor(req.params.author);
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(400).json({ error: "error in reading!!" });
    }
  } catch (error) {
    res.status(400).json({ error: `Failed!! - ${error}` });
  }
});

async function readAllByGenre(genre) {
  try {
    const bookData = await Book.find({ genre });
    return bookData;
  } catch (error) {
    throw error;
  }
}

app.get("/books/genre/:genre", async (req, res) => {
  try {
    const data = await readAllByGenre(req.params.genre);
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(400).json({ error: "error in reading!!" });
    }
  } catch (error) {
    res.status(400).json({ error: `Failed!! - ${error}` });
  }
});

async function readAllByYear(publishedYear) {
  try {
    const bookData = await Book.find({ publishedYear });
    return bookData;
  } catch (error) {
    throw error;
  }
}

app.get("/books/year/:year", async (req, res) => {
  try {
    const data = await readAllByYear(req.params.year);
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(400).json({ error: "error in reading!!" });
    }
  } catch (error) {
    res.status(400).json({ error: `Failed!! - ${error}` });
  }
});

async function updateUsingId(id, dataToUpdate) {
  try {
    const updatedData = await Book.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    return updatedData;
  } catch (error) {
    console.log("Error in updating Book data..", error);
    throw error;
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateUsingId(req.params.bookId, req.body);
    if (updatedBook) {
      res.status(201).json({
        message: "Book added successfully.",
        book: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to add books - ${error}` });
  }
});

async function updateByTitle(title, dataToUpdate) {
  try {
    const updatedData = await Book.findOneAndUpdate({title}, dataToUpdate, {
      new: true,
    });
    return updatedData;
  } catch (error) {
    console.log("Error in updating Book data..", error);
    throw error;
  }
}

app.post("/books/title/:title", async (req, res) => {
  try {
    const updatedBook = await updateByTitle(req.params.title, req.body);
    if (updatedBook) {
      res.status(201).json({
        message: "Book added successfully.",
        book: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to add books - ${error}` });
  }
});

async function deleteById(id) {
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    return deletedBook;
  } catch (error) {
    throw error;
  }
}

app.delete("/books/:id", async (req,res)=>{
  try {
    const data = await deleteById(req.params.id);
    if (data) {
            res.status(200).json({ message: "Book deleted successfully.", Book: data });
        } else {
            res.status(404).json({ error: "Book not found." });
        }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete restaurant." });
  }
})