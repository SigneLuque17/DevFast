const mongoose = require('mongoose');

const URI = 'mongodb://localhost/devfast';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is connect'))
    .catch(err => console.log(err));

module.exports = mongoose;