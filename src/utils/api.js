// API configuration for ROYCE Management System
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// API endpoints based on Spring Boot backend
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/signin',
  REGISTER: '/auth/signup',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',

  // Dashboard (to be implemented in backend)
  DASHBOARD_STATS: '/dashboard/stats',
  TODAYS_BOOKINGS: '/dashboard/bookings/today',
  PENDING_PAYMENTS: '/dashboard/payments/pending',
  OPEN_TICKETS: '/dashboard/tickets/open',
  UTILITY_BILLS_DUE: '/dashboard/bills/utility/due',

  // Users
  USERS: '/users',
  USER_DETAILS: (id) => `/users/${id}`,
  USERS_BY_ROLE: (role) => `/users/role/${role}`,

  // Apartments (to be implemented in backend)
  APARTMENTS: '/apartments',
  APARTMENT_DETAILS: (id) => `/apartments/${id}`,
  APARTMENTS_BY_BLOCK: (block) => `/apartments/block/${block}`,
  APARTMENTS_BY_STATUS: (status) => `/apartments/status/${status}`,

  // Amenities (to be implemented in backend)
  AMENITIES: '/amenities',
  AMENITY_DETAILS: (id) => `/amenities/${id}`,
  AMENITY_BOOKINGS: '/amenity-bookings',
  BOOK_AMENITY: '/amenity-bookings',
  AMENITY_AVAILABILITY: (id) => `/amenities/${id}/availability`,

  // Billing (to be implemented in backend)
  BILLINGS: '/billings',
  BILLING_DETAILS: (id) => `/billings/${id}`,
  BILLINGS_BY_USER: (userId) => `/billings/user/${userId}`,
  BILLINGS_BY_APARTMENT: (apartmentId) => `/billings/apartment/${apartmentId}`,
  BILLINGS_BY_STATUS: (status) => `/billings/status/${status}`,

  // Maintenance Requests (to be implemented in backend)
  MAINTENANCE_REQUESTS: '/maintenance-requests',
  MAINTENANCE_DETAILS: (id) => `/maintenance-requests/${id}`,
  MAINTENANCE_BY_USER: (userId) => `/maintenance-requests/user/${userId}`,
  MAINTENANCE_BY_STATUS: (status) => `/maintenance-requests/status/${status}`,

  // Notices (to be implemented in backend)
  NOTICES: '/notices',
  NOTICE_DETAILS: (id) => `/notices/${id}`,
  NOTICES_BY_PRIORITY: (priority) => `/notices/priority/${priority}`,

  // Visitors (to be implemented in backend)
  VISITORS: '/visitors',
  VISITOR_DETAILS: (id) => `/visitors/${id}`,
  VISITORS_BY_USER: (userId) => `/visitors/user/${userId}`,
  VISITORS_BY_STATUS: (status) => `/visitors/status/${status}`,

  // Reports (to be implemented in backend)
  REPORTS: '/reports',
  FINANCIAL_REPORT: '/reports/financial',
  MAINTENANCE_REPORT: '/reports/maintenance',
  OCCUPANCY_REPORT: '/reports/occupancy'
};

// API utility functions
export class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response statuses appropriately
      if (response.status === 401) {
        // Unauthorized - clear token and redirect to login
        this.clearToken();
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        throw new Error('Unauthorized - please login again');
      }
      
      if (response.status === 403) {
        throw new Error('Forbidden - insufficient permissions');
      }
      
      if (response.status === 404) {
        throw new Error('Resource not found');
      }
      
      if (response.status >= 500) {
        throw new Error('Server error - please try again later');
      }
      
      if (!response.ok) {
        // Try to get error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        } catch (parseError) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // HTTP methods
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create a default API client instance
export const apiClient = new ApiClient();

// Example usage:
// import { apiClient, API_ENDPOINTS } from './utils/api';
// 
// const fetchDashboardStats = async () => {
//   try {
//     const stats = await apiClient.get(API_ENDPOINTS.DASHBOARD_STATS);
//     return stats;
//   } catch (error) {
//     console.error('Failed to fetch dashboard stats:', error);
//     throw error;
//   }
// };
