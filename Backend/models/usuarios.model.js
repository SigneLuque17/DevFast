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
    codigo_HTML: {
        type: String,
    },
    codigo_CSS: {
        type: String,
    },
    codigo_JS: {
        type: String,
    },
    carpeta_padre: {
        type: String,
        require: true
    }
});

const snippetsSchema = new Schema({ 
    nombre_snippet: {
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
    codigo: {
        type: String,
    },
    carpeta_padre: {
        type: String,
        require: true
    },
    lenguaje: {
        type: String,
        require: true
    },
    extension: {
        type: String,
        require: true
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
    fecha_creacion:{
        type: String,
        require: true
    }
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
    tipo_plan: {
        type: String,
        require: true
    },
    cantidad_proyectos: {
        type: Number,
        require: true
    },
    cantidad_snippets: {
        type: Number,
        require: true
    },
    proyectos: [proyectosSchema],
    snippets: [snippetsSchema],
    carpetas: [carpetasSchema]
});


module.exports = mongoose.model('usuarios', UsuariosSchema); 