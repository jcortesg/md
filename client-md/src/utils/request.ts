import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3000/api/"

const axiosClient = (token: string | null = null, url: string): AxiosInstance => {
  const headers = token
    ? {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    }
    : {
      "Content-Type": "multipart/form-data",
    };

  const client = axios.create({
    baseURL: `${BASE_URL}${url}`,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("token");
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem("token");
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  return client;
};

export default axiosClient;