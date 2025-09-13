
import React from 'react';
import { StatCard } from '../dashboard/StatCard';
import { Gauge } from '../dashboard/Gauge';
import { ExpenseChart } from '../dashboard/ExpenseChart';
import { useAppContext } from '../../context/AppContext';
import { useBikeSimulator } from '../../hooks/useBikeSimulator';
import { calculateMetrics } from '../../utils/calculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const DashboardPage: React.FC = () => {
  useBikeSimulator();
  const { state } = useAppContext();
  const { bikeStats, fuelState, expenses } = state;

  if (!bikeStats) {
    return <div className="p-4">Loading bike data...</div>;
  }
  
  const metrics = calculateMetrics(bikeStats, fuelState);

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card dark:bg-dark_card rounded-xl shadow-md p-2">
            <Gauge 
                value={bikeStats.currentSpeed}
                maxValue={160}
                label="Speed"
                unit="km/h"
                color="hsl(243 90% 55%)"
            />
        </div>
        <div className="bg-card dark:bg-dark_card rounded-xl shadow-md p-2">
            <Gauge 
                value={bikeStats.currentFuel}
                maxValue={bikeStats.tankCapacity}
                label="Fuel"
                unit="liters"
                color="hsl(142 71% 45%)"
            />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Est. Range"
          value={`${formatNumber(metrics.estimatedRange, 0)} km`}
          icon={<i className="ph-fill ph-gas-can text-xl"></i>}
          color="hsl(142 71% 45%)"
        />
        <StatCard
          title="Mileage"
          value={`${formatNumber(bikeStats.averageMileage, 0)} kmpl`}
          icon={<i className="ph-fill ph-gauge text-xl"></i>}
          color="hsl(346 78% 52%)"
        />
        <StatCard
          title="Trip Cost"
          value={formatCurrency(metrics.dailyCost)}
          icon={<i className="ph-fill ph-currency-inr text-xl"></i>}
          color="hsl(48 96% 53%)"
        />
        <StatCard
          title="Trip Dist."
          value={`${formatNumber(bikeStats.distanceTraveled, 1)} km`}
          icon={<i className="ph-fill ph-road-horizon text-xl"></i>}
          color="hsl(217 91% 60%)"
        />
      </div>

      <ExpenseChart expenses={expenses} />
    </div>
  );
};
