
import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { AppState, AppAction, BikeStats, Expense } from '../types';
import { BIKE_DATABASE, DEFAULT_BIKE_MODEL } from '../constants';

const defaultBike = BIKE_DATABASE[DEFAULT_BIKE_MODEL];

const initialState: AppState = {
  bikeStats: {
    ...defaultBike,
    id: 1,
    currentFuel: defaultBike.tankCapacity,
    lastService: new Date().toISOString(),
    currentSpeed: 0,
    distanceTraveled: 0,
    totalDistance: 10000,
  },
  fuelState: {
    pricePerLiter: 105.0,
  },
  expenses: [],
  theme: 'light',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return { ...state, ...action.payload };
    case 'UPDATE_BIKE_STATS':
      if (!state.bikeStats) return state;
      return {
        ...state,
        bikeStats: { ...state.bikeStats, ...action.payload },
      };
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };
    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload,
      };
    case 'UPDATE_FUEL_PRICE':
      return {
        ...state,
        fuelState: { ...state.fuelState, pricePerLiter: action.payload },
      };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      dispatch({ type: 'SET_THEME', payload: storedTheme });
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        dispatch({ type: 'SET_THEME', payload: prefersDark ? 'dark' : 'light' });
    }
  }, []);

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
