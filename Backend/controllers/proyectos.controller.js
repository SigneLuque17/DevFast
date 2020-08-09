const proyectosController = {};
const proyectosModel = require('../models/usuarios.model');


// usuariosController.getCarpetas = async(request, response) => { //función asincrona
//     const carpetas = await usuariosModel.find(); //respuesta de espera
//     response.json(carpetas);
// };

proyectosController.createProject = async (req, res) => {
    const files = req.files;
    let status;
    
    if (req.body.proyectosSchema.nombre_proyecto && 
        req.body.proyectosSchema.fecha_creacion && 
        req.body.proyectosSchema.ultima_modificacion && 
        req.body.proyectosSchema.url_img) {
      status = 'Proyecto almacenado correctamente';
      const proyecto = new proyectosModel.proyectosSchema(req.body.proyectosSchema);
      await proyecto.save();
      console.log(proyecto);
    } else {
      const error = new Error('Dato no válido');
      error.httpStatusCode = 400;
      res.status(400).send(error);
    }
    
    res.json({
      status: 'status',
      req: req.body.proyectosSchema
    });
  };
  

proyectosController.getProject = async(req, res) => {
    const proyecto = await proyectosModel.proyectosSchema.findById(req.params.id);

    res.json({
        status: 'Received',
        user: proyecto
    });
};

proyectosController.editProject = async(req, res) => {
    const proyecto = {
        nombre_proyecto: req.body.proyectosSchema.nombre_proyecto,
        ultima_modificacion: req.body.proyectosSchema.ultima_modificacion,
        codigo_HTML: req.body.proyectosSchema.codigo_HTML,
        codigo_CSS: req.body.proyectosSchema.codigo_CSS,
        codigo_JS: req.body.proyectosSchema.codigo_JS
    };
    await proyectosModel.proyectosSchema.findByIdAndUpdate(req.params.id, { $set: carpeta }, { new: true });
    res.json({
        status: 'Proyecto actualizada correctamente'
    })
}

proyectosController.deleteProject = async(req, res) => {
    await proyectosModel.proyectosSchema.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Proyecto eliminada'
    })
}


module.exports = proyectosController;