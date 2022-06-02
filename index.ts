require('dotenv').config();
import express from "express";
import mongoose from 'mongoose';
const routes = require('./routes/sales-vis');
//import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

/*
// Use with JSON.stringify to handle circular objects:
// const jsonString = JSON.stringify(object, circularReplacer());
const circularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
    if (typeof(value) === "object" && value !== null) {
        if (seen.has(value)) return;
        seen.add(value);
    }
    return value;
    };
};
*/


/*
const corsOptions = {
    origin: `http://localhost:8081`
  };

app.use(cors(corsOptions));
*/

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());
app.use('./uploads', express.static('./uploads'));
app.use('/', routes);

mongoose.connect(process.env.MONGODB_URI)
.catch(error => { console.log(`error = ${JSON.stringify(error)}`); })
.then(result => { 
    //console.log(`mongooseClient = ${JSON.stringify(mongooseClient, circularReplacer())}`);
});


const listener = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
