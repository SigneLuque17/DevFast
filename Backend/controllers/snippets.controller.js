const snippetController = {};
const snippetModel = require('../models/usuarios.model');


// usuariosController.getCarpetas = async(request, response) => { //función asincrona
//     const carpetas = await usuariosModel.find(); //respuesta de espera
//     response.json(carpetas);
// };

snippetController.createSnippet = async (req, res) => {
    const files = req.files;
    let status;
    
    if (req.body.snippetsSchema.nombre_snippet && 
        req.body.snippetsSchema.fecha_creacion && 
        req.body.snippetsSchema.url_img &&
        req.body.snippetsSchema.codigo
        ) {
      status = 'Snippet almacenado correctamente';
      const snippet = new snippetModel.snippetsSchema(req.body.snippetsSchema);
      await snippet.save();
      console.log(snippet);
    } else {
      const error = new Error('Dato no válido');
      error.httpStatusCode = 400;
      res.status(400).send(error);
    }
    
    res.json({
      status: 'status',
      req: req.body.snippetsSchema
    });
  };
  

snippetController.getSnippet = async(req, res) => {
    const snippet = await snippetModel.snippetsSchema.findById(req.params.id);

    res.json({
        status: 'Received',
        user: snippet
    });
};

snippetController.editSnippet = async(req, res) => {
    const snippet = {
        nombre_snippet: req.body.snippetsSchema.nombre_snippet
    };
    await snippetModel.snippetsSchema.findByIdAndUpdate(req.params.id, { $set: carpeta }, { new: true });
    res.json({
        status: 'Snippet actualizada correctamente'
    })
}

snippetController.deleteSnippet = async(req, res) => {
    await snippetModel.snippetsSchema.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Snippet eliminado'
    })
}


module.exports = snippetController;