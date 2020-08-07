const express = require('express');
const router = express.Router();
const devfastController = require('../controllers/heroes.controllers');
// const multer = require('multer');

// const Storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './FrontEnd/src/assets/img');
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage: Storage
// });


// router.get('/', devfastController.getProjects);
router.post('/create', upload.array('files'), devfastController.createUser);
router.get('/show/:id', devfastController.getUser);
router.put('/edit/:id', devfastController.editUser);
router.delete('/delete/:id', devfastController.deleteUser);

module.exports = router;