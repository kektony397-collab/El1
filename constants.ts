
import { BikeInfo } from './types';

export const BIKE_DATABASE: { [key: string]: BikeInfo } = {
  'Honda Shine': {
    model: 'Honda Shine',
    averageMileage: 65,
    tankCapacity: 10.5,
    optimalSpeed: { min: 40, max: 60 },
  },
  'Hero Splendor Plus': {
    model: 'Hero Splendor Plus',
    averageMileage: 80,
    tankCapacity: 9.8,
    optimalSpeed: { min: 40, max: 55 },
  },
  'Bajaj Pulsar 150': {
    model: 'Bajaj Pulsar 150',
    averageMileage: 50,
    tankCapacity: 15,
    optimalSpeed: { min: 50, max: 70 },
  },
  'Yamaha FZ-S': {
    model: 'Yamaha FZ-S',
    averageMileage: 45,
    tankCapacity: 13,
    optimalSpeed: { min: 50, max: 75 },
  },
  'Royal Enfield Classic 350': {
    model: 'Royal Enfield Classic 350',
    averageMileage: 37,
    tankCapacity: 13.5,
    optimalSpeed: { min: 60, max: 80 },
  },
};

export const DEFAULT_BIKE_MODEL = 'Hero Splendor Plus';
