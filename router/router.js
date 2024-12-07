const express = require('express');
const userController = require('../controller/userContoller');
const authenticate = require('../middleware/authenticate'); // Assuming you have the authenticate middleware

const router = new express.Router();

// Register - POST
router.post('/register', userController.userRegisterController);

// Login - POST
router.post('/login', userController.userLoginController);

// All Users - GET (secured with JWT)
router.get('/alluser', authenticate, userController.allUsersController);

// User Details - GET (secured with JWT)
router.get('/users/:id', authenticate, userController.userDetailsController);

module.exports = router;
