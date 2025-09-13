
import React, { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../common/Card';
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/formatters';
import { ExpenseCategory } from '../../types';

const categoryIcons: Record<ExpenseCategory, string> = {
  fuel: 'ph-fill ph-gas-can',
  maintenance: 'ph-fill ph-wrench',
  other: 'ph-fill ph-shopping-cart-simple',
};

const categoryColors: Record<ExpenseCategory, string> = {
  fuel: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
  maintenance: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
  other: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
};


export const ExpensesPage: React.FC = () => {
  const { state } = useAppContext();
  const { expenses } = state;

  const totalExpenses = useMemo(() => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [expenses]);
  
  const expensesByCategory = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);
  }, [expenses]);

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-foreground dark:text-dark_foreground">Total Expenses</h2>
        <p className="text-3xl font-bold text-primary-DEFAULT">{formatCurrency(totalExpenses)}</p>
         <div className="flex space-x-4 mt-4 text-sm">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div key={category}>
                    <span className="capitalize text-gray-500 dark:text-gray-400">{category}: </span>
                    <span className="font-semibold text-foreground dark:text-dark_foreground">{formatCurrency(amount)}</span>
                </div>
            ))}
         </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold mb-4 text-foreground dark:text-dark_foreground">Expense History</h2>
        <div className="space-y-3">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-background dark:bg-dark_background rounded-lg">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${categoryColors[expense.category]}`}>
                        <i className={`${categoryIcons[expense.category]} text-xl`}></i>
                    </div>
                    <div>
                        <p className="font-semibold capitalize text-card_foreground dark:text-dark_card_foreground">{expense.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(expense.date), 'dd MMM, yyyy')}</p>
                    </div>
                </div>
                <p className="font-bold text-lg text-red-500">-{formatCurrency(expense.amount)}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No expenses logged yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
};
