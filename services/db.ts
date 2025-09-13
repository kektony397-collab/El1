// Fix: Use a type-only import for `Table` as it is an interface. This resolves
// a potential module resolution issue that can cause TypeScript to fail to
// recognize methods on the extended Dexie class, leading to the error on `this.version(1)`.
import Dexie, { type Table } from 'dexie';
import { BikeStats, Expense } from '../types';

export class BikeAdvanceDB extends Dexie {
  bikeStats!: Table<BikeStats, number>;
  expenses!: Table<Expense, number>;

  constructor() {
    super('BikeAdvanceDB');
    this.version(1).stores({
      bikeStats: '++id, model',
      expenses: '++id, date, category',
    });
  }
}

export const db = new BikeAdvanceDB();
