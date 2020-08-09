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


// router.get('/', carpetasController.getPlanes);
routerCarpeta.post('/create-carpeta', upload.single('files'), carpetasController.createCarpeta);
routerCarpeta.get('/show-carpeta/:id', carpetasController.getCarpeta);
routerCarpeta.put('/edit-carpeta/:id', carpetasController.editCarpeta);
routerCarpeta.delete('/delete-carpeta/:id', carpetasController.deleteCarpeta);

module.exports = routerCarpeta; 