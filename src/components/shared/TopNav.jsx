import React from 'react';
import { useData } from '../../data/DataContext';
import { Activity, MessageSquare } from 'lucide-react';
import './TopNav.css';

const TopNav = ({ activeTab, setActiveTab }) => {
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
};

export default TopNav;
