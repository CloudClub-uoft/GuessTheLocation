// Establish MySQL database connection
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    password: process.env.SQLPASS,
    database: "GuessTheLocation"
})

db.connect();

process.on('exit', db.end);