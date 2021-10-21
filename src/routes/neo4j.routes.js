const {
    Router
} = require('express');
const router = Router();

const { isAuthenticated } = require('../helpers/auth');

const { addFriend, deleteFriend, perfilUser } = require('../controllers/neo.controller')

router.post('/add-friend/:id1/:id2',isAuthenticated, addFriend);
router.post('/delete-friend/:id1/:id2',isAuthenticated, deleteFriend);

router.get('/perfil/:id', isAuthenticated,  perfilUser);


module.exports = router;