import React from 'react';
import { useData } from '../../data/DataContext';
import { ShieldAlert, Info, Zap } from 'lucide-react';
import './AlertFeed.css';

const AlertFeed = () => {
  const { alerts } = useData();

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <ShieldAlert size={18} color="var(--accent-magenta)" />;
      case 'success': return <Zap size={18} color="var(--accent-teal)" />;
      default: return <Info size={18} color="var(--text-secondary)" />;
    }
  };

  return (
    <div className="alert-feed glass-panel">
      <h3>GenAI Live Alerts</h3>
      <div className="alert-list">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-item ${alert.type}`}>
            <div className="alert-icon">{getIcon(alert.type)}</div>
            <div className="alert-content">
              <p>{alert.text}</p>
              {alert.reasoningTrace && (
                <details className="reasoning-trace">
                  <summary>View Agent Reasoning</summary>
                  <p>{alert.reasoningTrace}</p>
                </details>
              )}
              <span className="alert-time">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertFeed;
