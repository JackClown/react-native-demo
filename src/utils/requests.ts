import Axios from 'axios';
import fetchAdapter from './fetchAdapter';

export const request = Axios.create({
  baseURL: 'http://192.168.4.74:8080',
  adapter: fetchAdapter
});
