import React, { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const data = [
  { time: '18:00', historical: 40, predicted: 40 },
  { time: '18:15', historical: 55, predicted: 50 },
  { time: '18:30', historical: 70, predicted: 65 },
  { time: '18:45', historical: 85, predicted: 80 },
  { time: '19:00', historical: 95, predicted: 100 },
  { time: '19:15', historical: null, predicted: 90 },
  { time: '19:30', historical: null, predicted: 70 },
  { time: '19:45', historical: null, predicted: 50 },
];

/**
 * Custom Tooltip for the chart
 * @param {Object} props - Component props
 * @param {boolean} [props.active] - Whether the tooltip is active
 * @param {Array} [props.payload] - The data payload for the tooltip
 * @param {string} [props.label] - The label for the tooltip
 * @returns {JSX.Element|null}
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel" style={{ padding: '0.5rem', border: '1px solid var(--accent-teal)' }}>
        <p className="label">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: '0.8rem', margin: 0 }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string
};

/**
 * Chart component showing crowd density forecast
 * @returns {JSX.Element}
 */
const CrowdFlowChart = memo(() => {
  return (
    <div className="glass-panel" style={{ height: '350px', padding: '1rem', marginTop: '1rem' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        GenAI Crowd Density Forecast (Zones W1-W3)
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-magenta)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--accent-magenta)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-teal)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--accent-teal)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} />
          <YAxis stroke="var(--text-secondary)" fontSize={12} />
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="historical" stroke="var(--accent-magenta)" fillOpacity={1} fill="url(#colorHistorical)" name="Actual Density" />
          <Area type="monotone" dataKey="predicted" stroke="var(--accent-teal)" fillOpacity={1} fill="url(#colorPredicted)" strokeDasharray="5 5" name="Gemini Prediction" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

CrowdFlowChart.displayName = 'CrowdFlowChart';

export default CrowdFlowChart;
