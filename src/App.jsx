import React, { useState, Suspense, lazy } from 'react';
import './App.css';
import TopNav from './components/shared/TopNav';
import { DataProvider } from './data/DataContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const FanPortal = lazy(() => import('./pages/FanPortal'));

/**
 * Main App Component
 * @returns {JSX.Element} The rendered App
 */
function App() {
  const [activeTab, setActiveTab] = useState('staff');

  return (
    <DataProvider>
      <div className="app-container">
        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          <Suspense fallback={<div style={{color: 'white', padding: '20px'}}>Loading modules...</div>}>
            {activeTab === 'staff' ? <Dashboard /> : <FanPortal />}
          </Suspense>
        </main>
      </div>
    </DataProvider>
  );
}

export default App;
