import Axios from 'axios';
import fetchAdapter from './fetchAdapter';

export const request = Axios.create({
  baseURL: 'http://192.168.4.97:8080',
  adapter: fetchAdapter
});
