const db = require('../config/db');
const s3Client = require("../config/s3");

const getPosts = (req, res) => {
  res.send('List of posts');
}

const getPostsByUser = (req, res) => {
    const userId = req.params.userId;
    res.send(`Posts by user ${userId}`);
}


const getPostWithId = (req, res) => {
  const postId = req.params.postId;
  res.send(`Details of post ${postId}`);
}

const deletePostWithId = (req, res) => {
    const postId = req.params.postId;
    res.send(`Delete post ${postId}`);
}

const addPost = (req, res) => {
    res.json("Add a post");
}

module.exports = {
    getPosts,
    getPostsByUser,
    getPostWithId,
    deletePostWithId,
    addPost,
}