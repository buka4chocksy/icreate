var model = require('../model/Clients');
var Baserepository = require('../repository/BaseRepository');
var clientRepo = new Baserepository(model);
var Stock = require('../model/Products');
var order = require('../model/Order');
var OrderRepo = new Baserepository(order);

exports.MakeOrder = (userType, option)=>{
    return new Promise((resolve , reject)=>{
        if(userType == 'Clients'){
               Stock.find({_id:option.product}).then(found =>{
                   if(found){
                       var productPrice = found.map(a => a.cost );
                       var quantityNeeded = option.quantity
                       var converQuantity = (parseInt(quantityNeeded))
                       var convert = productPrice.toString();
                       var converInt = (parseInt(convert) * converQuantity )
                       console.log(converInt ,'----------')
                    
                            var productQuantity = {quantity:option.quantity }
                            var totalCost = ( converInt * productQuantity)
                            var productDescription = found.map(b => b.description )
                            var convertedDespt = productDescription.toString();
                        
                            var orderDetail = {
                                title:option.title,
                                fullName:option.fullName,
                                gender:option.gender,
                                address:option.address,
                                phoneNumber:option.phoneNumber,
                                date:Date.now(),
                                orderDescription:convertedDespt,
                                quantity:option.quantity,
                                cost:converInt,
                                payment:option.payment,
                                deliveryMethod:option.deliveryMethod,
                                product:option.product,
                            }
                            OrderRepo.add(orderDetail).then( created =>{
                                if(created){

                                    resolve({success:true , message:'Customer order made successfully'})
                                }else{
                                    resolve({success: false , message:'Data cannot be displayed !!'})
                                }
                            }).catch(err =>{
                                reject(err);
                            })
                   }
               })


        }else{
            resolve({success:false , message: 'Please login !!'})
        }
    })
}

exports.viewOrder = (username)=>{
return new Promise((resolve, reject)=>{
    order.find({fullName:username}).then(gotten =>{
        if(gotten){
            resolve({success:true , message:gotten})
        }else{
            resolve({success:false , message:'No order seen'})
        }
    }).catch(err =>{
        reject(err);
    })
})
}

exports.UpdateOrder = (username, id , data)=>{
    return new Promise((resolve, reject)=>{
        
        order.find({fullName:username}).then(gotten =>{
            if(gotten){
                OrderRepo.updateByQuery({_id:id} , data).then( updated =>{
                    if(updated){
                    
                        resolve({success:true , message:'Order was updated successfully'})
                    }else{
                        resolve({success:false , message:'data not updated'})
                    }
                })
            }else{
                resolve({success:false , message:'No order seen'})
            }
        }).catch(err =>{
            reject(err);
        })
    })
}

exports.updateProfile = function(id, data){
    return new Promise((resolve, reject)=>{
        EmployerRepo.updateByQuery({publicId: id}, data).then(updated =>{
            if(updated){
                EmployerRepo.getById(updated._id)
                .then(employ => resolve({success:true , data:employ , message:"your profile was updated successfully"}))
                .catch(err => resolve({success:false , data:err , message:"unable to update user Profile"}))
            }
        }).catch(err => {
            reject({success: false, data: err, message: "could not update profile"});
        });
    })
}