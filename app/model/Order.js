var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    title:{type:String , required:true},
    fullName:{type:String , required:true},
    gender:{type:String , required:true},
    address:{type:String , required:true},
    phoneNumber:{type:String , required:true},
    date:{type:Date },
    orderDescription:{type:String , required:true},
    quantity:{type:Number , required:true},
    cost:{type:String , required:true},
    payment:{type:String , required:true},
    deliveryMethod:{type:String , required:true},
    product:{type:mongoose.SchemaTypes.ObjectId, ref:"product" , autopopulate: true },

})

module.exports = mongoose.model('Order', OrderSchema);