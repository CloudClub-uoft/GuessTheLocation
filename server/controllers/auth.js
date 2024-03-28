const db = require('../config/db');
const s3Client = require("../config/s3");
const bcrypt = require("bcrypt");

const register = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    // https://github.com/mysqljs/mysql#introduction
    db.query(`SELECT * FROM GuessTheLocation.user_profile WHERE username='${username}' OR email='${email}';`, function (error, results, fields) {
        if (error) {
            res.status(400);
            res.end("failure");
            return;
        }
        if(results.length != 0) {  // due to javascript 0 shenanigans, 1 !== 0 behaves weirdly? using != instead
            res.status(403);
            res.end("failure");
            // Error: Already registered.
            return;
        }
        else{
            // if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g)) {
                bcrypt.hash(password, Number.parseInt(process.env.ENC_ROUNDS), (err2, hash) => {
                    if (err2) { console.log(err2); return res.status(500).json({ error: "Internal Server Error 500" }); }
                    // sequential
                    db.query(`INSERT INTO GuessTheLocation.user_profile (username,firstname,lastname,password,email,emailVerified) VALUES ('${username}','FIRST','LAST','${hash}','${email}',false);`, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                            res.status(400);
                            res.end("failure");
                            return;
                        }

                        res.end("success");
                        console.log('Registration successful!')
                    });

                })
            }
        // }

        
    });
}

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // need to hash the password
    db.query(`SELECT * FROM GuessTheLocation.user_profile WHERE username='${username}';`, function (error, results, fields) {
        if (error) {
            return res.status(400).json({ error: "Error" });
        }
        if(results.length != 0) {
            bcrypt.compare(password, results[0].password, (err2, result2) => {
                if (err2) return res.status(500).json({ error: "Internal Server Error 500" });
                if (result2){
                    // create cookie here
                    const sesh = req.session;
                    console.log(sesh);
                    sesh.username = username;
                    sesh.password = password;

                    // login successful
                    return res.status(200).json({ message: "Login Successful!" });;
                }
                return res.status(401).json({ error: "Password incorrect." });
            })
        } else {
            return res.status(400).json({ error: "Error" });
        }
    });
}

const logout = (req, res) => {
    // remove cookie here
    res.end("logout");
}

module.exports = {
    register,
    login,
    logout,
}