const express = require('express');
const router = express.Router();
const userControllers = require('../../Controllers/userController')
const adminAuthorization = require('../../middlewares/Auth')
const AMauthorization = require('../../middlewares/AuthAM')

router.post ('/', adminAuthorization, userControllers.createUser)

router.post ('/login', userControllers.loginUser)

router.get('/', AMauthorization, userControllers.searchForUsers)

router.get('/:id', AMauthorization, userControllers.getUsersId)

router.put('/:id', adminAuthorization, userControllers.updateUser)

router.delete('/:id', adminAuthorization, userControllers.deleteUser)

module.exports = router