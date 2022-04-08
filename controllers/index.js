const router = require('express').Router();

const apiRoutes = require('./api');
// what clients views
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
