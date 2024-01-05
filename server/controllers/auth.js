const db = require('../config/db');
const s3Client = require("../config/s3");

const register = (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const time = Date.now() / 1000;  // unix seconds
    // this may be unnecessary
    
    // https://github.com/mysqljs/mysql#introduction
    db.query(`SELECT * FROM user_profile WHERE username='${username}' OR email='${email}';`, function (error, results, fields) {
        if (error) {
            res.status(400);
	    res.end("failure");
            return;
        }
        if(results.length != 0) {  // due to javascript 0 shenanigans, 1 !== 0 behaves weirdly? using != instead
            res.status(400);
            res.end("failure");
            return;
        }

        // sequential
        // userID and time are automatic I think
        db.query(`INSERT INTO user_profile (username,firstname,lastname,password,email,emailVerified) VALUES ('${username}','${firstname}','${lastname}','${password}','${email}',false);`, function (error, results, fields) {
            if (error) {
                console.log(error);  // should I log all command failures? they shouldn't happen
                res.status(400);
                res.end("failure");
                return;
            }

            res.end("success");
        });

    });
}

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // TODO: need to hash the password
    db.query(`SELECT * FROM guessthelocation.user_profile WHERE username='${username}' AND password='${password}';`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        }
        if(results.length === 1) {
            const userid = results[0].userID;
            // https://www.npmjs.com/package/express-session
            req.session.regenerate(function (err) {
                if (err) {
                    return res.status(500).json({ error: "Internal Server Error." });
                }
                req.session.user = userID;
                req.session.save(function (err) {
                    if (err) {
                        return res.status(500).json({ error: "Internal Server Error." });
                    }
                    return res.redirect('/');
                });
            });
        } else {
            return res.status(400).json({ error: "Password Incorrect or multiple user entries." });
        }
    });
}

const logout = (req, res) => {
    req.session.user = null;
    req.session.save(function (err) {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error." });
        }

        req.session.regenerate(function (err) {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error." });
            }
            res.redirect('/');
        })
    })
}

const loggedUser = (req, res) => {
    return res.status(200).json({userID: req.session.user});
}

module.exports = {
    loggedUser,
    register,
    login,
    logout,
}

