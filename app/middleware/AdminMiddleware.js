var adminService = require('../service/authService');
var BaseRepository = require('../repository/BaseRepository');
var model = require('../model/Admin');
var model2 = require('../model/Clients')
var AdminRepo = new BaseRepository(model);
var ClientRepo = new BaseRepository(model2);

exports.authenticate = function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        adminService.verifyToken(token, userType = '').then(decoded =>{
            if(decoded.userType === 'Clients'){
                ClientRepo.getSingleBy({publicId:decoded.publicId}, '').then(data =>{
                    if(data == null){
                        res.status(401).send({success:false, message: "User does not exist" });
                    }else{
                        req.auth ={
                            userId:data.userId,
                            publicId:data.publicId,
                            userType:decoded.userType,
                            fullName:decoded.fullName,
                            Id:data._id
                        }
                        if(userType !=='' && userType.length > 0){
                            if(userType != decoded.userType)res.status(401).send({success:false , message: "Invalid token", data:err})
                        }
                        res.locals.response = {data: decoded , message:"", success:true};
                        next();
                    }
                })
            }else if(decoded.userType === 'Admin'){
                AdminRepo.getSingleBy({publicId:decoded.publicId},'').then(data =>{
                    if(data == null){
                        res.status(401).send({success:false , message: "User does not exist"});
                    }else{
                        req.auth = {
                            userId:data.userId,
                            publicId:data.publicId,
                            userType:decoded.userType,
                            fullName:decoded.fullName,

                            Id:data._id
                        }
                        console.log(req.auth , 'auth details')
                        res.locals.response = {data:decoded , message:"" , success:true};
                        next();
                    }
                });
            }
        }).catch(err =>{
            res.status(401).send({ success: false, message: "Invalid token", data: err });
 
        })
    }else{
        res.status(401).send({ success: false, message: "No token provided" });
 
    }
}