const {
    Router
} = require('express');
const router = Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/upload')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({
    storage
});

const {
    renderSingUpForm,
    signup,
    renderLoginForm,
    login,
    logout
} = require('../controllers/user.controllers');

router.get('/users/signup', renderSingUpForm);
router.post('/users/signup', upload.single('img') ,signup);

router.get('/users/login', renderLoginForm);
router.post('/users/login', login);

router.get('/users/logout', logout);



module.exports = router;