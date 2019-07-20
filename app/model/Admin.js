var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminSchema = new Schema({
    fullName:{type:String , required:true},
    publicId:{type: mongoose.Types.ObjectId},
    userId:{type: mongoose.Types.ObjectId},
})

module.exports = mongoose.model('Admin', AdminSchema);