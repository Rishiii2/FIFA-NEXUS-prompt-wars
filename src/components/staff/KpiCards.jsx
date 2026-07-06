import React from 'react';
import { useData } from '../../data/DataContext';
import { Users, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import './KpiCards.css';

const KpiCards = () => {
  const { capacity, waitTimes } = useData();

  const cards = [
    { title: 'Stadium Capacity', value: `${capacity}%`, icon: <Users size={24} color="var(--accent-teal)" />, trend: '+2% from avg' },
    { title: 'Avg Wait (Food)', value: `${waitTimes.food} min`, icon: <Clock size={24} color="#ffaa00" />, trend: 'Peak Time' },
    { title: 'Avg Wait (Restroom)', value: `${waitTimes.restroom} min`, icon: <Clock size={24} color="#00ffaa" />, trend: 'Normal' },
    { title: 'Active Incidents', value: '2', icon: <AlertTriangle size={24} color="var(--accent-magenta)" />, trend: 'Requires Attention' },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, idx) => (
        <div key={idx} className="kpi-card glass-panel">
          <div className="kpi-icon">{card.icon}</div>
          <div className="kpi-info">
            <h4>{card.title}</h4>
            <div className="kpi-value">{card.value}</div>
            <div className="kpi-trend"><TrendingUp size={14}/> {card.trend}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
