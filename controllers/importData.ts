import fs from 'fs'; 
const { PurchasedItems } = require('../models/sales-vis');


//0                   1           2      3    4       5                   6         7        8          9         10          11                    12           13         14           15      16        17            18             19   20
//DESCRIPTION,        EXTERNAL ID,VENUE ,SIZE,CHECK #,TIME               ,ITEM COST,QUANTITY,ITEM COMPS,TAB COMPS,ITEM AMOUNT,AMOUNT LESS TAB COMPS,INCLUDED TAX,ADD ON TAX,DEPOSIT/+TAX,TAB TAG,ITEM TAGS,APPLIED COMPS,EMPLOYEE      ,NOTE,COGS
//Cliffside Stonewall,           ,"Bar ",PINT,068502 ,2022-01-01 14:02:16,$6.00    ,1.0     ,$0.00     ,$0.00    ,$6.00      ,$6.00                ,$0.36       ,$0.00     ,            ,       ,         ,             ,"Smith, Kathy",    ,

const importData = async (req, res, next) => {
    if (!req.body.fileName || !req.body.fileData) {
        console.log('Error: no file found');
        return res.json({message: 'Error: no file found'});
    }

    console.log(`POST new spreadsheet ${JSON.stringify(req.body.fileName)}`);

    const newStr = req.body.fileData.replaceAll('\\"', '').slice(1, -1);
    const lines = newStr.split('\\n');

    for (let i = 1; i < lines.length; i++) {
        const rows = lines[i].replaceAll('$', '').replace('(', '').replace(')', '').split(',');
        if ((rows.length > 10) && (rows[0] !== 'DESCRIPTION') && (rows[0] !== 'TOTAL')) {
            const newRecord = new PurchasedItems({
                name: rows[0],
                venue: rows[2],
                size: rows[3],
                checkNum: rows[4],
                time: new Date(rows[5]),
                price: rows[6],
                quantity: rows[7],
                employee: rows[19].replaceAll(' ', '') + " " + rows[18]
            });

            newRecord.save((err, result) => {
                if (err) {
                    console.log(`err = ${JSON.stringify(err)}`);
                } else {
                    //console.log(`result = ${JSON.stringify(result)}`);
                }
            });
        }
    }

    console.log('Done importing data');
    return res.json({message: 'Imported data'});
};


module.exports = importData;


