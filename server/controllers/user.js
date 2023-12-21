const db = require('../config/db');
const s3Client = require("../config/s3");

const getUsers = (req, res) => {
    db.query(`SELECT * FROM user_profile;`, function (error, results, fields) {
        if (error) {
		console.log(error);
		res.end("failure");
	} else {
		res.send(JSON.stringify(results[0]));
	}
    });
}

const getUserWithId = (req, res) => {
    db.query(`SELECT * FROM user_profile WHERE userID = ${req.params.postId};`, function (error, results, fields) {
        if (error) {
          res.send("failure");
        }
        res.send(JSON.stringify(results[0]));
    });
}

const deleteUserWithId = (req, res) => {
    db.query(`DELETE FROM user_profile WHERE userID = ${req.params.postId};`, function (error, results, fields) {
        if (error) {
          res.send("failure");
        }
        res.send("success");
    });
}

module.exports = {
    getUsers,
    getUserWithId,
    deleteUserWithId,
}
