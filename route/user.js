const userController = require('../controller/users')
const express = require('express');
const router = express.Router();

router.use('/', userController.middleware)
router.get('/', userController.home)
router.get('/login', userController.login)






module.exports = router  