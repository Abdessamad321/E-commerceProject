const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/userController')
const adminAuthorization = require('../../middlewares/Auth')
const AMauthorization = require('../../middlewares/AuthAM')

router.post ('/users',adminAuthorization, userControllers.createUser)

router.post ('/users/login', userControllers.loginUser)

router.get('/users', AMauthorization, userControllers.searchForUsers)

router.get('/users:id', AMauthorization, userControllers.getUsersId)

router.put('/users:id', adminAuthorization, userControllers.updateUser)

router.delete('/users/:id', userControllers.deleteUser)

router.post('/refresh/token', userControllers.refreshTokens)

router.get('/allUsers', userControllers.getAllUsers)

module.exports = router