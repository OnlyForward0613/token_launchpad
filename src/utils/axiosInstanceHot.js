import axios from 'axios';

const axiosInstanceHot = axios.create({
  baseURL: 'https://api-mainnet.magiceden.dev/v2/marketplace/', // Base URL for your requests
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json' // Set the content type if needed
  }
});

export default axiosInstanceHot;