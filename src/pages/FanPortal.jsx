import React, { memo } from 'react';
import ChatWidget from '../components/fan/ChatWidget';
import FanCards from '../components/fan/FanCards';
import './FanPortal.css';

/**
 * Fan Portal Page Component
 * @returns {JSX.Element}
 */
const FanPortal = memo(() => {
  return (
    <div className="fan-portal-container">
      <div className="fan-sidebar">
        <FanCards />
      </div>
      <div className="fan-main">
        <ChatWidget />
      </div>
    </div>
  );
});

FanPortal.displayName = 'FanPortal';

export default FanPortal;
