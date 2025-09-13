
import { useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { db } from '../services/db';

export const useBikeSimulator = () => {
  const { state, dispatch } = useAppContext();
  const { bikeStats } = state;

  const updateBikeData = useCallback(() => {
    if (!bikeStats) return;

    // Simulate speed fluctuation
    let newSpeed = bikeStats.currentSpeed;
    const speedChange = (Math.random() - 0.5) * 10;
    newSpeed += speedChange;
    newSpeed = Math.max(0, Math.min(120, newSpeed)); // Clamp speed between 0 and 120 kmph

    // If bike is moving, update distance and fuel
    if (newSpeed > 0) {
      const distanceThisInterval = newSpeed * (2000 / 3600000); // Distance in km for a 2s interval
      const fuelConsumed = distanceThisInterval / bikeStats.averageMileage;
      
      const newDistanceTraveled = bikeStats.distanceTraveled + distanceThisInterval;
      const newTotalDistance = bikeStats.totalDistance + distanceThisInterval;
      const newCurrentFuel = Math.max(0, bikeStats.currentFuel - fuelConsumed);

      dispatch({
        type: 'UPDATE_BIKE_STATS',
        payload: {
          currentSpeed: newSpeed,
          distanceTraveled: newDistanceTraveled,
          totalDistance: newTotalDistance,
          currentFuel: newCurrentFuel,
        },
      });
    } else {
       dispatch({
        type: 'UPDATE_BIKE_STATS',
        payload: { currentSpeed: 0 },
      });
    }
  }, [bikeStats, dispatch]);
  
  // Persist data to DB
  useEffect(() => {
    const persistData = async () => {
      if (bikeStats && bikeStats.id) {
        await db.bikeStats.put(bikeStats);
      }
    };

    const intervalId = setInterval(persistData, 5000); // Persist every 5 seconds
    return () => clearInterval(intervalId);
  }, [bikeStats]);
  
  // Simulation loop
  useEffect(() => {
    const simulationInterval = setInterval(updateBikeData, 2000); // Update every 2 seconds
    return () => clearInterval(simulationInterval);
  }, [updateBikeData]);
};
