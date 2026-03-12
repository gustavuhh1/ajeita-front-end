import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request (ex: adicionar token futuramente)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor de response (trata erros globalmente)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error("Recurso não encontrado");
    }
    if (error.response?.status === 500) {
      console.error("Erro interno do servidor");
    }
    return Promise.reject(error);
  },
);

export default api;
