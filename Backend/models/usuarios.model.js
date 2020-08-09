const mongoose = require('mongoose');
const { Schema } = mongoose;

//subdocumentos
const proyectosSchema = new Schema({ 
    nombre_proyecto: {
        type: String,
        require: true
    },
    fecha_creacion: {
        type: String,
        require: true
    },
    ultima_modificacion: {
        type: String,
        require: true
    },
    url_img: {
        type: String,
        require: true
    },
    codigo_HTML: {
        type: String,
    },
    codigo_CSS: {
        type: String,
    },
    codigo_JS: {
        type: String,
    }
});

const snippetsSchema = new Schema({ 
    nombreSnippet: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type: String,
        require: true
    },
    url_img: {
        type: String,
        require: true
    },
    codigo: {
        type: String,
    }
    
});

const carpetasSchema = new Schema({ 
    nombre_carpeta: {
        type: String,
        require: true
    },
    carpeta_padre: {
        type: String,
        require: true
    },
    proyectos: [],
    snippets: []
});
//esquema padre
const UsuariosSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    contrasena: {
        type: String,
        require: true
    },
    perfil: {
        type: String
    },
    plan: {
        type: String,
        require: true
    },
    proyectos: [proyectosSchema],
    snippets: [snippetsSchema],
    carpetas: [carpetasSchema]
});


module.exports = mongoose.model('usuarios', UsuariosSchema); 