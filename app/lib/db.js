/*
 * @Author: lijianzhang
 * @Date: 2017-04-12 23:19:44
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:49:25
 * flow
 */

import mongorito from 'mongorito';
import config from '../config';

mongorito.connect(config.dbUri);
