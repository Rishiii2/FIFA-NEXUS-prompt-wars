import React, { memo } from 'react';
import KpiCards from '../components/staff/KpiCards';
import HeatmapGrid from '../components/staff/HeatmapGrid';
import AlertFeed from '../components/staff/AlertFeed';
import CrowdFlowChart from '../components/staff/CrowdFlowChart';
import './Dashboard.css';

/**
 * Staff Dashboard Page Component
 * @returns {JSX.Element}
 */
const Dashboard = memo(() => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="neon-text">Operational Intelligence</h2>
        <p>Real-time stadium analytics and AI-driven predictive insights.</p>
      </div>
      <KpiCards />
      <div className="dashboard-grid">
        <div className="main-panel">
          <HeatmapGrid />
          <CrowdFlowChart />
        </div>
        <div className="side-panel">
          <AlertFeed />
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
