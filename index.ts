require('dotenv').config();
import express from "express";
const fileUpload = require('express-fileupload');
import mongoose from 'mongoose';
const routes = require('./routes/sales-vis');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use('/', routes);
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.get('*', function(req, res){
  res.status(404).render('404', { title: '404' });
  res.send('what???');
});

mongoose.connect(process.env.MONGODB_URI)
.catch(error => { console.log(`error = ${JSON.stringify(error)}`); })
.then(result => { 
    //console.log(`mongooseClient = ${JSON.stringify(mongooseClient, circularReplacer())}`);
});

const listener = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
