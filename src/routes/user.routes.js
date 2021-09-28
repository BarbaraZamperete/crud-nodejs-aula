const {
    Router
} = require('express');
const router = Router();

const {
    renderSingUpForm,
    signup,
    renderLoginForm,
    login,
    logout
} = require('../controllers/user.controllers');

router.get('/users/signup', renderSingUpForm);
router.post('/users/signup', signup);

router.get('/users/login', renderLoginForm);
router.post('/users/login', login);

router.get('/users/logout', logout);



module.exports = router;