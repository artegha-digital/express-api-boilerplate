import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'

import passportManager from '@middlewares/passport'
import router from '@routes'

import config from '@config/config'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(passportManager.initialize());

app.use('/', router);

// Basic CORS with custom token header support
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, " + config.tokenHeader);
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

console.log('Build Finished without error !');
console.log('Trying to connect to MongoDB...');

// mongoose.connect(config.database, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// })
// .then(() => console.log("MongoDB connected !"))
// .catch(err => console.log(err));

module.exports = app;
