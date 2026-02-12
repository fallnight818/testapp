const mysql = require('mysql2');
require('dotenv').config();

// Configuration matches your config/db.js, but without selecting the database yet
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL server.');

    // 1. Create the database
    connection.query('CREATE DATABASE IF NOT EXISTS my_app', (err) => {
        if (err) {
            console.error('Error creating database:', err.message);
            connection.end();
            return;
        }
        console.log('Database "my_app" created or checked.');

        // 2. Select the database
        connection.query('USE my_app', (err) => {
            if (err) return connection.end();

            // 3. Create the table
            const sql = `
                CREATE TABLE IF NOT EXISTS words (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    content TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            connection.query(sql, (err) => {
                if (err) console.error('Error creating table:', err.message);
                else console.log('Table "words" created or checked.');
                connection.end();
            });
        });
    });
});