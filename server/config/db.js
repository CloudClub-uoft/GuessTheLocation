// // Establish MySQL database connection

// import mysql from "mysql";

// export const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "GuessTheLocation"
// })
const mysql = require ('mysql')
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:'guessthelocation'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;