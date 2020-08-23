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
    
    res.json({
      status: 'status',
      req: req.body
    });
  };
  
carpetasController.editCarpeta = async(req, res) => {
  const carpetaUpdated = await usuariosModel.findOneAndUpdate(
    { "_id": req.params.id_usuario, "carpetas._id": req.params.id_carpeta },
    { 
        "$set": {
            "carpetas.$.nombre_carpeta": req.body.nombre_carpeta
        }
    },{ 
        new: true,
        useFindAndModify:false,
        upsert: true                //obtener data actualizada
    }
  );

  const carpetaActualizada = carpetaUpdated.carpetas.find(carpeta => carpeta._id == req.params.id_carpeta );
  const usuario = await usuariosModel.findById(req.params.id_usuario);
  const carpetas = usuario.carpetas.filter( carpeta => carpeta.carpeta_padre == carpetaActualizada.carpeta_padre);

  res.json({
      status: 'Carpeta actualizado correctamente',
      folder: carpetaActualizada,
      carpetas: carpetas
  });
}

carpetasController.deleteCarpeta = async(req, res) => {
  const usuario = await usuariosModel.findById(req.params.id_usuario);

  const carpeta = usuario.carpetas.id(req.params.id_carpeta);
  const idCarpetaPadre = carpeta.carpeta_padre;
  
  if (carpeta) {
    carpeta.remove();

    usuario.proyectos.forEach(proyecto => {
      if (proyecto.carpeta_padre === req.params.id_carpeta) {
        proyecto.remove();
      }
    });
    usuario.carpetas.forEach(carpeta => {
      if (carpeta.carpeta_padre === req.params.id_carpeta) {
        carpeta.remove();
      }
    });
    usuario.snippets.forEach(snippet => {
      if (snippet.carpeta_padre === req.params.id_carpeta ) {
        snippet.remove();
      }
    });
  }

  const carpetas = usuario.carpetas.filter( carpeta => carpeta.carpeta_padre === idCarpetaPadre);
  console.log(carpetas);
  
  usuario.save(function (err) {
        if (err) return handleError(err);
        console.log('carpeta eliminada con éxito');
        res.json({
            status: 'Carpeta eliminada correctamente',
            carpetas: carpetas
        })
      });
}



module.exports = carpetasController;