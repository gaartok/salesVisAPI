import express from 'express';
const salesVisController = require('../controllers/sales-vis'); 

const router = express.Router();

router.post('/salesVis/importData', salesVisController.saveSpreadsheet, salesVisController.processSpreadsheet);
//router.post('/salesVis/importData', salesVisController.processData);

//router.get('/salesVis', salesVisController.getAllData);
//router.post('/salesVis', salesVisController.newData);
//router.post('/salesVis', upload.none(), salesVisController.newData);
//router.delete('/salesVis', salesVisController.deleteAllData);

//router.get('/salesVis/:name', salesVisController.getOneData);
//router.post('/salesVis/:name', salesVisController.newComment);
//router.delete('/salesVis/:name', salesVisController.deleteOneData);

module.exports = router;
