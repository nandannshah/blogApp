const express = require('express');
const router = express.Router();

//import controller
const {createComment} = require('../controllers/commentController');
const {createPost, getAllPost} = require('../controllers/postController');
const {likePost, unlikePost} = require('../controllers/likeController');


router.post('/comments/create', createComment);
router.post('/posts/create',createPost);
router.get('/posts', getAllPost);
router.post('/likes/like', likePost);
router.post('/likes/unlike', unlikePost);


module.exports = router;