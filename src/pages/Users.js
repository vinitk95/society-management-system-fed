import React, { useState, useEffect } from 'react';
import { User, Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import UserService from '../services/userService';
import { safeArrayLength, safeMap } from '../utils/helpers';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await UserService.getUsers();
      setUsers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error('Users error:', err);
      setError('Failed to load users. Please try again.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = safeArrayLength(users) > 0 ? users.filter(user => {
    if (!user) return false;
    
    const matchesSearch = user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  }) : [];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchUsers}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Users Management</h1>
        <button className="btn-primary">
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-container">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={20} />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="RESIDENT">Resident</option>
            <option value="TENANT">Tenant</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeMap(filteredUsers, (user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="user-name">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="user-username">@{user.username}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone || 'N/A'}</td>
                <td>
                  <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className="status-badge status-active">Active</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="btn-icon btn-danger" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-data">
          <User size={48} />
          <h3>No users found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Users;
