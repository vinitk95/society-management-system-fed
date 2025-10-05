import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Grid, 
  Building, 
  FileText, 
  Mail, 
  List, 
  Wrench, 
  UserCheck, 
  BarChart3, 
  Settings,
  ChevronLeft
} from 'lucide-react';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'apartments', label: 'Apartments', icon: Building, path: '/apartments' },
    { id: 'amenities', label: 'Amenities', icon: Grid, path: '/amenities' },
    { id: 'bills', label: 'Bills', icon: FileText, path: '/bills' },
    { id: 'tickets', label: 'Tickets', icon: Mail, path: '/tickets' },
    { id: 'notice', label: 'Notice Board', icon: List, path: '/notices' },
    { id: 'services', label: 'Services', icon: Wrench, path: '/services' },
    { id: 'visitors', label: 'Visitors', icon: UserCheck, path: '/visitors' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>ROYCE Management</h2>}
        <button className="sidebar-toggle" onClick={onToggle}>
          <ChevronLeft size={20} />
        </button>
      </div>
      
      <ul className="nav-menu">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/dashboard' && location.pathname === '/');
          
          return (
            <li key={item.id} className="nav-item">
              <Link 
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <item.icon className="nav-icon" size={20} />
                {!collapsed && (
                  <span className="nav-text">{item.label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
