
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../common/Card';
import { BIKE_DATABASE } from '../../constants';
import { db } from '../../services/db';
import { BikeStats } from '../../types';

export const SettingsPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { bikeStats, fuelState, theme } = state;
  
  const [selectedBike, setSelectedBike] = useState(bikeStats?.model || '');
  const [fuelPrice, setFuelPrice] = useState(fuelState.pricePerLiter);

  useEffect(() => {
    if (bikeStats) {
      setSelectedBike(bikeStats.model);
    }
    setFuelPrice(fuelState.pricePerLiter);
  }, [bikeStats, fuelState]);

  const handleSave = async () => {
    const newBikeInfo = BIKE_DATABASE[selectedBike];
    if (!newBikeInfo || !bikeStats) return;

    const updatedStats: BikeStats = {
      ...bikeStats,
      ...newBikeInfo,
    };

    dispatch({ type: 'UPDATE_BIKE_STATS', payload: updatedStats });
    dispatch({ type: 'UPDATE_FUEL_PRICE', payload: fuelPrice });

    await db.bikeStats.put(updatedStats);
    // In a real app, fuel price would be stored separately
    console.log("Settings saved.");
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };


  if (!bikeStats) return null;

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="text-xl font-bold mb-4 text-foreground dark:text-dark_foreground">Bike Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="bikeModel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bike Model</label>
            <select
              id="bikeModel"
              value={selectedBike}
              onChange={(e) => setSelectedBike(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-dark_foreground focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm rounded-md"
            >
              {Object.keys(BIKE_DATABASE).map(modelName => (
                <option key={modelName} value={modelName}>{modelName}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="fuelPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fuel Price (per liter)</label>
            <input
              type="number"
              id="fuelPrice"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-dark_foreground focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm rounded-md"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-primary-DEFAULT text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Save Settings
          </button>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold mb-4 text-foreground dark:text-dark_foreground">Appearance</h2>
        <div className="flex items-center justify-between">
          <span className="text-foreground dark:text-dark_foreground">Theme</span>
          <button onClick={handleThemeToggle} className="flex items-center space-x-2 p-2 rounded-lg bg-background dark:bg-dark_background">
             {theme === 'light' ? <i className="ph-fill ph-moon"></i> : <i className="ph-fill ph-sun"></i>}
             <span className="capitalize">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
          </button>
        </div>
      </Card>
    </div>
  );
};
