var express = require('express');
var router = express.Router();
const vehicleController = require('../controllers/vehicleController');

/* GET home page. */
router.get('/', vehicleController.findAll);

router.post('/', vehicleController.createData)

module.exports = router;
