const express = require('express');
const routerCarpeta = express.Router();
const carpetasController = require('../controllers/carpetas.controller');
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


routerCarpeta.post('/', carpetasController.getArchivos);
routerCarpeta.post('/create-carpeta', upload.single('files'), carpetasController.createCarpeta);
routerCarpeta.put('/edit-carpeta/:id_usuario/:id_carpeta', carpetasController.editCarpeta);
routerCarpeta.delete('/delete-carpeta/:id_usuario/:id_carpeta', carpetasController.deleteCarpeta);

module.exports = routerCarpeta; 
