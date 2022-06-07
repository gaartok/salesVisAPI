import express from 'express';
const importData = require('../controllers/importData');
const getSalesData = require('../controllers/getSalesData');

const router = express.Router();

router.post('/salesVis/importData', importData);
router.get('/salesVis/salesData/startDate/:startDate/endDate/:endDate', getSalesData);

//router.delete('/salesVis', salesVisController.deleteAllData);

//router.get('/salesVis/:name', salesVisController.getOneData);
//router.delete('/salesVis/:name', salesVisController.deleteOneData);

module.exports = router;
