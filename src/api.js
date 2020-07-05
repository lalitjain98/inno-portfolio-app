import axios from 'axios';
import { API_HOSTNAME } from './constants';

const api = (endpoint = '', method = 'GET', data = null, params = null) => new Promise((resolve, reject) => {
  try {
    const headers = {};
    
    axios.interceptors.request.use((request) => {
      console.log('Starting Request', request);
      return request;
    });
    axios.interceptors.response.use((response) => {
      console.log('Response:', response);
      return response;
    });
    
    return axios({
      url: API_HOSTNAME + endpoint,
      method,
      data,
      params,
      headers,
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  } catch (e) {
    reject(e);
  }
});

export default api;
