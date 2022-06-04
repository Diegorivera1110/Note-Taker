const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

const notesList = require("./db/db.json");

app.use(express.static("public"));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());

app.get("/api/notes", (req, res) => {
  res.json(notesGroup.slice(1));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function generateNote(body, noteArray) {
  const newNote = body;
  if (!Array.isArray(noteArray)) noteArray = [];

  if (noteArray.length === 0) noteArray.push(0);

  body.id = noteArray[0];
  noteArray[0]++;

  noteArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(noteArray, null, 2)
  );
  return newNote;
}

app.post("/api/notes", (req, res) => {
  const newNote = generateNote(req.body, notesList);
  res.json(newNote);
});

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
