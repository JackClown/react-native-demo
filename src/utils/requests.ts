import Axios from 'axios';
import fetchAdapter from './fetchAdapter';

export const request = Axios.create({
  baseURL: 'http://localhost:8080',
  adapter: fetchAdapter
});
