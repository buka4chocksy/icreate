var service = require('../service/clientService');

module.exports = function clientController (){
    this.Order = (req, res)=>{
        console.log(req.auth.fullName, 'full name')
        var options ={
            title:req.body.title,
            fullName:req.auth.fullName,
            gender:req.body.gender,
            address:req.body.address,
            phoneNumber:req.body.phonenumber,
            quantity:req.body.quantity,
            payment:req.body.payment,
            deliveryMethod:req.body.deliverymethod,
            product:req.body.product,
        }
        service.MakeOrder(req.auth.userType , options)
        .then(data =>{
            res.status(200).send(data);
        }).catch(err =>{
            res.status(500).send(err);
        })
    }

    this.ViewOrder = (req, res)=>{
        service.viewOrder(req.auth.fullName)
        .then(data =>{
            res.status(200).send(data);
        }).catch(err =>{
            res.status(500).send(err);
        })
    }

    this.updateOrder =(req, res)=>{
        var options ={
            title:req.body.title,
            fullName:req.auth.fullName,
            gender:req.body.gender,
            phoneNumber:req.body.phonenumber,
            orderDescription:req.body.body,
            quantity:req.body.quantity,
            payment:req.body.payment,
            deliveryMethod:req.body.deliverymethod,
        }
        service.UpdateOrder(req.auth.fullName , req.params.id, options)
        .then(data =>{
            res.status(200).send(data);
        }).catch(err =>{
            res.status(500).send(err);
        })

    }
}