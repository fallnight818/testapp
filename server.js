require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to save a word
app.post('/save-word', (req, res) => {
    const word = req.body.word;
    const sql = "INSERT INTO words (content) VALUES (?)";
    
    db.query(sql, [word], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Word saved!', id: result.insertId });
    });
});

// Route to get all words
app.get('/get-words', (req, res) => {
    const sql = "SELECT * FROM words ORDER BY created_at ASC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;