import React from 'react';
import './HeatmapGrid.css';
import { Map, Zap } from 'lucide-react';
import { useData } from '../../data/DataContext';

const HeatmapGrid = () => {
  const { addAlert, zones, setZones } = useData();

  const handleDeployStaff = (zoneId) => {
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, density: Math.max(0, z.density - 30) } : z));
    addAlert(`Action: Staff deployed to Zone ${zoneId}. Crowd density decreasing.`, 'success');
  };

  const getColor = (density) => {
    if (density > 80) return 'var(--accent-magenta)';
    if (density > 60) return '#ffaa00';
    return 'var(--accent-teal)';
  };

  return (
    <div className="heatmap-container glass-panel">
      <div className="heatmap-header">
        <h3><Map size={20} /> Live Stadium Heatmap</h3>
        <span className="live-badge">LIVE</span>
      </div>
      
      <div className="stadium-grid">
        <div className="pitch">PITCH</div>
        {zones.map((zone) => (
          <div 
            key={zone.id} 
            className={`stadium-zone ${zone.density > 80 ? 'pulse' : ''}`}
            style={{ 
              borderColor: getColor(zone.density),
              boxShadow: `inset 0 0 20px ${getColor(zone.density)}40`
            }}
          >
            <div className="zone-label">{zone.id}</div>
            <div className="zone-density" style={{ color: getColor(zone.density) }}>
              {zone.density}%
            </div>
            {zone.density > 80 && (
              <button className="action-btn" onClick={() => handleDeployStaff(zone.id)}>
                <Zap size={14} /> Deploy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatmapGrid;
