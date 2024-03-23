// Responsible for /posts/* routes

const express = require('express');
const router = express.Router();

const { getPosts, getPostsByUser, getPostWithId, getPostImageWithId, deletePostWithId, addPostMulterFields, addPost, addPostImage } = require('../controllers/post.js');

// Database query to get all posts
router.get('/', getPosts);

// Logic to get posts from user with ID
router.get('/user/:userId', getPostsByUser);

// TODO: we should merge these two queries into a single request
// SQL Database query to get post (tile, date posted, poster, etc.) with specific ID
router.get('/:postId', getPostWithId);

// S3 Database query to get image with specific ID
router.get('/image/:postId', getPostImageWithId);

// Logic to delete post with id=postId
// 1. Check user has delete permissions
// 2. Delete from database and s3
router.delete('/:postId', deletePostWithId);

// Create a new post
router.post('/', addPostMulterFields, addPost);

// Create a new post
// TODO: change this to post text (SQL) data as well
router.post('/postImage', addPostImage);

// Export the router
module.exports = router;
