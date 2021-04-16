const postController = require('../controller/posts')
const jsonController = require('../controller/api')
const express = require('express');
const router = express.Router();

router.post('/app/users/:id/post', postController.userPost);
router.delete('/app/users/:id/posts/:id', postController.deletePost)

 
// api route for users posts

// gets api of all posts
router.get('/api/post/:id', jsonController.getUsersPosts);


module.exports = router  