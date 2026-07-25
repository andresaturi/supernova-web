import axios from "axios";

import { tokenStorage } from "@/lib/token";
import { refresh } from "@/features/auth/api/refresh";
import { logout } from "@/lib/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = tokenStorage.getRefresh();

      if (!refreshToken) {
        console.log('limpei pela falta de refresh token')
        tokenStorage.clear();
        window.location.href = "/login";

        return Promise.reject(error);
      }

      const { access } = await refresh(refreshToken);

      tokenStorage.updateAccess(access);

      originalRequest.headers.Authorization = `Bearer ${access}`;

      return api(originalRequest);

    } catch (err) {
      tokenStorage.clear();

      logout();

      return Promise.reject(err);
    }
  }
);