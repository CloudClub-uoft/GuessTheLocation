const db = require('../config/db');
const s3Client = require("../config/s3");
const multer  = require('multer');

const getPosts = (req, res) => {
    db.query(`SELECT * FROM post;`, function (error, results, fields) {
        if (error) {
            res.send("failure");
        }
        res.send(JSON.stringify(results));
    });
}

const getPostsByUser = (req, res) => {
    db.query(`SELECT * FROM post WHERE userID = ${req.params.userId};`, function (error, results, fields) {
        if (error) {
            res.send("failure");
        }
        res.send(JSON.stringify(results));
    });
}


const getPostWithId = (req, res) => {
    db.query(`SELECT * FROM post WHERE postID = ${req.params.postId};`, function (error, results, fields) {
        if (error) {
            res.send("failure");
        }
        res.send(JSON.stringify(results[0]));
    });
}

const deletePostWithId = (req, res) => {
    db.query(`DELETE FROM post WHERE postID = ${req.params.postId};`, function (error, results, fields) {
        if (error) {
            res.send("failure");
        }
        res.send("success");
    });
}

const addPost = (req, res) => {
    const username = req.params.username;
    const locationLat = req.params.locationLat;
    const locationLong = req.params.locationLong;
    
    db.query(`SELECT userId FROM userProfile WHERE "username"=${username};`, function (error, results, fields) {
        if (error) {
            res.send("failure");
        }
        const userID = results[0].userID;
        // postID and time should be automatic I think?
        db.query(`INSERT INTO post("userID","locationLat","locationLong") VALUES('${userID}','${locationLat}','${locationLong}');`, function (error, results, fields) {
            if (error) {
                res.send("failure");
            }
            res.send("success");
        });
    });
    
}

module.exports = {
    getPosts,
    getPostsByUser,
    getPostWithId,
    deletePostWithId,
    addPostMulterFields,
    addPost,
}
