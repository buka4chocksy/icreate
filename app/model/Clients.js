var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClientSchema = new Schema({
    fullName:{type:String , required:true, unique:true},
    publicId:{type: mongoose.Types.ObjectId},
    userId:{type: mongoose.Types.ObjectId},
});

module.exports = mongoose.model('Client', ClientSchema);