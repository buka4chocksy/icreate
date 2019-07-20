var BaseRepository =  require('../repository/BaseRepository');
var User = require('../model/Users');
var Clients = require('../model/Clients');
var Admin = require('../model/Admin');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var ClientsRepo = new BaseRepository(Clients);
var UserRepo = new BaseRepository(User);
var AdminRepo = new BaseRepository(Admin);
var secret = process.env.Secret;

exports.RegisterUser = (Options)=>{
  return new Promise((resolve, reject)=>{
     let hash = bcrypt.hashSync(Options.password , 10);
      var u = {
        fullName:Options.fullName,
         userType:Options.userType,
         publicId:Options.publicId,
         password:hash,

      }
     User.findOne({fullName:u.fullName}).then(exists =>{
         if(exists){
         reject({success: false , message:'Sorry user already exists'});
         }else{
            UserRepo.add(u).then((user)=>{
                if(u.userType == 'Clients'){
                   var D  = {
                       fullName:Options.fullName,
                       userId:user._id,
                       publicId:user.publicId,
                   }
                  return  ClientsRepo.add(D);
                }else if(u.userType == 'Admin'){
                   var E =  {
                    fullName:Options.fullName,
                    userId:user._id,
                    publicId:user.publicId,
                   }
                   return AdminRepo.add(E);
                }
            }).then(()=>{
               resolve({ success:true , message:'Registration Successful'});
       
            }).catch((err)=>{
                reject({success: false , message:'Error Registering user ', data:err});
            })
         }
     })
  
  })
}


function authenticateuser(username, password){
    return new Promise((resolve, reject)=>{
        if(username.length == 0 || password.length == 0){
            resolve({ success:false , message:'authentication credentials incomplete'});

        }else{
            UserRepo.getSingleBy({fullName: username},'').then((user)=>{
                console.log('i reach here' , user.password);
                if(!user){
                    resolve({success:false , message:'could not authenticate user'});
                }else{
                    var validPassword = bcrypt.compareSync(password, user.password);
                    console.log(validPassword , 'valid password ---------')
                    if(validPassword){
                        getUserDetail(user,user.publicId).then(userdetail =>{
                            generateToken(userdetail).then((token)=>{
                                resolve({success:true , data: {user, token : token }, message: 'authentication successful'})
                            }).catch((err)=>{
                                resolve({success: false, data:err, message:'could not authenticate user'})
                            })
                            })
                    }else{
                        resolve({success: false, message:'INVALID LOGIN'})
 
                    }
                }
            }).catch((err)=>{
                reject(err);
            })
        }
    })
}

exports.authenticateuser = authenticateuser


function getUserDetail(user,Id){
    return new Promise((resolve, reject)=>{
        //console.log('this is user detail', user.status);
        if(user.userType == 'Clients'){
            ClientsRepo.getSingleBy({publicID:Id}, {"_id" : 0, "__v" : 0}).then(data =>{
                var specificUserDetail = {fullName: user.fullName,   userType : user.userType, publicId : user.publicId};
               // userdetail = {...data.toObject(),...specificUserDetail};
                resolve(specificUserDetail);
            }).catch(error => reject(error))
        }else{
            AdminRepo.getSingleBy({publicId:Id}, {"_id" : 0, "__v" : 0}).then(data =>{
                var specificUserDetail = {fullName: user.fullName,   userType : user.userType, publicId : user.publicId};
                userdetail = {...data.toObject(),...specificUserDetail};
                resolve(userdetail);
            }).catch(error => reject(error));
        }
    })
}

function generateToken(data ={}){
    return new Promise((resolve, reject)=>{
        jwt.sign({...data}, secret, {expiresIn: '24hrs'}, function(err, token){
            if(err){
                reject(err);
            }else{
                resolve(token);
            }
        });
    })
}

exports.generateToken = generateToken;

function verifyToken (token= ""){
    return new Promise((resolve, reject)=>{
        jwt.verify(token.replace("Bearer", ""), secret, function(err, decodedToken ){
            if(err){
                reject(err);
            }else{
                resolve(decodedToken);
            }
        });
    });
};
exports.verifyToken = verifyToken;

exports.ChangePassword = (option)=>{
    return new Promise((resolve,reject)=>{
       verifyToken(option.token).then(decoded =>{
          UserRepo.getSingleBy({fullName:decoded.fullName}).then(user =>{
              if(user){
                bcrypt.hash(option.password , 10 , function(err , hash){
                    console.log(hash, 'hashed password')
                    if(err)reject(err);
                    user.password = hash;
                    user.save();
                    resolve(user);
                })
              }else{
                resolve({success:false, message:'Sorry user does not exist'})
              }
          }) 
       })
    
    })
}

// exports.changeUserPassword = function(options){
//     return new Promise((resolve, reject)=>{

//     })
//}
