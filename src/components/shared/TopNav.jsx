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
      
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          <Activity size={18} />
          <span>Staff Dashboard</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'fan' ? 'active' : ''}`}
          onClick={() => setActiveTab('fan')}
        >
          <MessageSquare size={18} />
          <span>Fan Portal</span>
        </button>
      </div>

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
