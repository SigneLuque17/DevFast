const usuariosController = {};
const usuariosModel = require('../models/usuarios.model');
const planesModel = require('../models/planes.model');


usuariosController.getPlanes = async(request, response) => { //función asincrona
    const planes = await planesModel.find(); //respuesta de espera
    response.json(planes);
};

usuariosController.getPlan = async(req, res) => { //función asincrona
    const plan = await planesModel.findOne({_id: {$eq:req.params.idPlan} }, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Result : ", docs); 
        } 
    });


    res.json({
        status: 'Received',
        plan: plan,
    });

};



usuariosController.createUser = async (req, res) => {
    const plan = await planesModel.findOne({_id: {$eq:req.body.plan} }, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Result : ", docs); 
        } 
    });

    const datos = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        perfil: req.body.perfil,
        plan: req.body.plan,
        tipo_plan: plan.tipo_plan,
        cantidad_proyectos: plan.cantidad_proyectos,
        cantidad_snippets: plan.cantidad_snippets
    }

    const usuario = await new usuariosModel(datos);
      usuario.save();
      console.log(usuario);
      const idUser = await usuario._id;

    res.json({
        status: 'Usuario creado correctamente',
        id: idUser,
      });
  };
  

usuariosController.getUser = async(req, res) => {
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