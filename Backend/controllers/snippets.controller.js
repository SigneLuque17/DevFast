const snippetController = {};
const snippetModel = require('../models/usuarios.model');


snippetController.createSnippet = async (req, res) => {
  const snippet = req.body.snippet;
  const usuario = await snippetModel.findById(req.body.id_usuario);
  usuario.snippets.push(snippet);
  usuario.save();
  console.log(usuario);
  console.log(snippet); 
  
  res.json({
      status: 'status',
      req: req.body
    });
  };
  

snippetController.getSnippet = async(req, res) => {
    const usuario = await snippetModel.findById(req.body.id_usuario);
    const snippet = usuario.snippets.find(snippet => snippet._id == req.body.id_snippet);


    res.json({
        status: 'Received',
        snippet: snippet
    });
};

snippetController.editSnippet = async(req, res) => {
    const snippetUpdated = await snippetModel.findOneAndUpdate(
        { "_id": req.params.id_usuario, "snippets._id": req.params.id_snippet },
        { 
            "$set": {
                "snippets.$.nombre_snippet": req.body.nombre_snippet,
                "snippets.$.ultima_modificacion": req.body.ultima_modificacion,
                "snippets.$.codigo": req.body.codigo
            }
        },{ 
            new: true,
            useFindAndModify:false,
            upsert: true                //obtener data actualizada
        }
    );

    const snippet = snippetUpdated.snippets.find(snippet => snippet._id == req.params.id_snippet );
    
    res.json({
        status: 'Snippet actualizado correctamente',
        snippet: snippet
    });
}

snippetController.deleteSnippet = async(req, res) => {
    const usuario = await snippetModel.findById(req.params.id_usuario);
    const snippet = usuario.snippets.id(req.params.id_snippet).remove();

    usuario.save(function (err) {
          if (err) return handleError(err);
          console.log('Snippet eliminado con éxito');
        });
    res.json({
        status: 'Snippet eliminado correctamente',
    });
}


module.exports = snippetController;