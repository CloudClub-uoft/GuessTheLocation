// Establish MySQL database connection
const mysql = require("mysql");

<<<<<<< HEAD
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
=======
const db = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    password: process.env.SQLPASS,
    database: "GuessTheLocation"
})
>>>>>>> ec42b5a (add un-debugged database queries for controllers)

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;
