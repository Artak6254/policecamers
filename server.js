const express = require("express");
const cors = require("cors");
const mysql = require("mysql");


const bodyParser = require("body-parser"); // Import body-parser

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Use body-parser middleware

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cameraregions",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
        return;
    }
    console.log("Connected to MySQL database");
});
app.get("/header", (req, res) => {
    const sql = "SELECT * FROM header";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

// GET endpoint to retrieve data
app.get("/camera", (req, res) => {
    const sql = "SELECT * FROM camera";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

// POST endpoint to insert data
app.post("/addCamera", (req, res) => {
    const { title, image, link } = req.body;
    const sql = "INSERT INTO camera (title, image, link) VALUES (?, ?, ?)";

    db.query(sql, [title, image, link], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            // Check for duplicate entry error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "Duplicate entry. Please provide a unique title." });
            }
            return res.status(500).json({ error: err.message });
        }
        console.log("Record inserted successfully");
        return res.json({ success: true });
    });
});

app.put("/updateCamera/:id", (req, res) => {
    const cameraId = req.params.id;
    const { title, image, link } = req.body;

    const sql = "UPDATE camera SET title = ?, image = ?, link = ? WHERE id = ?";

    db.query(sql, [title, image, link, cameraId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Camera not found" });
        }

        console.log("Record updated successfully");
        return res.json({ success: true });
    });
});

app.delete("/deleteCamera/:id", (req, res) => {
    const cameraId = req.params.id;
    const sql = "DELETE FROM camera WHERE id = ?";
    db.query(sql, cameraId, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Camera not found" });
        }

        console.log("Record deleted successfully");
        return res.json({ success: true });
    });
});

app.get("/footer", (req, res) => {
    const sql = "SELECT * FROM header";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});
const PORT =  8083;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});




