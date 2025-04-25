import axios from "axios";

const url: Record<string, string> = {
  development: import.meta.env.VITE_DEVELOPMENT_URL,
  production: import.meta.env.VITE_PRODUCTION_URL,
};

const createServer = axios.create({
  baseURL: url?.[import.meta.env.MODE],
  timeout: 10000,
});

/**
 * 请求拦截
*/
createServer.interceptors.request.use((request) => {
  return request.data;
});

/**
 * 响应拦截
*/
createServer.interceptors.response.use((response) => {
  return response.data;
});