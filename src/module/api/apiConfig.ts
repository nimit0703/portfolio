import axios from 'axios';

const apiConfig = {
  baseURL: 'https://booking-com13.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '61641f4642mshf1a3f4928049c87p1d3c64jsnc4fb4a400bf5',
    'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
  }
};

const apiInstance = axios.create(apiConfig);

export default apiInstance;
