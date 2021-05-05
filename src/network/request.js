import axios from "axios";

export function request(baseURL, config) {
  const instance = axios.create({
    baseURL,
    timeout: 30000
  });

  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      return err;
    }
  );

  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    err => {
      throw err;
    }
  );

  return instance(config);
}
