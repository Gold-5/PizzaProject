import { authApi } from '../api/endpoints';

export const AuthService = {
  async register(username, email, password) {
    const response = await authApi.register({ username, email, password });
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  async login(email, password) {
    const response = await authApi.login({ email, password });
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('user');
  },
};
