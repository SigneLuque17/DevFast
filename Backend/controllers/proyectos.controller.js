const proyectosController = {};
const proyectosModel = require('../models/usuarios.model');


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
    // const files = req.files;
    // 
    
    // if (req.body.proyectosSchema.nombre_proyecto && 
    //     req.body.proyectosSchema.fecha_creacion && 
    //     req.body.proyectosSchema.ultima_modificacion && 
    //     req.body.proyectosSchema.url_img) {
    //   status = 'Proyecto almacenado correctamente';
    //   const proyecto = new proyectosModel.proyectosSchema(req.body.proyectosSchema);
    //   await proyecto.save();
    //   console.log(proyecto);
    // } else {
    //   const error = new Error('Dato no válido');
    //   error.httpStatusCode = 400;
    //   res.status(400).send(error);
    // }
    
   
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

    const proyecto = proyectoUpdated.proyectos.find(proyecto => proyecto._id == req.params.id_proyecto );
    
    res.json({
        status: 'Proyecto actualizado correctamente',
        project: proyecto
    });
}

proyectosController.deleteProject = async(req, res) => {
   
    const usuario = await proyectosModel.findById(req.params.id_usuario);
    const proyecto = usuario.proyectos.id(req.params.id_proyecto).remove();

    usuario.save(function (err) {
          if (err) return handleError(err);
          console.log('Proyecto eliminado con éxito');
        });
    res.json({
        status: 'Proyecto eliminado correctamente',
    });

}


module.exports = proyectosController;