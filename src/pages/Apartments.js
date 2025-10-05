import React, { useState, useEffect } from 'react';
import { Building, Plus, Search, Edit, Trash2, Filter, Home } from 'lucide-react';
import { safeArrayLength, safeMap } from '../utils/helpers';
import ApartmentService from '../services/apartmentService';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApartment, setNewApartment] = useState({
    apartmentNumber: '',
    block: '',
    floor: '',
    type: '',
    area: '',
    status: 'VACANT',
    owner: '',
    tenant: ''
  });

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApartmentService.getApartments();
      setApartments(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error('Apartments error:', err);
      setError('Failed to load apartments. Please try again.');
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddApartment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await ApartmentService.createApartment(newApartment);
      if (response) {
        setApartments([...apartments, response]);
        setShowAddModal(false);
        setNewApartment({
          apartmentNumber: '',
          block: '',
          floor: '',
          type: '',
          area: '',
          status: 'VACANT',
          owner: '',
          tenant: ''
        });
      }
    } catch (err) {
      console.error('Error adding apartment:', err);
      setError('Failed to add apartment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApartment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredApartments = safeArrayLength(apartments) > 0 ? apartments.filter(apartment => {
    if (!apartment) return false;
    
    const matchesSearch = apartment.apartmentNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apartment.block?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apartment.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apartment.tenant?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || apartment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }) : [];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading apartments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchApartments}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Apartments Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add Apartment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-container">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search apartments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={20} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="VACANT">Vacant</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Apartments Grid */}
      <div className="apartments-grid">
        {safeMap(filteredApartments, (apartment) => (
          <div key={apartment.id} className="apartment-card">
            <div className="apartment-header">
              <div className="apartment-icon">
                <Home size={24} />
              </div>
              <div className="apartment-info">
                <h3>Apartment {apartment.apartmentNumber}</h3>
                <p>Block {apartment.block} • Floor {apartment.floor}</p>
              </div>
              <span className={`status-badge status-${apartment.status.toLowerCase()}`}>
                {apartment.status}
              </span>
            </div>
            
            <div className="apartment-details">
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{apartment.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Area:</span>
                <span className="detail-value">{apartment.area}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Owner:</span>
                <span className="detail-value">{apartment.owner}</span>
              </div>
              {apartment.tenant && (
                <div className="detail-row">
                  <span className="detail-label">Tenant:</span>
                  <span className="detail-value">{apartment.tenant}</span>
                </div>
              )}
            </div>

            <div className="apartment-actions">
              <button className="btn-icon" title="Edit">
                <Edit size={16} />
              </button>
              <button className="btn-icon btn-danger" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredApartments.length === 0 && (
        <div className="no-data">
          <Building size={48} />
          <h3>No apartments found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add Apartment Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Apartment</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddApartment} className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="apartmentNumber">Apartment Number</label>
                  <input
                    type="text"
                    id="apartmentNumber"
                    name="apartmentNumber"
                    value={newApartment.apartmentNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="block">Block</label>
                  <input
                    type="text"
                    id="block"
                    name="block"
                    value={newApartment.block}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="floor">Floor</label>
                  <input
                    type="number"
                    id="floor"
                    name="floor"
                    value={newApartment.floor}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    name="type"
                    value={newApartment.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="4BHK">4BHK</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="area">Area (sq ft)</label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={newApartment.area}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={newApartment.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="VACANT">Vacant</option>
                    <option value="OCCUPIED">Occupied</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="owner">Owner</label>
                  <input
                    type="text"
                    id="owner"
                    name="owner"
                    value={newApartment.owner}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tenant">Tenant</label>
                  <input
                    type="text"
                    id="tenant"
                    name="tenant"
                    value={newApartment.tenant}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Apartment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apartments;
