const db = require('../config/db');
const s3Client = require("../config/s3setup");

const getUsers = (req, res) => {
    db.query(`SELECT * FROM user_profile;`, function (error, results, fields) {
        if (error) {
		console.log(error);
                res.status(400);
		res.end("failure");
	} else {
		res.send(JSON.stringify(results[0]));
	}
    });
}

const getUserWithId = (req, res) => {
    db.query(`SELECT * FROM user_profile WHERE userID = ${req.params.userId};`, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400);
            res.end("failure");
        } else if (results.length == 0) {
            res.status(400);
            res.end("failure");  // userID doesn't exist
        } else {
            res.end(JSON.stringify(results[0]));
        }
        
    });
}

const deleteUserWithId = (req, res) => {
    db.query(`DELETE FROM user_profile WHERE userID = ${req.params.userId};`, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400);
            res.end("failure");
        } else {
            res.end("success");
        }
    });
}

module.exports = {
    getUsers,
    getUserWithId,
    deleteUserWithId,
}
