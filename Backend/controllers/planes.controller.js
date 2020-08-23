const planesController = {};
const planesModel = require('../models/planes.model');

planesController.createPlanes = async (req, res) => {
    planesModel.insertMany([
        {
           "tipo_plan":"BÁSICO",
           "precio":"Gratis",
           "cantidad_proyectos":6,
           "cantidad_snippets":4
        },
        {
            "tipo_plan":"ESTÁNDAR",
            "precio":"L.250",
            "cantidad_proyectos":20,
            "cantidad_snippets":10
        },
        {
            "tipo_plan":"PREMIUM",
            "precio":"L.650",
            "cantidad_proyectos":200,
            "cantidad_snippets":100
         }
     ]);

    res.json({
        status: 'Planes creados correctamente',
      });
};

module.exports = planesController;
