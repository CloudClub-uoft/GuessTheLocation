const db = require('../config/db');
const s3Client = require("../config/s3setup");
const { v4: uuidv4 } = require("uuid");
const multer  = require('multer');

const getPosts = (req, res) => {
    db.query(`SELECT * FROM post;`, function (error, results, fields) {
        if (error) {
            res.status(400);
            res.send("failure");
        }
        res.send(JSON.stringify(results));
    });
}

const getPostsByUser = (req, res) => {
    db.query(`SELECT * FROM post WHERE userID = ${req.params.userId};`, function (error, results, fields) {
        if (error) {
            res.status(400);
            res.send("failure");
        }
        res.send(JSON.stringify(results));
    });
}


const getPostWithId = (req, res) => {
    db.query(`SELECT * FROM post WHERE postID = ${req.params.postId};`, function (error, results, fields) {
        if (error) {
            res.status(400);
            res.send("failure");
        }
        res.send(JSON.stringify(results[0]));
    });
}

const getPostImageWithId = (req, res) => {
    let key = req.params.postId;
    // S3 GET request params
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    };
    
    s3Client.getObject(params, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Image retrieval failed!" });
      } else {
        let content = data.Body; // raw data of the image
        let fileExt = key.substring(key.lastIndexOf(".") + 1); // get file suffix
        
        // send to React front-end
        res.status(200).send({ 
          message: "Image retrieval successful!",
          image: content,
          fileExtenstion: fileExt,
        });
      }
    });
}

const deletePostWithId = (req, res) => {
    db.query(`DELETE FROM post WHERE postID = ${req.params.postId};`, function (error, results, fields) {
        if (error) {
            res.status(400);
            res.send("failure");
        }
        res.send("success");
    });
}

// https://www.npmjs.com/package/multer
const upload = multer({ dest: 'uploads/' });

// const addPostMulterFields = upload.fields({username: "username", locationLat: "locationLat", locationLong: "locationLong", file: "file"});
const addPostMulterFields = upload.single("file");  // only a single file is uploaded

const addPost = (req, res) => {  // this only accepts multipart/form-data type as post
    const username = req.body.username;
    const locationLat = req.body.locationLat;
    const locationLong = req.body.locationLong;
    const file = req.file;  // documentation on this seems to be a little hazy
    
    file.path;  // this is where the uploaded image is. it should go somewhere in the database but there's no entry for it
    
    db.query(`SELECT userId FROM user_profile WHERE "username"=${username};`, function (error, results, fields) {
        if (error) {
            res.status(400);
            res.send("failure");
        }
        const userID = results[0].userID;
        // postID and time should be automatic I think?
        db.query(`INSERT INTO post("userID","locationLat","locationLong") VALUES('${userID}','${locationLat}','${locationLong}');`, function (error, results, fields) {
            if (error) {
                res.status(400);
                res.send("failure");
            }
            res.send("success");
        });
    });
    
}

const addPostImage = (req, res) => {
    var file;
    var fileExtension;

    // React axios upload
    file = req.files.file;
    fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);

    var params = {
        Bucket: process.env.BUCKET_NAME,
        // Key: file.name,
        Key: (uuidv4() + "." + fileExtension),    // uuid key for the image
        Body: file.data,
    };
    s3Client.upload(params, function (err, data) {
        if (err) {
        res.status(500).send({ message: "Image upload failed!" });
        } else {
        res.status(200).send({ message: "Image upload successful!" });
        }
    });
}

module.exports = {
    getPosts,
    getPostsByUser,
    getPostWithId,
    getPostImageWithId,
    deletePostWithId,
    addPostMulterFields,
    addPost,
    addPostImage,
}
