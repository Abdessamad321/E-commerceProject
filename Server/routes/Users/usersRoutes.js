const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/userController')
const adminAuthorization = require('../../middlewares/Auth')
const AMauthorization = require('../../middlewares/AuthAM')


router.post ('/users', userControllers.createUser)

router.post ('/users/login', userControllers.loginUser)

router.get('/use', userControllers.searchForUsers)

router.get('/users/sortedBy', userControllers.sortUsers)

router.get('/users/:id', userControllers.getUsersId)

router.put('/users/:id', userControllers.updateUser)

router.delete('/users/:id', userControllers.deleteUser)

router.post('/refresh/token', userControllers.refreshTokens)

router.get('/allUsers', userControllers.getAllUsers)


module.exports = router