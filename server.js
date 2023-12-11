const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use environmental variables for sensitive information
const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "cameraregions",
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL database");
    connection.release();
});

app.get("/header", async (req, res) => {
    try {
        const sql = "SELECT * FROM header";
        const data = await db.query(sql);
        return res.json(data);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
    }
});

app.get("/camera", async (req, res) => {
    try {
        const sql = "SELECT * FROM camera";
        const data = await db.query(sql);
        return res.json(data);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
    }
});

app.post("/addCamera", async (req, res) => {
    try {
        const { title, image, link } = req.body;
        const sql = "INSERT INTO camera (title, image, link) VALUES (?, ?, ?)";
        const result = await db.query(sql, [title, image, link]);
        console.log("Record inserted successfully");
        return res.json({ success: true });
    } catch (err) {
        console.error("Database error:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Duplicate entry. Please provide a unique title." });
        }
        return res.status(500).json({ error: err.message });
    }
});

// ... (similar updates for updateCamera and deleteCamera routes)

app.get("/footer", async (req, res) => {
    try {
        const sql = "SELECT * FROM footer";
        const data = await db.query(sql);
        return res.json(data);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
