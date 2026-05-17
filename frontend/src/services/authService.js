import { authApi } from '../api/endpoints';
import { getErrorMessage } from '../utils/helpers';

export const AuthService = {
  async register(email, password, username) {
    try {
      const response = await authApi.register({ email, password, username });
      const user = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { user, token };
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async login(email, password) {
    try {
      const response = await authApi.login({ email, password });
      const user = response.data;

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async logout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('user');
  },

  getAuthToken() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user)?.id : null;
  },
};
