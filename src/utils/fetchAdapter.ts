import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { timeout } from '@/utils';

const buildFullPath = require('axios/lib/core/buildFullPath');
const buildURL = require('axios/lib/helpers/buildURL');

export default async function fetchAdapter(config: AxiosRequestConfig) {
  const fullPath = buildFullPath(config.baseURL, config.url);
  const url = buildURL(fullPath, config.params, config.paramsSerializer);

  const options: { [key: string]: any } = {
    method: config.method,
    headers: config.headers,
    body: config.data
  };

  try {
    const res = await timeout(fetch(url, options), config.timeout, '网络请求超时');
    const data = await res.text();
    const headers: { [key: string]: any } = {};

    for (let header of res.headers as any) {
      headers[header[0]] = header[1];
    }

    const response: AxiosResponse = {
      data,
      status: res.status,
      statusText: res.statusText,
      headers,
      config,
      request: fetch
    };

    const { validateStatus } = config;

    if (!validateStatus || validateStatus(response.status)) {
      return response;
    } else {
      const error = new Error(
        typeof response.data === 'string' ? response.data : '系统异常，状态：' + response.status
      ) as AxiosError;

      error.config = config;
      error.request = response.request;
      error.response = response;

      return Promise.reject(error);
    }
  } catch (err) {
    const error = new Error(err.message) as AxiosError;

    error.config = config;
    error.request = fetch;

    return Promise.reject(error);
  }
}
