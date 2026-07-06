import React, { memo } from 'react';
import { Navigation, Train, Utensils } from 'lucide-react';
import PropTypes from 'prop-types';
import './FanCards.css';

/**
 * Fan Information Cards Component
 * @returns {JSX.Element}
 */
const FanCards = memo(() => {
  return (
    <div className="fan-cards">
      <div className="glass-panel fan-card">
        <div className="fan-card-header">
          <Utensils size={20} color="var(--accent-teal)" />
          <h4>Food Recommendations</h4>
        </div>
        <p>Shortest queue: <strong>Gate 4 Burgers</strong> (5 min wait)</p>
      </div>

      <div className="glass-panel fan-card">
        <div className="fan-card-header">
          <Navigation size={20} color="var(--accent-magenta)" />
          <h4>Smart Navigation</h4>
        </div>
        <p>Your seat (Sec 104) is 4 mins away. Use the West concourse to avoid crowds.</p>
      </div>

      <div className="glass-panel fan-card">
        <div className="fan-card-header">
          <Train size={20} color="#00ffaa" />
          <h4>Transit Update</h4>
        </div>
        <p>Blue line trains departing every 3 mins post-match.</p>
      </div>
    </div>
  );
});

FanCards.displayName = 'FanCards';
FanCards.propTypes = {};

export default FanCards;
