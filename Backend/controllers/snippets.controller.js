const snippetController = {};
const snippetModel = require('../models/usuarios.model');
const usuariosModel = require('../models/usuarios.model');


snippetController.createSnippet = async (req, res) => {
  const snippet = req.body.snippet;
  const usuario = await snippetModel.findById(req.body.id_usuario);
  usuario.snippets.push(snippet);
  usuario.save();
  console.log(usuario);
  console.log(snippet); 
  
  res.json({
      status: 'Snippet creado exitosamente',
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
                "snippets.$.codigo": req.body.codigo,
                "snippets.$.lenguaje": req.body.lenguaje,
                "snippets.$.extension": req.body.extension
            }
        },{ 
            new: true,
            useFindAndModify:false,
            upsert: true                //obtener data actualizada
        }
    );

    const snippetActualizado = snippetUpdated.snippets.find(snippet => snippet._id == req.params.id_snippet );
    const usuario = await usuariosModel.findById(req.params.id_usuario);
    const snippets = usuario.snippets.filter( snippet => snippet.carpeta_padre == snippetActualizado.carpeta_padre);

    res.json({
        status: 'Snippet actualizado correctamente',
        snippet: snippetActualizado,
        snippets: snippets
    });
}

snippetController.deleteSnippet = async(req, res) => {
    const usuario = await snippetModel.findById(req.params.id_usuario);
    const snippetEliminado = usuario.snippets.id(req.params.id_snippet).remove();

    const snippets = usuario.snippets.filter( snippet => snippet.carpeta_padre == snippetEliminado.carpeta_padre);

    usuario.save(function (err) {
          if (err) return handleError(err);
          console.log('Snippet eliminado con éxito');
        });

    res.json({
        status: 'Snippet eliminado correctamente',
        snippets: snippets
    });
}


module.exports = snippetController;