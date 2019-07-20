var authController = require('../controller/AuthController');
 var authMiddleware = require('../middleware/AdminMiddleware');
var router = require('express').Router();
module.exports = function(){
    const authCtrl = new authController();
    router.post('/register', authCtrl.register);
    router.post('/authenticate', authCtrl.authenticate);
    router.post('/reset/:token', authMiddleware.authenticate, authCtrl.changeUserPassword);

    return router;
}