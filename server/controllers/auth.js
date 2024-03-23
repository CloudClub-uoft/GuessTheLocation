const db = require('../config/db');
const s3Client = require("../config/s3setup");

const register = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    
    // https://github.com/mysqljs/mysql#introduction
    db.query(`SELECT * FROM GuessTheLocation.user_profile WHERE username='${username}' OR email='${email}';`, function (error, results, fields) {
        if (error) {
            res.status(400);
            res.end("failure");
            return;
        }
        if(results.length != 0) {  // due to javascript 0 shenanigans, 1 !== 0 behaves weirdly? using != instead
            res.status(400);
            res.end("failure");
            console.log('already registered');
            return;
        }

        // sequential
        db.query(`INSERT INTO GuessTheLocation.user_profile (username,firstname,lastname,password,email,emailVerified) VALUES ('${username}','${firstname}','${lastname}','${password}','${email}',false);`, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400);
                res.end("failure");
                return;
            }

            res.end("success");
            console.log('Registration successful!')
        });

    });
}

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // need to hash the password
    db.query(`SELECT * FROM GuessTheLocation.user_profile WHERE username='${username}' AND password='${password}';`, function (error, results, fields) {
        if (error) {
            console.log("here???");
            return res.status(400).json({ error: "Error" });
        }
        if(results.length != 0) {
            console.log("success, starting session now");
            // create cookie here
            const sesh = req.session;
            console.log(sesh);
            sesh.username = username;
            sesh.password = password;

            // login successful
            return res.status(200).json({ message: "Login Successful!" });;
            
        } else {
            console.log("Password is wrong, or the account hasn't been registered!")
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