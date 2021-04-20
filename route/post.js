const postController = require('../controller/posts')
const jsonController = require('../controller/api')
const express = require('express');
const router = express.Router();

router.post('/app/users/:id/post', postController.userPost);
router.delete('/app/users/:id/posts/:id', postController.deletePost)
router.post('/app/users/:id/posts/:id',postController.comment)
router.patch('/app/users/:id/posts/:id',postController.updateLike)
router.get('/app/users/:id/posts/:id',postController.getComments)
router.patch('/app/users/:id/posts/:id/comment/:id', postController.saveLike) 
 
// api route for users posts

// gets api of all posts
router.get('/api/posts', jsonController.getAllPosts);

// gets api of a single post by its id 
router.get('/api/:id', jsonController.getPost);

// delete a post by id  api
router.delete('/api/:id', jsonController.deletePostAPI);

module.exports = router  