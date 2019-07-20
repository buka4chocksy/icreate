var adminController = require('../controller/AdminController');
 var authMiddleware = require('../middleware/AdminMiddleware');
 var multer = require('../middleware/multer');
var router = require('express').Router();
module.exports = function(){
    const adminCtrl = new adminController();
    router.delete('/deleteUser/:id', authMiddleware.authenticate, adminCtrl.deleteUser);
    router.post('/createProduct',   authMiddleware.authenticate, multer.upload.single('image'), adminCtrl.CreateProduct);
    router.get('/products',  adminCtrl.getAll);
    router.get('/products/:id',  adminCtrl.getProduct);

    return router;
}