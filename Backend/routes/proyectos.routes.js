const express = require('express');
const routerProject = express.Router();
const proyectosController = require('../controllers/proyectos.controller');
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


// router.get('/', proyectosController.getPlanes);
routerProject.post('/create-project', upload.single('files'), proyectosController.createProject);
routerProject.get('/show-project/:id', proyectosController.getProject);
routerProject.put('/edit-project/:id', proyectosController.editProject);
routerProject.delete('/delete-project/:id', proyectosController.deleteProject);

module.exports = routerProject; 