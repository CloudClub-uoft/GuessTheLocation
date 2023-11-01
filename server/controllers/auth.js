const db = require('../config/db');
const s3Client = require("../config/s3");

var loggedInCookies = {};

const register = (req, res) => {
    const username = req.params.username;
    const firstname = req.params.firstname;
    const lastname = req.params.lastname;
    const email = req.params.email;
    const password = req.params.password;
    const time = Date.now() / 1000;  // unix seconds

    // https://github.com/mysqljs/mysql#introduction
    db.query(`SELECT * WHERE "username"=${username} OR "email"=${email};`, function (error, results, fields) {
        if (error) throw error;
        if(results.length != 0) {
            res.send("failed");
        }
    });

    db.query(`INSERT INTO userProfile("username","firstname","lastname","password","email","time") VALUES('${username}','${firstname}','${lastname}','${password}','${email}','${time}')`);
    res.send("success")
}

const login = (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    db.query(`SELECT * WHERE "username"=${username} AND "password"=${password};`, function (error, results, fields) {
        if (error) throw error;
        if(results.length == 1) {
            cookie = Math.floor(Math.random()*(10**10));
            loggedInCookies[cookie] = username;
            res.cookie("log_in_session", cookie)
            res.send(`success, username is ${username}`);
        } else {
            res.send(`failed`);
        }
    });

    res.send("login");
}

const logout = (req, res) => {
    delete loggedInCookies[req.cookies.log_in_session];
    res.send("logout");
}

module.exports = {
    register,
    login,
    logout,
}

