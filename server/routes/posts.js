// Responsible for /posts/* routes

const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const { getPosts, getPostsByUser, getPostWithId, getPostImageWithId, deletePostWithId, addPostMulterFields, addPost, addPostImage } = require('../controllers/post.js');
=======
const { getAllPosts, getPostsByUser, getPostWithId, deletePostWithId, addPostMulterFields, addPost, getRecentPosts } = require('../controllers/post.js');
>>>>>>> df4e5e3 (Recent n posts route set up)

// Database query to get all posts
//Gotta use /posts/postId
router.get('/', getAllPosts);

// Get n most recent posts
// TODO: parameterize with /recent/:n
router.get('/recent/:n', getRecentPosts);

// Logic to get posts from user with ID
router.get('/user/:userId', getPostsByUser);

<<<<<<< HEAD
// TODO: we should merge these two queries into a single request
// SQL Database query to get post (tile, date posted, poster, etc.) with specific ID
=======
// Database query to get post with specific ID

>>>>>>> df4e5e3 (Recent n posts route set up)
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