const devfastController = {};
const devfastModel = require('../models/devfast.model');

// devfastController.getUsuario = async(request, response) => { //función asincrona
//     const usuario = await devfastModel.find(); //respuesta de espera
//     response.json(usuario);
// };

devfastController.createUser = async (req, res) => {
    const files = req.files;
    let status;
    
    if (req.body.nombre && req.body.correo && req.body.contrasena && req.body.plan) {
      status = 'Usuario almacenado correctamente';
      const usuario = new devfastModel(req.body);
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
  

devfastController.getUser = async(req, res) => {
    const user = await devfastModel.findById(req.params.id);

    res.json({
        status: 'Received',
        user: user
    });
};

devfastController.editUser = async(req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        contrasena: req.body.bio,
        perfil: req.body.img,
        plan: req.body.aparicion
    };
    await devfastModel.findByIdAndUpdate(req.params.id, { $set: usuario }, { new: true });
    res.json({
        status: 'Usuario actualizado correctamente'
    })
}

devfastController.deleteHero = async(req, res) => {
    await devfastModel.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Usuario eliminado'
    })
}


module.exports = devfastController;