
export interface BikeInfo {
  model: string;
  averageMileage: number; // kmpl
  tankCapacity: number; // liters
  optimalSpeed: { min: number; max: number };
}

export interface BikeStats extends BikeInfo {
  id?: number;
  currentFuel: number; // liters
  lastService: string; // ISO Date string
  currentSpeed: number; // kmph
  distanceTraveled: number; // km (session)
  totalDistance: number; // km (odometer)
}

export interface FuelState {
  pricePerLiter: number;
}

export type ExpenseCategory = 'fuel' | 'maintenance' | 'other';

export interface Expense {
  id?: number;
  category: ExpenseCategory;
  amount: number;
  date: string; // ISO Date string
  description: string;
}

export interface GPSData {
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: string; // ISO Date string
}

export type AppAction =
  | { type: 'SET_INITIAL_STATE'; payload: Partial<AppState> }
  | { type: 'UPDATE_BIKE_STATS'; payload: Partial<BikeStats> }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'SET_EXPENSES'; payload: Expense[] }
  | { type: 'UPDATE_FUEL_PRICE'; payload: number }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

export interface AppState {
  bikeStats: BikeStats | null;
  fuelState: FuelState;
  expenses: Expense[];
  theme: 'light' | 'dark';
}
