

import Axios from 'axios';
import LocaleCookie from '@/lib/LocaleCookie';

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  headers: {
    'Accept': 'application/json',
    'Accept-Language': LocaleCookie.getCurrentLocaleCookie(),
    'Content-Type': 'application/json'
  }
});

export default api;
