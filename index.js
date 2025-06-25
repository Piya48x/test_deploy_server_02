import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Get all messages
app.get('/api/messages', (req, res) => {
  const sql = "SELECT * FROM guestbook ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Create a message
app.post('/api/messages', (req, res) => {
  const { name, message } = req.body;
  const sql = "INSERT INTO guestbook (name, message) VALUES (?, ?)";
  db.query(sql, [name, message], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, message });
  });
});

// ✅ Update a message
app.put('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;
  const sql = "UPDATE guestbook SET name = ?, message = ? WHERE id = ?";
  db.query(sql, [name, message, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, name, message });
  });
});

// ✅ Delete a message
app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM guestbook WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

console.log("🔍 ENV Check:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME
});


// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
