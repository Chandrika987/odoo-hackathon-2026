import { NavLink } from 'react-router-dom';
import { Compass, LayoutDashboard, Map, Wallet, CheckSquare, Book, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Traveler';
  const initial = userName.charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Compass className="logo-icon" size={28} />
        <h2>TravelLoop</h2>
      </div>
      
      <div style={{ padding: '0 1.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
        MAIN MENU
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/my-trips" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Map size={20} />
          <span>My Trips</span>
        </NavLink>

        <NavLink to="/discover" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Compass size={20} />
          <span>Discover</span>
        </NavLink>

        <NavLink to="/budget" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Wallet size={20} />
          <span>Budget Analytics</span>
        </NavLink>

        <NavLink to="/packing" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <CheckSquare size={20} />
          <span>Packing Checklist</span>
        </NavLink>

        <NavLink to="/journal" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Book size={20} />
          <span>Journal / Notes</span>
        </NavLink>

        <NavLink to="/shared" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} />
          <span>Shared Trips</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile" style={{ marginBottom: '1rem' }}>
          <div className="avatar">{initial}</div>
          <div className="user-info">
            <span className="user-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>{userName}</span>
            <span className="user-role">Explorer</span>
          </div>
        </div>
        <button onClick={logout} className="nav-item" style={{ color: '#ef4444', width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', fontFamily: 'inherit' }}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
