/*
 * @Author: lijianzhang 
 * @Date: 2017-04-12 23:19:44 
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-13 18:50:44
 */

// import mongoose from 'mongoose';
// import config from '../config';

// mongoose.connect(config.dbUri);

// const db = mongoose.connection;
// db.on('error', err => console.error(err));
// db.on('open', () => console.log('open the mongodb'));

import mongorito from 'mongorito';
import config from '../config';

mongorito.connect(config.dbUri);
