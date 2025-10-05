import React, { useState, useEffect } from 'react';
import { Grid, Plus, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { safeMap } from '../utils/helpers';

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('amenities');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Mock data for amenities
      const mockAmenities = [
        {
          id: 1,
          name: 'Swimming Pool',
          description: 'Olympic size swimming pool with changing rooms',
          capacity: 20,
          hourlyRate: 500,
          status: 'ACTIVE',
          image: '/api/placeholder/300/200'
        },
        {
          id: 2,
          name: 'Gym',
          description: 'Fully equipped gym with modern equipment',
          capacity: 15,
          hourlyRate: 300,
          status: 'ACTIVE',
          image: '/api/placeholder/300/200'
        },
        {
          id: 3,
          name: 'Conference Room',
          description: 'Large conference room for meetings and events',
          capacity: 50,
          hourlyRate: 1000,
          status: 'ACTIVE',
          image: '/api/placeholder/300/200'
        }
      ];

      // Mock data for bookings
      const mockBookings = [
        {
          id: 1,
          amenity: 'Swimming Pool',
          user: 'John Doe',
          date: '2025-02-15',
          time: '10:00 AM',
          duration: 2,
          status: 'CONFIRMED'
        },
        {
          id: 2,
          amenity: 'Gym',
          user: 'Jane Smith',
          date: '2025-02-15',
          time: '06:00 PM',
          duration: 1,
          status: 'PENDING'
        }
      ];

      setAmenities(mockAmenities);
      setBookings(mockBookings);
    } catch (err) {
      setError('Failed to load amenities data');
      console.error('Amenities error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amenities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchData}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Amenities Management</h1>
        <button className="btn-primary">
          <Plus size={20} />
          Add Amenity
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'amenities' ? 'active' : ''}`}
          onClick={() => setActiveTab('amenities')}
        >
          <Grid size={20} />
          Amenities
        </button>
        <button
          className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          <Calendar size={20} />
          Bookings
        </button>
      </div>

      {/* Amenities Tab */}
      {activeTab === 'amenities' && (
        <div className="amenities-grid">
          {safeMap(amenities, (amenity) => (
            <div key={amenity.id} className="amenity-card">
              <div className="amenity-image">
                <Grid size={48} />
              </div>
              <div className="amenity-content">
                <h3>{amenity.name}</h3>
                <p>{amenity.description}</p>
                <div className="amenity-details">
                  <div className="detail-item">
                    <span className="detail-label">Capacity:</span>
                    <span className="detail-value">{amenity.capacity} people</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Rate:</span>
                    <span className="detail-value">₹{amenity.hourlyRate}/hour</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge status-${amenity.status.toLowerCase()}`}>
                      {amenity.status}
                    </span>
                  </div>
                </div>
                <div className="amenity-actions">
                  <button className="btn-secondary">
                    <Calendar size={16} />
                    Book
                  </button>
                  <button className="btn-icon" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="btn-icon btn-danger" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bookings-container">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Amenity</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {safeMap(bookings, (booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div className="booking-amenity">
                        <Grid size={20} />
                        {booking.amenity}
                      </div>
                    </td>
                    <td>{booking.user}</td>
                    <td>{booking.date}</td>
                    <td>
                      <div className="booking-time">
                        <Clock size={16} />
                        {booking.time}
                      </div>
                    </td>
                    <td>{booking.duration} hour(s)</td>
                    <td>
                      <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="btn-icon btn-danger" title="Cancel">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenities;
