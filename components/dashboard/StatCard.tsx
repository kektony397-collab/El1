
import React, { ReactNode } from 'react';
import { Card } from '../common/Card';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <Card className="flex items-center space-x-4">
      <div className={`p-3 rounded-full`} style={{ backgroundColor: color + '20', color: color }}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  );
};
