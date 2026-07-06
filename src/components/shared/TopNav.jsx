import React, { memo } from 'react';
import { useData } from '../../data/DataContext';
import { Activity, MessageSquare } from 'lucide-react';
import PropTypes from 'prop-types';
import './TopNav.css';

/**
 * Top Navigation Component
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active tab ('staff' or 'fan')
 * @param {Function} props.setActiveTab - Function to change active tab
 * @returns {JSX.Element}
 */
const TopNav = memo(({ activeTab, setActiveTab }) => {
  const { capacity } = useData();

  return (
    <header className="top-nav glass-panel">
      <div className="nav-brand">
        <h1 className="neon-text">FIFA NEXUS</h1>
      </div>
      
      <nav className="nav-tabs" aria-label="Main Navigation">
        <button 
          className={`nav-tab ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
          aria-label="Switch to Staff Dashboard"
          aria-pressed={activeTab === 'staff'}
        >
          <Activity size={18} aria-hidden="true" />
          <span>Staff Dashboard</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'fan' ? 'active' : ''}`}
          onClick={() => setActiveTab('fan')}
          aria-label="Switch to Fan Portal"
          aria-pressed={activeTab === 'fan'}
        >
          <MessageSquare size={18} aria-hidden="true" />
          <span>Fan Portal</span>
        </button>
      </nav>

      <div className="nav-status">
        <div className="status-indicator">
          <span className="pulse-dot"></span>
          Match Day: USA vs. ARG - {capacity}% Capacity
        </div>
      </div>
    </header>
  );
});

TopNav.displayName = 'TopNav';
TopNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TopNav;
