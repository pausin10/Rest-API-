const mongoose = require('mongoose');

/*Configuracion para mongoDB y no de errores*/ 
mongoose.connect('mongodb://localhost/Libreria', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
 .then(db => console.log('DB is connected'))
 .catch(err => console.error(err));
