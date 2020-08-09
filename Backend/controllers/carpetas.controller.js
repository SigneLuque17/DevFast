const carpetasController = {};
const usuariosModel = require('../models/usuarios.model');



const carpetasSchema = new Schema({ 
    nombre_carpeta: {
        type: String,
        require: true
    },
    carpeta_padre: {
        type: String,
        require: true
    },
    proyectos: [],
    snippets: []
});

// usuariosController.getCarpetas = async(request, response) => { //función asincrona
//     const carpetas = await usuariosModel.find(); //respuesta de espera
//     response.json(carpetas);
// };

carpetasController.createUser = async (req, res) => {
    const files = req.files;
    let status;
    
    if (req.body.nombre_carpeta && req.body.carpeta_padre) {
      status = 'carpeta almacenado correctamente';
      const carpeta = new usuariosModel.carpetasSchema(req.body);
      await carpeta.save();
      console.log(carpeta);
    } else {
      const error = new Error('Dato no válido');
      error.httpStatusCode = 400;
      res.status(400).send(error);
    }
    
    res.json({
      status: 'status',
      req: req.body
    });
  };
  

carpetasController.getCarpeta = async(req, res) => {
    const carpeta = await usuariosModel.carpetasSchema.findById(req.params.id);

    res.json({
        status: 'Received',
        user: carpeta
    });
};

carpetasController.editCarpeta = async(req, res) => {
    const carpeta = {
        nombre_carpeta: req.body.nombre_carpeta
    };
    await usuariosModel.carpetasSchema.findByIdAndUpdate(req.params.id, { $set: carpeta }, { new: true });
    res.json({
        status: 'Carpeta actualizada correctamente'
    })
}

carpetasController.deleteUser = async(req, res) => {
    await usuariosModel.carpetasSchema.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Carpeta eliminada'
    })
}


module.exports = carpetasController;