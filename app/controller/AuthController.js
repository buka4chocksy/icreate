var userService = require('../service/authService');
var mongoose = require('mongoose');
module.exports = function authController(){
    this.register = (req,res, next)=>{
        var Options ={
            fullName:req.body.fullname,
            publicId: mongoose.Types.ObjectId(),
            statusCode: mongoose.Types.ObjectId(),
            email:req.body.email,
            password:req.body.password,
            userType:req.body.usertype,
        }
        userService.RegisterUser(Options).then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json(err);
        })
    }

    this.authenticate = function(req, res, next){
        var username = req.body.username
        var password = req.body.password
        userService.authenticateuser(username,password)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }        

    this.changeUserPassword = function(req,res){
        option = {
            password:req.body.password,
            token:req.params.token
        }
        userService.ChangePassword(option)
        .then((data)=>{res.json(data);
        }).catch((err)=>{
            res.json(err);
        });
    }
}