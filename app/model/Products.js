var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    name:{type:String , required:true},
    description:{type:String , required:true},
    cost:{type:String , required:true},
    quantity:{type:Number , required:true},
    imageUrl: {type: String, default:''},
    imageID: {type: String, default: ''},
})

module.exports = mongoose.model('Products', ProductSchema);