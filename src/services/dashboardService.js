import { apiClient, API_ENDPOINTS } from '../utils/api';

export class DashboardService {
  // Get dashboard statistics
  static async getDashboardStats() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DASHBOARD_STATS);
      
      // Handle different response formats
      if (response && response.data) {
        return response.data;
      } else if (response && typeof response === 'object') {
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Fallback to mock data if backend is not available
      return {
        towers: 3,
        unsoldApartments: 0,
        apartments: 4,
        owners: 3,
        tenants: 1,
        maintenanceDues: 12
      };
    }
  }

  // Get today's bookings
  static async getTodaysBookings() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TODAYS_BOOKINGS);
      return response;
    } catch (error) {
      console.error('Error fetching today\'s bookings:', error);
      // Fallback to mock data if backend is not available
      return [
        {
          id: 1,
          amenity: 'Swimming Pool',
          user: 'Bernadine Keeling',
          time: '02:00 PM',
          duration: '40 min'
        },
        {
          id: 2,
          amenity: 'Swimming Pool',
          user: 'Bernadine Keeling',
          time: '02:40 PM',
          duration: '40 min'
        },
        {
          id: 3,
          amenity: 'Gym',
          user: 'Bernadine Keeling',
          time: '05:00 PM',
          duration: '20 min'
        }
      ];
    }
  }

  // Get pending rent payments
  static async getPendingPayments() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PENDING_PAYMENTS);
      return response;
    } catch (error) {
      console.error('Error fetching pending payments:', error);
      // Fallback to mock data if backend is not available
      return [
        {
          id: 1,
          apartment: '103 Nathaniel Hoppe',
          year: '2025',
          amount: '₹2,998.02',
          status: 'Unpaid'
        },
        {
          id: 2,
          apartment: '103 Nathaniel Hoppe',
          year: '2025',
          amount: '₹2,998.02',
          status: 'Unpaid'
        }
      ];
    }
  }

  // Get open tickets
  static async getOpenTickets() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.OPEN_TICKETS);
      return response;
    } catch (error) {
      console.error('Error fetching open tickets:', error);
      // Fallback to mock data if backend is not available
      return [
        {
          id: '11786674',
          resident: 'Zoe Hill',
          assigned: 'Leora Ward',
          status: 'Open'
        }
      ];
    }
  }

  // Get utility bills due
  static async getUtilityBillsDue() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.UTILITY_BILLS_DUE);
      return response;
    } catch (error) {
      console.error('Error fetching utility bills due:', error);
      // Fallback to mock data if backend is not available
      return [
        {
          id: 1,
          bill: '101 Water Bill',
          date: '10 February 2025',
          amount: '₹300.00',
          status: 'Unpaid'
        }
      ];
    }
  }

  // Get all dashboard data
  static async getAllDashboardData() {
    try {
      const [stats, bookings, payments, tickets, bills] = await Promise.allSettled([
        this.getDashboardStats(),
        this.getTodaysBookings(),
        this.getPendingPayments(),
        this.getOpenTickets(),
        this.getUtilityBillsDue()
      ]);

      return {
        stats: stats.status === 'fulfilled' ? stats.value : {},
        bookings: bookings.status === 'fulfilled' ? bookings.value : [],
        payments: payments.status === 'fulfilled' ? payments.value : [],
        tickets: tickets.status === 'fulfilled' ? tickets.value : [],
        bills: bills.status === 'fulfilled' ? bills.value : []
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Return empty data structure instead of throwing
      return {
        stats: {},
        bookings: [],
        payments: [],
        tickets: [],
        bills: []
      };
    }
  }
}

export default DashboardService;
