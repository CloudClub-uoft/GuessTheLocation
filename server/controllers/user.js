const db = require('../config/db');
const s3Client = require("../config/s3");

const getUsers = (req, res) => {
    db.query(`SELECT * FROM user_profile;`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
	} else {
            res.status(200).json(results[0]);
	}
    });
}

const getUserWithId = (req, res) => {
    db.query(`SELECT * FROM user_profile WHERE userID = ${req.params.userId};`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        } else if (results.length == 0) {
            return res.status(500).json({ error: "Internal Server Error." });
        } else {
            res.status(200).json(results[0]);
        }
        
    });
}

const deleteUserWithId = (req, res) => {
    if (req.session.user != req.params.userId) {
        return res.status(401).json( {error: "Unauthorized to delete user"} );
    }
    db.query(`DELETE FROM user_profile WHERE userID = ${req.params.userId};`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        } else {
            return res.status(200).json({ message: "Success!" });
        }
    });
}

module.exports = {
    getUsers,
    getUserWithId,
    deleteUserWithId,
}
