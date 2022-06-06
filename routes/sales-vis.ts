import express from 'express';
const salesVisController = require('../controllers/sales-vis'); 

const router = express.Router();

router.post('/salesVis/importData', salesVisController.processData);

//router.get('/salesVis', salesVisController.getAllData);
//router.delete('/salesVis', salesVisController.deleteAllData);

//router.get('/salesVis/:name', salesVisController.getOneData);
//router.delete('/salesVis/:name', salesVisController.deleteOneData);

module.exports = router;
