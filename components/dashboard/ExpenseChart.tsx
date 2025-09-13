
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '../common/Card';
import { Expense } from '../../types';
import { format } from 'date-fns';

interface ExpenseChartProps {
  expenses: Expense[];
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return format(d, 'yyyy-MM-dd');
  }).reverse();

  const data = last7Days.map(day => {
    const dailyExpenses = expenses
      .filter(e => format(new Date(e.date), 'yyyy-MM-dd') === day)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return {
      name: format(new Date(day), 'EEE'),
      amount: dailyExpenses,
    };
  });

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4 text-foreground dark:text-dark_foreground">Weekly Expenses</h2>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" stroke="hsl(240 10% 3.9% / 0.5)" className="dark:stroke-white/50" />
            <YAxis stroke="hsl(240 10% 3.9% / 0.5)" className="dark:stroke-white/50"/>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(240 10% 3.9%)',
                borderColor: 'hsl(240 10% 20%)',
                color: 'hsl(0 0% 98%)'
              }}
              labelStyle={{ color: 'hsl(0 0% 98%)' }}
            />
            <Bar dataKey="amount" fill="hsl(243 90% 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
