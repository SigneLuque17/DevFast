const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './FrontEnd/src/assets/img');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: Storage
});


router.get('/', usuariosController.getPlanes);
router.post('/create', upload.single('files'), usuariosController.createUser);
router.get('/show/:id', usuariosController.getUser);
router.put('/edit/:id', usuariosController.editUser);
router.delete('/delete/:id', usuariosController.deleteUser);

module.exports = router; 