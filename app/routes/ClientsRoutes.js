var clientController = require('../controller/clientController');
 var authMiddleware = require('../middleware/AdminMiddleware');
var router = require('express').Router();
module.exports = function(){
    const clientCtrl = new clientController();
    router.post('/order', authMiddleware.authenticate, clientCtrl.Order);
    router.get('/viewOrder', authMiddleware.authenticate, clientCtrl.ViewOrder);
    router.put('/updateOrder/:id', authMiddleware.authenticate, clientCtrl.updateOrder);


    return router;
}