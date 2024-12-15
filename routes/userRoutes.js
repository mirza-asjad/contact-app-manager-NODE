const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');
const { validToken } = require('../middlewares/tokenValidatorHandler');

// Define routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
// router.route('/current').get(validToken, getCurrentUser);
router.get('/current', validToken, getCurrentUser); 

// Export the router
module.exports = router;
