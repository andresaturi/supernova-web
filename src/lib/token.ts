const ACCESS = "access_token";
const REFRESH = "refresh_token";

export const tokenStorage = {
  getAccess() {
    return localStorage.getItem(ACCESS);
  },

  getRefresh() {
    return localStorage.getItem(REFRESH);
  },

  set(access: string, refresh: string) {
    localStorage.setItem(ACCESS, access);
    localStorage.setItem(REFRESH, refresh);
  },

  updateAccess(access: string) {
    localStorage.setItem(ACCESS, access);
  },

  clear() {
    console.trace("tokenStorage.clear()");
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
  },
};