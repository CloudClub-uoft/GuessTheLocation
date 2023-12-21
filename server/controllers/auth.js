const db = require('../config/db');
const s3Client = require("../config/s3");

var loggedInCookies = {};

const register = (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const time = Date.now() / 1000;  // unix seconds
    // this may be unnecessary

    // https://github.com/mysqljs/mysql#introduction
    db.query(`SELECT * FROM user_profile WHERE "username"=${username} OR "email"=${email};`, function (error, results, fields) {
        if (error) {
		res.end("failure");
		return;
        }
        if(results.length !== 0) {
            res.end("failure");
        }
    });

    console.log(`INSERT INTO user_profile (username,firstname,lastname,password,email) VALUES ("${username}","${firstname}","${lastname}","${password}","${email}");`);

    // userID and time are automatic I think
    db.query(`INSERT INTO user_profile (username,firstname,lastname,password,email) VALUES ('${username}','${firstname}','${lastname}','${password}','${email}');`, function (error, results, fields) {
        if (error) {
          res.end("failure");
        }
    });
    res.end("success")
}

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(`SELECT * FROM user_profile WHERE "username"=${username} AND "password"=${password};`, function (error, results, fields) {
        if (error) {
            res.end("failure");
        }
        if(results.length == 1) {
            cookie = Math.floor(Math.random()*(10**10));
            loggedInCookies[cookie] = username;
            res.cookie("log_in_session", cookie);
            res.redirect('/');
        } else {
            res.end(`failure`);
        }
    });

    res.end("login");
}

const logout = (req, res) => {
    delete loggedInCookies[req.cookies.log_in_session];
    res.end("logout");
}

module.exports = {
    register,
    login,
    logout,
}

