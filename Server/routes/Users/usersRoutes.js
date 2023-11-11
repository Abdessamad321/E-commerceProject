const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/userController')
const adminAuthorization = require('../../middlewares/Auth')
const AMauthorization = require('../../middlewares/AuthAM')

<<<<<<< HEAD
router.post ('/users',adminAuthorization, userControllers.createUser)
=======
router.post ('/users', adminAuthorization, userControllers.createUser)
>>>>>>> 58a4105f2fcefae24726d265e05aaa24d5be88da

router.post ('/users/login', userControllers.loginUser)

router.get('/users', AMauthorization, userControllers.searchForUsers)

<<<<<<< HEAD
router.get('/users:id', AMauthorization, userControllers.getUsersId)

router.put('/users:id', adminAuthorization, userControllers.updateUser)

router.delete('/users/:id', userControllers.deleteUser)

router.post('/refresh/token', userControllers.refreshTokens)

router.get('/allUsers', userControllers.getAllUsers)
=======
router.get('/users/:id', userControllers.getUsersId)

router.put('/users/:id', userControllers.updateUser)

router.delete('/users/:id', adminAuthorization, userControllers.deleteUser)
>>>>>>> 58a4105f2fcefae24726d265e05aaa24d5be88da

module.exports = router