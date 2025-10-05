import { apiClient, API_ENDPOINTS } from '../utils/api';

export class ApartmentService {
  // Get all apartments
  static async getApartments() {
    try {
      return await apiClient.get(API_ENDPOINTS.APARTMENTS);
    } catch (error) {
      console.error('Error fetching apartments:', error);
      // Return empty array instead of throwing error
      return [];
    }
  }

  // Get apartment by ID
  static async getApartmentById(id) {
    try {
      return await apiClient.get(API_ENDPOINTS.APARTMENT_DETAILS(id));
    } catch (error) {
      console.error('Error fetching apartment:', error);
      return null;
    }
  }

  // Get apartments by block
  static async getApartmentsByBlock(block) {
    try {
      return await apiClient.get(API_ENDPOINTS.APARTMENTS_BY_BLOCK(block));
    } catch (error) {
      console.error('Error fetching apartments by block:', error);
      return [];
    }
  }

  // Get apartments by status
  static async getApartmentsByStatus(status) {
    try {
      return await apiClient.get(API_ENDPOINTS.APARTMENTS_BY_STATUS(status));
    } catch (error) {
      console.error('Error fetching apartments by status:', error);
      return [];
    }
  }

  // Create apartment
  static async createApartment(apartmentData) {
    try {
      return await apiClient.post(API_ENDPOINTS.APARTMENTS, apartmentData);
    } catch (error) {
      console.error('Error creating apartment:', error);
      throw error;
    }
  }

  // Update apartment
  static async updateApartment(id, apartmentData) {
    try {
      return await apiClient.put(API_ENDPOINTS.APARTMENT_DETAILS(id), apartmentData);
    } catch (error) {
      console.error('Error updating apartment:', error);
      throw error;
    }
  }

  // Delete apartment
  static async deleteApartment(id) {
    try {
      return await apiClient.delete(API_ENDPOINTS.APARTMENT_DETAILS(id));
    } catch (error) {
      console.error('Error deleting apartment:', error);
      throw error;
    }
  }
}

export default ApartmentService;
