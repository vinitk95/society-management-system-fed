import { apiClient, API_ENDPOINTS } from '../utils/api';

export class UserService {
  // Get all users
  static async getUsers() {
    try {
      return await apiClient.get(API_ENDPOINTS.USERS);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Return empty array instead of throwing error
      return [];
    }
  }

  // Get user by ID
  static async getUserById(id) {
    try {
      return await apiClient.get(API_ENDPOINTS.USER_DETAILS(id));
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Get users by role
  static async getUsersByRole(role) {
    try {
      return await apiClient.get(API_ENDPOINTS.USERS_BY_ROLE(role));
    } catch (error) {
      console.error('Error fetching users by role:', error);
      return [];
    }
  }

  // Create user
  static async createUser(userData) {
    try {
      return await apiClient.post(API_ENDPOINTS.USERS, userData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(id, userData) {
    try {
      return await apiClient.put(API_ENDPOINTS.USER_DETAILS(id), userData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(id) {
    try {
      return await apiClient.delete(API_ENDPOINTS.USER_DETAILS(id));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Get residents (owners and tenants)
  static async getResidents() {
    try {
      const [owners, tenants] = await Promise.all([
        this.getUsersByRole('RESIDENT').catch(() => []),
        this.getUsersByRole('RESIDENT').catch(() => [])
      ]);
      
      return {
        owners: owners.filter(user => user.role === 'ADMIN' || user.role === 'RESIDENT'),
        tenants: tenants.filter(user => user.role === 'RESIDENT')
      };
    } catch (error) {
      console.error('Error fetching residents:', error);
      throw error;
    }
  }
}

export default UserService;
