const db = require('../config/db');
const s3Client = require("../config/s3");
const multer  = require('multer');

const getPosts = (req, res) => {
    db.query(`SELECT * FROM post;`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        }
        return res.status(200).json(results);
    });
}

const getPostsByUser = (req, res) => {
    db.query(`SELECT * FROM post WHERE userID = ${req.params.userId};`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        }
        return res.status(200).json(results);
    });
}


const getPostWithId = (req, res) => {
    db.query(`SELECT * FROM post WHERE postID = ${req.params.postId};`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        }
        return res.status(200).json(results);
    });
}

const deletePostWithId = (req, res) => {
    db.query(`DELETE FROM post WHERE postID = ${req.params.postId};`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        }
        return res.status(200).json({ message: "success" });
    });
}

const addPost = (req, res) => {  // this only accepts multipart/form-data type as post
    const userID = req.session.user;
    if (userID === null) {
        return res.status(403).json({ error: "Only authenticated users can create posts" });
    }

    db.query(`SELECT postID FROM post ORDER BY postID DESC LIMIT 0, 1;`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        }
        const maxPostID = results[0].postID + 1;
    });

    const locationLat = req.body.locationLat;
    const locationLong = req.body.locationLong;
    const file = req.file;  // documentation on this seems to be a little hazy

    // this doesn't work concurrently
    const s3key = "imageForId"+maxPostID;  // replace with a hash of username+time uploaded+file uploaded

    // Brady's S3 Code
    var params = {
        Bucket: process.env.BUCKET_NAME,
        Key: s3key,
        Body: file.data
    }
    s3Client.upload(params, function (err,data) {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }
    
    db.query(`INSERT INTO post("userID","locationLat","locationLong") VALUES('${userID}','${locationLat}','${locationLong}');`, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error." });
        }
        // should probably redirect to the post instead
        return res.status(200).json({ message: "success" });
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
