const express = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {loginLimiter} = require('../middlewares/rateLimiters');
const {validateSignUp, validateLogin, validateResult} = require('../middlewares/validator');

const router = express.Router();

router.get('/new', isGuest, controller.new);
router.post('/', isGuest, validateSignUp, validateResult, controller.create);
router.get('/login', isGuest, controller.getUserLogin);
router.post('/login', loginLimiter, validateLogin, validateResult, isGuest, controller.login);
router.get('/profile', isLoggedIn, controller.profile);
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;