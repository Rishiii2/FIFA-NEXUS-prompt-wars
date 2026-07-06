import { useState } from 'react';
import './App.css';
import TopNav from './components/shared/TopNav';
import { DataProvider } from './data/DataContext';

import Dashboard from './pages/Dashboard';
import FanPortal from './pages/FanPortal';

function App() {
  const [activeTab, setActiveTab] = useState('staff');

  return (
    <DataProvider>
      <div className="app-container">
        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          {activeTab === 'staff' ? <Dashboard /> : <FanPortal />}
        </main>
      </div>
    </DataProvider>
  );
}

export default App;
