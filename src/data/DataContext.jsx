import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { runMultiAgentPipeline } from '../services/gemini';
import PropTypes from 'prop-types';

const DataContext = createContext();

/**
 * Custom hook to use the DataContext
 * @returns {Object} The context value
 */
export const useData = () => useContext(DataContext);

/**
 * Provider component for global state
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const DataProvider = ({ children }) => {
  const [capacity, setCapacity] = useState(87);
  const [alerts, setAlerts] = useState([
    { id: 1, text: "System Online. Monitoring stadium density.", type: "success", time: "Just now", reasoningTrace: null }
  ]);
  const [waitTimes, setWaitTimes] = useState({
    food: 12,
    restroom: 4,
    merch: 8
  });

  const [zones, setZones] = useState([
    { id: 'N1', density: 40 }, { id: 'N2', density: 60 }, { id: 'N3', density: 85 },
    { id: 'E1', density: 30 }, { id: 'E2', density: 45 }, { id: 'E3', density: 50 },
    { id: 'S1', density: 20 }, { id: 'S2', density: 25 }, { id: 'S3', density: 30 },
    { id: 'W1', density: 70 }, { id: 'W2', density: 95 }, { id: 'W3', density: 80 },
  ]);
  
  const zonesRef = useRef(zones);
  
  useEffect(() => {
    zonesRef.current = zones;
  }, [zones]);

  /**
   * Adds a new alert to the system
   * @param {string} text - The alert message
   * @param {string} [type='info'] - The type of alert (info, warning, success)
   * @param {string|null} [reasoningTrace=null] - The AI reasoning trace
   */
  const addAlert = useCallback((text, type = 'info', reasoningTrace = null) => {
    setAlerts(prev => [{ id: Date.now() + Math.random(), text, type, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), reasoningTrace }, ...prev]);
  }, []);

  // Simulate live data updates for basic metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCapacity(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1))));
      setWaitTimes(prev => ({
        food: Math.max(2, prev.food + (Math.random() > 0.5 ? 1 : -1)),
        restroom: Math.max(1, prev.restroom + (Math.random() > 0.5 ? 1 : -1)),
        merch: Math.max(2, prev.merch + (Math.random() > 0.5 ? 1 : -1)),
      }));
      
      setZones(prev => prev.map(zone => {
        const change = Math.floor(Math.random() * 10) - 5;
        return { ...zone, density: Math.max(0, Math.min(100, zone.density + change)) };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Multi-Agent Pipeline - check density every 15 seconds
  useEffect(() => {
    const aiInterval = setInterval(async () => {
      const currentZones = zonesRef.current;
      const pipelineResult = await runMultiAgentPipeline(currentZones);
      if (pipelineResult && pipelineResult.actions && pipelineResult.actions.length > 0) {
        
        let combinedMessage = pipelineResult.actions.map(a => a.message).join(' | ');
        addAlert(`Action Deployed: ${combinedMessage}`, 'warning', pipelineResult.reasoningTrace);
        
        // Execute actions autonomously
        setZones(prev => prev.map(zone => {
          const actionForZone = pipelineResult.actions.find(a => a.zone === zone.id);
          if (actionForZone && actionForZone.densityReduction) {
            return { ...zone, density: Math.max(0, zone.density - actionForZone.densityReduction) };
          }
          return zone;
        }));
      }
    }, 15000);
    return () => clearInterval(aiInterval);
  }, [addAlert]);

  const contextValue = useMemo(() => ({
    capacity, waitTimes, alerts, addAlert, zones, setZones
  }), [capacity, waitTimes, alerts, addAlert, zones]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
};
