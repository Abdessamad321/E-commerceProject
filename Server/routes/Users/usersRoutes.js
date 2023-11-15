const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/userController')
const adminAuthorization = require('../../middlewares/Auth')
const AMauthorization = require('../../middlewares/AuthAM')

router.post ('/', adminAuthorization, userControllers.createUser)

router.post ('/users/login', userControllers.loginUser)

router.get('/', userControllers.searchForUsers)

router.get('/:id', AMauthorization, userControllers.getUsersId)

router.put('/:id', adminAuthorization, userControllers.updateUser)

router.delete('/:id', adminAuthorization, userControllers.deleteUser)

router.post("/refresh/token", userControllers.refreshTokens)

module.exports = router