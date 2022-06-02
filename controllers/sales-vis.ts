import multer from 'multer';
import fs from 'fs'; 
import { parse } from 'csv-parse';
const { PurchasedItems } = require('../models/sales-vis');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const saveSpreadsheet = multer({storage: storage}).single('spreadsheet');



//0                   1           2      3    4       5                   6         7        8          9         10          11                    12           13         14           15      16        17            18             19   20
//DESCRIPTION,        EXTERNAL ID,VENUE ,SIZE,CHECK #,TIME               ,ITEM COST,QUANTITY,ITEM COMPS,TAB COMPS,ITEM AMOUNT,AMOUNT LESS TAB COMPS,INCLUDED TAX,ADD ON TAX,DEPOSIT/+TAX,TAB TAG,ITEM TAGS,APPLIED COMPS,EMPLOYEE      ,NOTE,COGS
//Cliffside Stonewall,           ,"Bar ",PINT,068502 ,2022-01-01 14:02:16,$6.00    ,1.0     ,$0.00     ,$0.00    ,$6.00      ,$6.00                ,$0.36       ,$0.00     ,            ,       ,         ,             ,"Smith, Kathy",    ,



const processSpreadsheet = async (req, res, next) => {
    if (!req.body.fileName || !req.body.fileData) {
    //if (!req.file || !req.file.originalname) {
        console.log('Error: no file found');
        res.json({message: 'Error: no file found'});
        return;
    }

    const fileName = req.body.fileName;

    console.log(`POST new spreadsheet ${JSON.stringify(fileName)}`);
    fs.createReadStream(fileName)
    .pipe(parse({ delimiter: ',' }))
    .on('data', function (nextRow) {
        if ((nextRow[0] !== 'DESCRIPTION') && (nextRow[0] !== 'TOTAL')) {
            const price = nextRow[6].replace('$', '').replace('(', '').replace(')', '');
            const newRecord = new PurchasedItems({
                name: nextRow[0],
                venue: nextRow[2],
                size: nextRow[3],
                checkNum: nextRow[4],
                time: new Date(nextRow[5]),
                price: price,
                quantity: nextRow[7],
                employee: nextRow[18]
            });

            newRecord.save((err, result) => {
                if (err) {
                    console.log(`err = ${JSON.stringify(err)}`);
                } else {
                    //console.log(`result = ${JSON.stringify(result)}`);
                }
            });
        
            //console.log(newRecord);
        }
    })
    .on('error', (err) => {
        // error on the stream
    })
    .on('end', (err) => {
        console.log(`All done importing spreadsheet ${JSON.stringify(fileName)}`);
    });

    res.json({message: `Importing new spreadsheet: ${fileName}`});
};



const processData = async (req, res, next) => {
    if (!req.body.fileName || !req.body.fileData) {
        console.log('Error: no file found');
        res.json({message: 'Error: no file found'});
        return;
    }

    console.log(`POST new spreadsheet ${JSON.stringify(req.body.fileName)}`);

};


module.exports = {
    processSpreadsheet,
    saveSpreadsheet,
    processData
};


