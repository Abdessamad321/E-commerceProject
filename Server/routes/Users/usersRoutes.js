const express = require('express');
const router = express.Router();
const userControllers = require('../../Controllers/userController')
const adminAuthorization = require('../../middlewares/Auth')
const AMauthorization = require('../../middlewares/AuthAM')

router.post ('/users', adminAuthorization, userControllers.createUser)

router.post ('/users/login', userControllers.loginUser)

router.get('/users', AMauthorization, userControllers.searchForUsers)

router.get('/users/:id', userControllers.getUsersId)

router.put('/users/:id', userControllers.updateUser)

router.delete('/users/:id', adminAuthorization, userControllers.deleteUser)

module.exports = router