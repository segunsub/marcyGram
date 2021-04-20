const userController = require('../controller/users')
const jsonController = require('../controller/api')
const postRoute = require('./post')
const express = require('express');
const router = express.Router();

router.use('/', userController.middleware)
router.get('/', userController.home)
router.post('/login', userController.userLogin)
router.use('/login', userController.loginMiddleWare) 
router.get('/login', userController.login)
router.get('/signup', userController.signup)
router.post('/signup', userController.userSignUp)
router.get('/app/users/:id', userController.userprofile)
router.get('/app/users/:id/edit', userController.editProfile)
router.get('/app/users/:id/follow', userController.follow)
router.post('/app/users/:id/logout', userController.logout)
router.patch('/app/users/:id', userController.update)
router.post('/app/users/:id', userController.updatepfp)
router.delete('/app/users/:id', userController.deleteUser)
router.post('/app/users/:id/follow/:id', userController.followUser)
router.delete('/app/users/:id/posts/:id', postRoute)
router.post('/app/users/:id/posts/:id',postRoute)
router.get('/app/users/:id/posts/:id',postRoute)
router.patch('/app/users/:id/posts/:id',postRoute)
router.post('/app/users/:id/post', postRoute)  
router.patch('/app/users/:id/posts/:id/comment/:id', postRoute)  


//api routes

// gets all users 
router.get('/api/users', jsonController.getUsers);

//gets single users
router.get('/api/users/:id', jsonController.getSingleUser);

// gets postd by specfic user
router.get('/api/posts/:id', jsonController.seePostsByUser);

// sign up user
router.get('/api/signup', jsonController.signUpAPI);

// login  user
router.get('/api/login', jsonController.loginAPI);

module.exports = router  