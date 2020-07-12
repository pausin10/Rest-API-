const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
    email: {type: String},
    password: {type: String},
    date: {type: Date, value: Date.now()}
  
});


UserSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, 8);
};

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};




module.exports = mongoose.model('User',UserSchema)