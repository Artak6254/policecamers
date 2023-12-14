const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.json()); // Use body-parser middleware
app.use(cors());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    acquireTimeout: 60000
});
pool.getConnection((err,conn) => {
    if(err) console.log(err);
    console.log("connected sucess");
})
app.get("/header", (req, res) => {
    const sql = "SELECT * FROM header";
    pool.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.get("/camera", (req, res) => {
    const sql = "SELECT * FROM camera";
    pool.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.post("/addCamera", (req, res) => {
    const { title, image, link } = req.body;
    const sql = "INSERT INTO camera (title, image, link) VALUES (?, ?, ?)";

    pool.query(sql, [title, image, link], (err, result) => {
        if (err) {
            console.error("Database error:", err);
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

    pool.query(sql, [title, image, link, cameraId], (err, result) => {
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
    pool.query(sql, cameraId, (err, result) => {
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
    const sql = "SELECT * FROM footer";
    pool.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Error starting the server: ${err.message}`);
    } else {
        console.log(`Server listening on port http://localhost:${PORT}`);
    }
});