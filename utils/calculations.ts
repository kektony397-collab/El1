
import { BikeStats, FuelState } from '../types';

export const calculateMetrics = (bikeStats: BikeStats | null, fuelState: FuelState) => {
  if (!bikeStats) {
    return {
      estimatedRange: 0,
      costPerKm: 0,
      dailyCost: 0,
    };
  }

  const estimatedRange = bikeStats.currentFuel * bikeStats.averageMileage;
  const costPerKm = fuelState.pricePerLiter / bikeStats.averageMileage;
  const dailyCost = bikeStats.distanceTraveled * costPerKm;

  return {
    estimatedRange,
    costPerKm,
    dailyCost,
  };
};
