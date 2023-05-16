const { connectToDB, getDB } = require("./db1");
const { ObjectId } = require("mongodb");
const express = require("express");
const PORT = 3000;
let db;
const app = express();
app.use(express.json());
const dbConnection = connectToDB((err) => {
  if (!err) {
    startListening(PORT);
    db = getDB();
  }
});

app.get("/books", (req, res) => {
  let books = [];
  const page = req.query.p || 0;
  const booksPerPage = 3;
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  console.log("here");
});

app.get("/books/:id", (req, res) => {
  let books = [];
  db.collection("books")
    .find({ _id: ObjectId(req.params.id) })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => res.status(500).json({ error: "Could not find id" }));
});

app.post("/books", (req, res) => {
  let desc = req.body;
  db.collection("books")
    .insertOne(desc)
    .then((result) => res.status(201).json(result))
    .catch((err) =>
      res.status(500).json({ error: "could not create a new document" })
    );
});

app.delete("/books/:id", (req, res) => {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    db.collection("books")
      .deleteOne({ _id: ObjectId(id) })
      .then((result) => res.status(200).json(result))
      .catch((err) =>
        res.status(500).json({ error: "could not delete this id" })
      );
  } else {
    res.status(500).json({ error: "Coult not complete request" });
  }
});

app.patch("/books/:id", (req, res) => {
  let id = req.params.id;
  const updates = req.body;
  if (ObjectId.isValid(id)) {
    db.collection("books")
      .updateOne({ _id: ObjectId(id) }, { $set: updates })
      .then((result) => res.status(200).json(result))
      .catch((err) =>
        res.status(500).json({ error: "could not update this id" })
      );
  } else {
    res.status(500).json({ error: "Coult not complete request" });
  }
});

const startListening = (PORT) => {
  return app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });
};
