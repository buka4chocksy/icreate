var AuhtRoutes = require('./AuthRoutes');
var AdminRoutes = require('./AdminRoutes');
var ClientRoutes = require('./ClientsRoutes');
module.exports = function(router){

router.use('/auth', AuhtRoutes())
router.use('/Admin', AdminRoutes())
router.use('/Client', ClientRoutes())
 return router;
}