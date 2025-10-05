import React from 'react';
import { Globe, Moon, Calendar, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'EEEE, d MMM, h:mm a');

  const handleLogout = () => {
    logout();
  };

  const getUserInitials = (user) => {
    if (!user) return 'U';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';
  };

  return (
    <div className="header">
      <div></div>
      <div className="header-right">
        <Globe size={20} color="#6c757d" />
        <span style={{ fontSize: '14px', color: '#6c757d' }}>en</span>
        
        <Moon size={20} color="#6c757d" />
        
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: '#2c3e50', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {getUserInitials(user)}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={16} color="#6c757d" />
          <span style={{ fontSize: '14px', color: '#6c757d' }}>
            {formattedDate}
          </span>
        </div>

        <button 
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#6c757d',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
};

export default Header;
