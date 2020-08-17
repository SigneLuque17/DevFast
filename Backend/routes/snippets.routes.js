const express = require('express');
const routerSnippet = express.Router();
const snippetsController = require('../controllers/snippets.controller');
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


routerSnippet.post('/create-snippet', upload.single('files'), snippetsController.createSnippet);
routerSnippet.post('/show-snippet', snippetsController.getSnippet);
routerSnippet.put('/edit-snippet/:id_usuario/:id_snippet', snippetsController.editSnippet);
routerSnippet.delete('/delete-snippet/:id_usuario/:id_snippet', snippetsController.deleteSnippet);

module.exports = routerSnippet; 
