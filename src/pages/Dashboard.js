import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Wrench, 
  Calendar, 
  Clock, 
  CheckSquare, 
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardService from '../services/dashboardService';
import { safeArrayLength, safeMap, safeReduce, parseCurrency, formatCurrency } from '../utils/helpers';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    bookings: [],
    payments: [],
    tickets: [],
    bills: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await DashboardService.getAllDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => {
            setError(null);
            setLoading(true);
            // Retry fetching data
            DashboardService.getAllDashboardData()
              .then(data => {
                setDashboardData(data);
                setLoading(false);
              })
              .catch(err => {
                console.error('Retry failed:', err);
                setError('Failed to load dashboard data. Please try again.');
                setLoading(false);
              });
          }}>Retry</button>
        </div>
      </div>
    );
  }

  const { stats, bookings, payments, tickets, bills } = dashboardData;

  // Helper function to safely get values from stats object
  const getStatValue = (keys) => {
    if (!stats) return '0';
    
    for (const key of keys) {
      if (stats[key] !== undefined && stats[key] !== null) {
        return stats[key].toString();
      }
    }
    return '0';
  };

  const summaryData = [
    { 
      icon: Home, 
      title: 'Tower', 
      value: getStatValue(['towers', 'towerCount', 'totalTowers'])
    },
    { 
      icon: Home, 
      title: 'Unsold Apartments', 
      value: getStatValue(['unsoldApartments', 'unsoldCount', 'vacantApartments'])
    },
    { 
      icon: Home, 
      title: 'Apartments', 
      value: getStatValue(['apartments', 'apartmentCount', 'totalApartments'])
    },
    { 
      icon: User, 
      title: 'Owner', 
      value: getStatValue(['owners', 'ownerCount', 'totalOwners'])
    },
    { 
      icon: User, 
      title: 'Tenant', 
      value: getStatValue(['tenants', 'tenantCount', 'totalTenants'])
    },
    { 
      icon: Wrench, 
      title: 'Maintenance Dues', 
      value: getStatValue(['maintenanceDues', 'maintenanceCount', 'totalMaintenance'])
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        {user && (
          <div className="user-welcome">
            <p>Welcome, {user.firstName || user.username || 'User'}!</p>
            {user.role && <span className="user-role">{user.role}</span>}
          </div>
        )}
      </div>
      
      {/* Summary Cards */}
      <div className="summary-grid">
        {summaryData.map((item, index) => (
          <div key={index} className="summary-card">
            <div className="summary-icon">
              <item.icon size={24} />
            </div>
            <div className="summary-content">
              <h3>{item.title}</h3>
              <div className="value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>


      {/* Content Grid */}
      <div className="content-grid">
        {/* Today's Bookings */}
        <div className="section">
          <div className="section-header">
            <div>
              <h3 className="section-title">Today's Bookings</h3>
              <p className="section-subtitle">Wednesday, 12 Feb 2025</p>
            </div>
          </div>
          <div className="section-content">
            {safeArrayLength(bookings) > 0 ? safeMap(bookings, (booking) => (
              <div key={booking.id} className="list-item">
                <div className="list-icon">
                  <Calendar size={20} />
                </div>
                <div className="list-content">
                  <div className="list-title">{booking.amenity}</div>
                  <div className="list-subtitle">{booking.user}</div>
                  <div className="list-time">
                    <Clock size={12} />
                    {booking.time} • {booking.duration}
                  </div>
                </div>
              </div>
            )) : (
              <div className="no-data">No bookings for today</div>
            )}
          </div>
        </div>

        {/* Rent Payments Due */}
        <div className="section">
          <div className="section-header">
            <div>
              <h3 className="section-title">Rent Payments Due</h3>
              <p className="section-subtitle">Wednesday, 12 Feb 2025</p>
            </div>
            <span className="section-badge badge-red">{safeArrayLength(payments)} Pending</span>
          </div>
          <div className="section-content">
            {safeArrayLength(payments) > 0 ? safeMap(payments, (payment) => (
              <div key={payment.id} className="list-item">
                <div className="list-icon">
                  <CheckSquare size={20} />
                </div>
                <div className="list-content">
                  <div className="list-title">{payment.apartment}</div>
                  <div className="list-subtitle">{payment.year}</div>
                </div>
                <div className="list-amount">{payment.amount}</div>
                <span className="section-badge badge-red" style={{ marginLeft: '10px' }}>
                  {payment.status}
                </span>
              </div>
            )) : (
              <div className="no-data">No pending payments</div>
            )}
          </div>
        </div>

        {/* Open and Pending Tickets */}
        <div className="section">
          <div className="section-header">
            <div>
              <h3 className="section-title">Open and Pending Tickets</h3>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="section-badge badge-yellow">0 Pending</span>
              <span className="section-badge badge-red">{safeArrayLength(tickets)} Open</span>
            </div>
          </div>
          <div className="section-content">
            {safeArrayLength(tickets) > 0 ? safeMap(tickets, (ticket) => (
              <div key={ticket.id} className="list-item">
                <div className="list-icon">
                  <CheckSquare size={20} />
                </div>
                <div className="list-content">
                  <div className="list-title">{ticket.id}</div>
                  <div className="list-subtitle">{ticket.resident}</div>
                  <div className="list-subtitle">
                    <User size={12} style={{ marginRight: '4px' }} />
                    {ticket.assigned}
                  </div>
                </div>
                <span className="section-badge badge-red">
                  {ticket.status}
                </span>
              </div>
            )) : (
              <div className="no-data">No open tickets</div>
            )}
          </div>
        </div>

        {/* Utility Bills Payments Due */}
        <div className="section">
          <div className="section-header">
            <div>
              <h3 className="section-title">Utility Bills Payments Due</h3>
            </div>
            <span className="section-badge badge-red">{formatCurrency(safeReduce(bills, (total, bill) => total + parseCurrency(bill.amount), 0))} Total Due</span>
          </div>
          <div className="section-content">
            {safeArrayLength(bills) > 0 ? safeMap(bills, (bill) => (
              <div key={bill.id} className="list-item">
                <div className="list-icon">
                  <FileText size={20} />
                </div>
                <div className="list-content">
                  <div className="list-title">{bill.bill}</div>
                  <div className="list-subtitle">{bill.date}</div>
                </div>
                <div className="list-amount">{bill.amount}</div>
                <span className="section-badge badge-red" style={{ marginLeft: '10px' }}>
                  {bill.status}
                </span>
              </div>
            )) : (
              <div className="no-data">No utility bills due</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
