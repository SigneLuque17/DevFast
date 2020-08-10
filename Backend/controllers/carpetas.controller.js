const carpetasController = {};
const usuariosModel = require('../models/usuarios.model');


carpetasController.getArchivos = async(request, response) => { //función asincrona
  const usuario = await usuariosModel.findById(request.body.id_usuario);
  const carpetas = usuario.carpetas.filter( carpeta => carpeta.carpeta_padre == request.body.id_carpeta);
  const snippets = usuario.snippets.filter( snippet => snippet.carpeta_padre == request.body.id_carpeta);
  const proyectos = usuario.proyectos.filter( proyecto => proyecto.carpeta_padre == request.body.id_carpeta);


    // console.log(carpeta);
    // const carpetas = await usuariosModel.findByIdAndUpdate(request.params.id, { $set: request.body.carpetasSchema.nombreCarpeta }, { new: true }); //respuesta de espera
    response.json({
      carpetas: carpetas,
      snippets: snippets,
      proyectos: proyectos,
    });
};

carpetasController.createCarpeta = async (req, res) => {
    const carpeta = req.body.carpeta;
    const usuario = await usuariosModel.findById(req.body.id_usuario);
    usuario.carpetas.push(carpeta);
    usuario.save();
    console.log(usuario);
    console.log(carpeta);
    // const files = req.files;
    // let status;
    
    // if (req.body.nombre_carpeta && req.body.carpeta_padre) {
    //   status = 'carpeta almacenado correctamente';
    //   const carpeta = new usuariosModel.carpetasSchema(req.body.carpetasSchema);
    //   await carpeta.save();
    //   console.log(carpeta);
    // } else {
    //   const error = new Error('Dato no válido');
    //   error.httpStatusCode = 400;
    //   res.status(400).send(error);
    // }
    
    res.json({
      status: 'status',
      req: req.body
    });
  };
  
carpetasController.editCarpeta = async(req, res) => {
    const carpeta = {
        nombre_carpeta: req.body.carpetasSchema.nombre_carpeta
    };
    await usuariosModel.findByIdAndUpdate(req.params.id, { $set: carpeta }, { new: true });
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

// async function getArchivos(idUsuario, idCarpeta = '') {

//   return carpetas;
// }


module.exports = carpetasController;