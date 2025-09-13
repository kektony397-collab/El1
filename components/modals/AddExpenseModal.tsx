
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { db } from '../../services/db';
import { Expense, ExpenseCategory } from '../../types';

interface AddExpenseModalProps {
  onClose: () => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onClose }) => {
  const { dispatch, state } = useAppContext();
  const [category, setCategory] = useState<ExpenseCategory>('other');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  
  const isRefuel = category === 'fuel' && state.bikeStats;
  const suggestedAmount = isRefuel ? ((state.bikeStats!.tankCapacity - state.bikeStats!.currentFuel) * state.fuelState.pricePerLiter).toFixed(0) : '';
  const suggestedDescription = isRefuel ? `Refuel (~${(state.bikeStats!.tankCapacity - state.bikeStats!.currentFuel).toFixed(1)}L)` : '';


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount || suggestedAmount);
    if (!amountNum || amountNum <= 0) return;

    const newExpense: Expense = {
      category,
      amount: amountNum,
      description: description || suggestedDescription || 'New Expense',
      date: new Date().toISOString(),
    };

    const id = await db.expenses.add(newExpense);
    dispatch({ type: 'ADD_EXPENSE', payload: { ...newExpense, id } });
    
    if (category === 'fuel' && state.bikeStats) {
        const fuelAdded = amountNum / state.fuelState.pricePerLiter;
        const newFuelLevel = Math.min(state.bikeStats.currentFuel + fuelAdded, state.bikeStats.tankCapacity);
        dispatch({type: 'UPDATE_BIKE_STATS', payload: { currentFuel: newFuelLevel }});
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card dark:bg-dark_card rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground dark:text-dark_foreground">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-dark_foreground focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm rounded-md"
            >
              <option value="fuel">Fuel</option>
              <option value="maintenance">Maintenance</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount (INR)</label>
            <input
              type="number"
              placeholder={isRefuel ? `~ ${suggestedAmount}` : '0.00'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-dark_foreground focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm rounded-md"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <input
              type="text"
              placeholder={isRefuel ? suggestedDescription : 'e.g., Oil Change'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-dark_foreground focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-foreground dark:text-dark_foreground hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary-DEFAULT text-primary-foreground font-semibold hover:bg-primary-dark"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
