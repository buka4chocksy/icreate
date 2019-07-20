var service = require('../service/AdminService');
cloudinary = require('../middleware/cloudinary')
 

module.exports  = function AdminController(){
    this.deleteUser = (req,res)=>{
        var Option = {id:req.params.id};
        service.DeleteUser(req.auth.userType, Option).then((data)=>{
            res.json({data});
        }).catch((err)=>{
            res.status(500).send(err);
        })
    }

    // this.GetAll = (req,res)=>{
    //     service.AdminGetJobs().then((data)=>{
    //         res.json({data})
    //     }).catch((err)=>{
    //         res.status(500).send(err);
    //     })
    // }

    this.CreateProduct = async (req, res)=>{
        var productDetails = {
            name:req.body.name,
            description:req.body.description,
            cost:req.body.cost,
            quantity:req.body.quantity,
            image: (req.file != null && req.file !== undefined) ? req.file.path : null
        }
        console.log("file detail recieved", productDetails.image);
        if(req.image !== null && req.file !== undefined){
          await cloudinary.uploadToCloud(productDetails.image).then((img)=>{
            console.log("Cloudinary details recieved", img.url);
            productDetails.imageUrl = img.url;
            productDetails.imageID = img.ID;
            return productDetails;
        });
    }
    service.createProduct(req.auth.userType ,productDetails )
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
    }

    this.getAll = (req, res)=>{
        service.GetAllProducts().then((data)=>{
            res.json({data});
        }).catch((err)=>{
            res.status(500).send(err);
        })
    } 

    
    this.getProduct = (req, res)=>{
        service.GetAllProducts(req.params.id).then((data)=>{
            res.json({data});
        }).catch((err)=>{
            res.status(500).send(err);
        })
    }
}