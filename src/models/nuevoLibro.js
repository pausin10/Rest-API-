const mongoose = require('mongoose');
const {Schema} = mongoose;

const newBookSchema = new Schema({
    title: {type: String, default: ''},
    author: {type: String, default: ''},
    editorial: {type: String, default: ''},
    general: {type: String, default: ''},
    resume: {type: String, default: ''},
    pagesNumber: {type: String, default: ''},
    yearCreation: {type: String, default: ''},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    examen:{type: String, default:''}
});

module.exports = mongoose.model('NewBook',newBookSchema)