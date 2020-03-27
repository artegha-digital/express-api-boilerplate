import express from 'express'
import path from 'path'
import logger from 'morgan'
import helmet from 'helmet'
import formidable from '@middlewares/formidable'
import connect from '@middlewares/sql'
import passport from '@middlewares/passport'
import router from '@routes'

import config from '@config/config'

const app = express();

app.use(logger('dev'));
app.use(formidable());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(passport.initialize());
// app.use(sql.connect());

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


module.exports = app;
