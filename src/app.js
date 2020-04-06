import express from 'express'
import path from 'path'
import logger from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'

import passport from '@middlewares/passport'
import formidable from '@middlewares/formidable'
import router from '@routes'

const app = express();

app.use(logger('dev'))
app.use(helmet())
app.use(passport.initialize())
app.use(formidable())

app.use('/', router);

// Basic CORS with custom token header support
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, " + process.env.tokenHeader);
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

console.log('Build Finished without error !');
// console.log('Trying to connect to MongoDB...');
// mongoose.connect(process.env.database, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// })
// .then(() => console.log("MongoDB connected !"))
// .catch(err => console.log(err));

module.exports = app;
