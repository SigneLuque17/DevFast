const usuariosController = {};
const usuariosModel = require('../models/usuarios.model');
const planesModel = require('../models/planes.model');


usuariosController.getPlanes = async(request, response) => { //función asincrona
    const planes = await planesModel.find(); //respuesta de espera
    response.json(planes);
};

usuariosController.createUser = async (req, res) => {
    const usuario = await new usuariosModel(req.body);
      usuario.save();
      console.log(usuario);
      const idUser = await usuario._id;

    res.json({
        status: 'Usuario creado correctamente',
        id: idUser,
      });
  };
  

usuariosController.getUser = async(req, res) => {
    // const user = await usuariosModel.findById(req.params.id);
    // const user = await usuariosModel.filter( correo => correo.correo == req.body.correo);

    // const correoUsuario = user.filter( correo => correo.correo == req.body.correo);
    const correoUsuario = await usuariosModel.findOne({correo: {$eq:req.params.correo} }, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Result : ", docs); 
        } 
    });


    res.json({
        status: 'Received',
        user: correoUsuario,
        idUsuario: correoUsuario._id
        // usuario: correoUsuario
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