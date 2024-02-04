// apiService.js
import api from './apiConfig';

export default {
  autoComplete(data:object) {
    return api.get('/stays/auto-complete', { params: data });
  }
}
