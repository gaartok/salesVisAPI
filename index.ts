require('dotenv').config();
import express from "express";
const fileUpload = require('express-fileupload');
import mongoose from 'mongoose';
const routes = require('./routes/sales-vis');

const app = express();
const port = process.env.PORT || 8080;

app.use(fileUpload({ createParentPath: true }));
app.use('/', routes);

mongoose.connect(process.env.MONGODB_URI)
.catch(error => { console.log(`error = ${JSON.stringify(error)}`); })
.then(result => { 
    //console.log(`mongooseClient = ${JSON.stringify(mongooseClient, circularReplacer())}`);
});

const listener = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
