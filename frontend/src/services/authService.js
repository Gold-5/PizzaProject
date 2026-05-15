import { authApi } from '../api/endpoints';
import { getErrorMessage } from '../utils/helpers';

export const AuthService = {
  async register(email, password, name) {
    try {
      const response = await authApi.register({ email, password, name });
      const { token, user } = response.data;

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
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { user, token };
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
    return !!localStorage.getItem('authToken');
  },

  getAuthToken() {
    return localStorage.getItem('authToken');
  },
};
