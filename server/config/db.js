// Establish MySQL database connection
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "GuessTheLocation"
})

db.connect();

process.on('exit', db.end);