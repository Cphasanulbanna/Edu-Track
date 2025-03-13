import Book from "../models/book.model.js";

export const addBook = async (req, res) => {
  const { name, author } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Book name is required" });
    }

    const book = await Book.findOne({ name: name });
    if (book) {
      return res
        .status(400)
        .json({ message: "A book already exists with this name" });
    }

    const newBook = new Book({
      name,
      author,
    });

    await newBook.save();
    return res
      .status(201)
      .json({ message: "Book added to library", book: newBook });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    if (!books.length) {
      return res.status(404).json({ message: "No books found" });
    }

    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrowBook = async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.query;
  try {
    if (!bookId || !userId) {
      return res
        .status(400)
        .json({ message: "Book Dd  and Borrower Id is required" });
    }
    const book = await Book.findById(bookId).populate({
      path: "borrower",
      select: "profile",
      populate: {
        path: "profile",
        select: "first_name last_name",
      },
    });


    if (!book) {
      return res.status(404).json({ message: "No book found" });
    }
    if (book.borrowed) {
      return res
        .status(400)
        .json({
          message: `Book is already borrowed by ${book.borrower?.profile?.first_name} ${book.borrower?.profile?.last_name}`,
        });
    }
    await Book.findByIdAndUpdate(bookId, { borrowed: true, borrower: userId });
    return res.status(200).json({ message: "Book borrowed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
