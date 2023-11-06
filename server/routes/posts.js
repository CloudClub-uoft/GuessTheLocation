// Responsible for /posts/* routes

const express = require('express');
const router = express.Router();

const { getPosts, getPostsByUser, getPostWithId, deletePostWithId, addPostMulterFields, addPost } = require('../controllers/post.js');

// Database query to get all posts
router.get('/', getPosts);

// Logic to get posts from user with ID
router.get('/user/:userId', getPostsByUser);

// Database query to get post with specific ID
router.get('/:postId', getPostWithId);

// Logic to delete post with id=postId
// 1. Check user has delete permissions
// 2. Delete from database and s3
router.delete('/:postId', deletePostWithId);

// Create a new post
router.post('/', addPostMulterFields, addPost);

// Export the router
module.exports = router;
