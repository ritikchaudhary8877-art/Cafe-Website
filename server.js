const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8448703718",
    database: "brew_bite_cafe"
});

// Connect MySQL
db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("MySQL Connected Successfully!");
    }
});

// Save Reservation
app.post("/reservation", (req, res) => {

    const { name, email, phone, date, message } = req.body;

    const sql = `
        INSERT INTO reservations
        (name, email, phone, reservation_date, message)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, phone, date, message],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Error saving reservation"
                });
            }

            res.json({
                message: "Reservation saved successfully!"
            });
        }
    );
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});