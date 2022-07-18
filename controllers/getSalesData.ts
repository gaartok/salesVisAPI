import fs from 'fs'; 
const { PurchasedItems } = require('../models/sales-vis');


// '/salesVis/salesData/startDate/:startDate/endDate/:endDate'

const getSalesData = async (req, res, next) => {
    console.log(`getSalesData params = ${JSON.stringify(req.params)}`);
    setTimeout(() => {
        res.send(JSON.stringify({ testData: 'Hello from getSalesData!' }));
    }, 300);
};


module.exports = getSalesData;


