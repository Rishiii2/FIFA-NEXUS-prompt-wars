import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getOperationalAlerts } from '../services/gemini';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [capacity, setCapacity] = useState(87);
  const [alerts, setAlerts] = useState([
    { id: 1, text: "System Online. Monitoring stadium density.", type: "success", time: "Just now" }
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

  const addAlert = (text, type = 'info') => {
    setAlerts(prev => [{ id: Date.now(), text, type, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...prev]);
  };

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

  // AI Operational Manager - check density every 15 seconds
  useEffect(() => {
    const aiInterval = setInterval(async () => {
      const currentZones = zonesRef.current;
      const alertData = await getOperationalAlerts(currentZones);
      if (alertData) {
        addAlert(`GenAI Alert: ${alertData.text}`, alertData.type);
      }
    }, 15000);
    return () => clearInterval(aiInterval);
  }, []);

  return (
    <DataContext.Provider value={{ capacity, waitTimes, alerts, addAlert, zones, setZones }}>
      {children}
    </DataContext.Provider>
  );
};
