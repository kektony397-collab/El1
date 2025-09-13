
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './components/pages/DashboardPage';
import { ExpensesPage } from './components/pages/ExpensesPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { db } from './services/db';
import { BIKE_DATABASE, DEFAULT_BIKE_MODEL } from './constants';

const AppContent: React.FC = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const loadInitialData = async () => {
      // Load bike stats
      let bikeStats = await db.bikeStats.get(1);
      if (!bikeStats) {
        bikeStats = {
            id: 1,
            ...BIKE_DATABASE[DEFAULT_BIKE_MODEL],
            currentFuel: BIKE_DATABASE[DEFAULT_BIKE_MODEL].tankCapacity,
            lastService: new Date().toISOString(),
            currentSpeed: 0,
            distanceTraveled: 0,
            totalDistance: 10000,
        };
        await db.bikeStats.put(bikeStats);
      }

      // Load expenses, sorted by date descending
      const expenses = await db.expenses.orderBy('date').reverse().toArray();
      
      dispatch({ 
        type: 'SET_INITIAL_STATE', 
        payload: { 
          bikeStats,
          expenses,
        }
      });
    };
    
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};


const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
