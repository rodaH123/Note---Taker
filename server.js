const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/api/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    }
    let parseFs = JSON.parse(fs.readFileSync('db/db.json'))
    parseFs.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(parseFs))
    res.json(parseFs)
   });

app.get('/api/notes', (req, res) => {
 let parseFs = JSON.parse(fs.readFileSync('db/db.json'))
 res.json(parseFs)
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);