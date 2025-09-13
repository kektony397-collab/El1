
import React from 'react';

interface GaugeProps {
  value: number;
  maxValue: number;
  label: string;
  unit: string;
  color: string;
}

export const Gauge: React.FC<GaugeProps> = ({ value, maxValue, label, unit, color }) => {
  const percentage = Math.min(Math.max(value / maxValue, 0), 1);
  const strokeDashoffset = 283 * (1 - percentage * 0.75); // 0.75 for 270 degrees arc

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-[225deg]">
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          strokeWidth="10"
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeDasharray="283"
          strokeDashoffset="70.75" // 283 * (1 - 0.75)
        />
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray="283"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-2">
        <span className="text-3xl font-bold text-foreground dark:text-dark_foreground">
          {Math.round(value)}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
        <span className="text-xs text-gray-400 mt-1">{label}</span>
      </div>
    </div>
  );
};
