const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "Teboho",
    password: "Hobote123@", // Replace with your MySQL root password
    database: "demo", // Replace with your database name
    port: "3306"
    });

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to the database!");
    }
});

// Routes
/*app.get("/api/uses", (req, res) => {
    db.query("SELECT * FROM uses", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
        } else {
            res.json(results);
        }
    });
});*/
// Add a new employee
app.post("/api/uses", (req, res) => {
    const { EmployeeID, name, email } = req.body;

    if (!EmployeeID || !name || !email) {
        return res.status(400).send("All fields are required");
    }

    const sql = "INSERT INTO uses (EmployeeID, name, email) VALUES (?, ?, ?)";
    db.query(sql, [EmployeeID, name, email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to add employee");
        } else {
            res.status(201).send("Employee added successfully");
        }
    });
});
// Start server
const PORT = 5000; // Hardcoded port number
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});