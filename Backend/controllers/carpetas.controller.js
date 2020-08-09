const carpetasController = {};
const usuariosModel = require('../models/usuarios.model');


// usuariosController.getCarpetas = async(request, response) => { //función asincrona
//     const carpetas = await usuariosModel.find(); //respuesta de espera
//     response.json(carpetas);
// };

carpetasController.createCarpeta = async (req, res) => {
    const files = req.files;
    let status;
    
    if (req.body.nombre_carpeta && req.body.carpeta_padre) {
      status = 'carpeta almacenado correctamente';
      const carpeta = new usuariosModel.carpetasSchema(req.body.carpetasSchema);
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
        nombre_carpeta: req.body.carpetasSchema.nombre_carpeta
    };
    await usuariosModel.carpetasSchema.findByIdAndUpdate(req.params.id, { $set: carpeta }, { new: true });
    res.json({
        status: 'Carpeta actualizada correctamente'
    })
}

carpetasController.deleteCarpeta = async(req, res) => {
    await usuariosModel.carpetasSchema.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Carpeta eliminada'
    })
}


module.exports = carpetasController;