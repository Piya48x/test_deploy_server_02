import dotenv from 'dotenv';
dotenv.config(); // ✅ อยู่ก่อน import db.js


import mysql from 'mysql2';


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


db.connect(err => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
  } else {
    console.log("✅ MySQL Connected!");
  }
});

export default db;
