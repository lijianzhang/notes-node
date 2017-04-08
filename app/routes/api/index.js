import V1 from './v1';
import Blueprint from '../../lib/blueprint';

const api = Blueprint('api');
api.use(V1.routes());

export default api;
