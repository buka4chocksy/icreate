var User = require('../model/Users');
var Product = require('../model/Products');
var BaseRepository = require('../repository/BaseRepository');
var UserRepo = new BaseRepository(User);
var productRepo = new BaseRepository(Product);
exports.DeleteUser = (userType , ClientId)=>{
    return new Promise((resolve, reject)=>{
        if(userType == "Admin"){
           UserRepo.getById(ClientId.id).then( found =>{
               if(found){
                   UserRepo.delete(ClientId.id).then(deleted =>{
                       if(deleted){
                           resolve({success:true , message:'Client deleted'});
                       }else{
                        resolve({success:false , message:'Error encountered while deleting user !!'})
    
                       }
                   })

               }else{
                resolve({success:false , message:'User does not exist !!'})
   
               }
           }).catch(err =>{
               reject(err);
           })
        }else{
            resolve({success:false , message:'Not Authorized'})
        }
    })
}

exports.createProduct = (userType ,options)=>{
    return new Promise((resolve, reject)=>{
        if(userType == 'Admin'){
         productRepo.add(options).then(created =>{
             if(created){
                 resolve({success:true , message:'Product created successfully !!'})
             }else{
                 resolve({success:false , message:'Unable to create product'})
             }
         }).catch(err =>{
             reject(err);
         })
        }else{
            resolve({success:false , message:'Not Authorized'})
        }
    })
}

exports.GetAllProducts = ()=>{
    return new Promise((resolve, reject)=>{
        productRepo.get().then(products =>{
            if(products){
                resolve({success:true,  data:products });
            }else{
                resolve({success:false ,  message:'Could not find  products !!'})
            }
        }).catch(err =>{
            reject(err);
        })
    })
}

exports.getproductById = (id)=>{
    return new Promise((resolve, reject)=>{
        productRepo.getSingleBy({_id:id}).then(found =>{
            if(found){
                resolve({success:true , message: found});
            }else{
                resolve({success:false , message:'Could not find product'});
            }
        }).catch(err =>{
            reject(err);
        })
    })
}