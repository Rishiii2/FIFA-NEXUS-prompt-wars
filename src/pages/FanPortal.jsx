import React from 'react';
import ChatWidget from '../components/fan/ChatWidget';
import FanCards from '../components/fan/FanCards';
import './FanPortal.css';

const FanPortal = () => {
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
};

export default FanPortal;
