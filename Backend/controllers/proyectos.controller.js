const proyectosController = {};
const proyectosModel = require('../models/usuarios.model');
const usuariosModel = require('../models/usuarios.model');


proyectosController.createProject = async (req, res) => {
 
  const proyecto = req.body.proyecto;
  const usuario = await proyectosModel.findById(req.body.id_usuario);
  usuario.proyectos.push(proyecto);
  usuario.save();
  console.log(usuario);
  console.log(proyecto); 
  
  res.json({
      status: 'status',
      req: req.body
    });
   
  };
  
proyectosController.getProject = async(req, res) => {
    const usuario = await proyectosModel.findById(req.body.id_usuario);
    const proyecto = usuario.proyectos.find(proyecto => proyecto._id == req.body.id_proyecto);


    res.json({
        status: 'Received',
        project: proyecto
    });
};

proyectosController.editProject = async(req, res) => {
    const proyectoUpdated = await proyectosModel.findOneAndUpdate(
        { "_id": req.params.id_usuario, "proyectos._id": req.params.id_proyecto },
        { 
            "$set": {
                "proyectos.$.nombre_proyecto": req.body.nombre_proyecto,
                "proyectos.$.ultima_modificacion": req.body.ultima_modificacion,
                "proyectos.$.codigo_HTML": req.body.codigo_HTML,
                "proyectos.$.codigo_CSS": req.body.codigo_CSS,
                "proyectos.$.codigo_JS": req.body.codigo_JS,
            }
        },{ 
            new: true,
            useFindAndModify:false,
            upsert: true                //obtener data actualizada
        }
    );

    const proyectoActualizado = proyectoUpdated.proyectos.find(proyecto => proyecto._id == req.params.id_proyecto );

    const usuario = await usuariosModel.findById(req.params.id_usuario);
    const proyectos = usuario.proyectos.filter( proyecto => proyecto.carpeta_padre == proyectoActualizado.carpeta_padre);
    res.json({
        status: 'Proyecto actualizado correctamente',
        project: proyectoActualizado,
        proyectos : proyectos
    });
}

proyectosController.deleteProject = async(req, res) => {
   
    const usuario = await proyectosModel.findById(req.params.id_usuario);
    const proyectoEliminado = usuario.proyectos.id(req.params.id_proyecto).remove();

    const proyectos = usuario.proyectos.filter( proyecto => proyecto.carpeta_padre == proyectoEliminado.carpeta_padre);
    console.log(proyectos);

    usuario.save(function (err) {
          if (err) return handleError(err);
          console.log('Proyecto eliminado con éxito');
        });
        
    res.json({
        status: 'Proyecto eliminado correctamente',
        proyectos: proyectos
    });

}


module.exports = proyectosController;