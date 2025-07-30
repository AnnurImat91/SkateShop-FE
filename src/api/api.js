import axios from 'axios';

const api = axios.create({
  baseURL: 'https://web-production-a47b4.up.railway.app/',
   headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
