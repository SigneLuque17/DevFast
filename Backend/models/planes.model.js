const mongoose = require('mongoose');
const { Schema } = mongoose;

// planes
const planesSchema = new Schema({
    tipo_plan: {
        type: String,
        require: true
    },
    precio: {
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
    }
});

module.exports = mongoose.model('planes', planesSchema); 