const express = require('express');
const router = express.Router();
const userControllers = require('../../Controllers/userController')
const authorization = require('../../middlewares/Auth')

router.post ('/', userControllers.createUser)

router.post ('/login', userControllers.loginUser)

router.get('/', userControllers.searchForUsers)

router.get('/:id', userControllers.getUsersId)

router.put('/:id', userControllers.updateUser)

router.delete('/:id', userControllers.deleteUser)

module.exports = router