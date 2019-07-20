var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UsersSchema = new Schema({
    fullName:{type:String , required:true},
    userType:{type:String},
    publicId:{type: mongoose.Types.ObjectId},
    password:{type:String , required:true },
})

module.exports = mongoose.model('Users', UsersSchema);