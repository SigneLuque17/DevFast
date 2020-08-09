const usuariosController = {};
const usuariosModel = require('../models/usuarios.model');
const planesModel = require('../models/planes.model');


usuariosController.getPlanes = async(request, response) => { //función asincrona
    const planes = await planesModel.find(); //respuesta de espera
    response.json(planes);
};

usuariosController.createUser = async (req, res) => {
    const files = req.files;
    let status;
    
    if (req.body.nombre && req.body.correo && req.body.contrasena && req.body.plan) {
      status = 'Usuario almacenado correctamente';
      const usuario = new usuariosModel(req.body);
      await usuario.save();
      console.log(usuario);
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
  

usuariosController.getUser = async(req, res) => {
    const user = await usuariosModel.findById(req.params.id);

    res.json({
        status: 'Received',
        user: user
    });
};

usuariosController.editUser = async(req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        contrasena: req.body.contrasena,
        perfil: req.body.perfil,
        plan: req.body.plan
    };
    await usuariosModel.findByIdAndUpdate(req.params.id, { $set: usuario }, { new: true });
    res.json({
        status: 'Usuario actualizado correctamente'
    })
}

usuariosController.deleteUser = async(req, res) => {
    await usuariosModel.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Usuario eliminado'
    })
}


module.exports = usuariosController;