const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../FrontEnd/src/assets/perfil');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: Storage
});


router.get('/', usuariosController.getPlanes);
router.get('/showPlan/:idPlan', usuariosController.getPlan);
router.post('/create', upload.single('files'), usuariosController.createUser);
router.get('/show/:correo', usuariosController.getUser);
router.put('/edit/:id', upload.single('files'), usuariosController.editUser);
router.delete('/delete/:id', usuariosController.deleteUser);

module.exports = router; 