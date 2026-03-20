import { Bike } from '../models/bike.model.js';
import { Car } from '../models/car.model.js';
import { Cycle } from '../models/cycle.model.js';

export type VehicleType = 'bike' | 'car' | 'cycle';

const modelMap = {
  bike: Bike,
  car: Car,
  cycle: Cycle,
};

const compareFields: Record<VehicleType, string[]> = {
  bike: [
    'price',
    'engineCapacity',
    'maxPower',
    'maxTorque',
    'topSpeed',
    'mileage',
    'fuelTankCapacity',
    'kerbWeight',
    'transmission',
    'abs',
  ],
  car: [
    'price',
    'engineCapacity',
    'maxPower',
    'maxTorque',
    'topSpeed',
    'mileageCity',
    'fuelTankCapacity',
    'seatingCapacity',
    'airbags',
    'abs',
  ],
  cycle: [
    'price',
    'weight',
    'gears',
    'wheelSize',
    'frameMaterial',
    'suspension',
    'brakeType',
    'maxLoad',
    'warrantyYears',
    'isElectric',
  ],
};

const fieldLabels: Record<string, string> = {
  abs: 'ABS',
  airbags: 'Airbags',
  brakeType: 'Brake Type',
  engineCapacity: 'Engine Capacity (cc)',
  frameMaterial: 'Frame Material',
  fuelTankCapacity: 'Fuel Tank (L)',
  gears: 'Gears',
  isElectric: 'Electric',
  kerbWeight: 'Kerb Weight (kg)',
  maxLoad: 'Max Load (kg)',
  maxPower: 'Max Power',
  maxTorque: 'Max Torque',
  mileage: 'Mileage (kmpl)',
  mileageCity: 'City Mileage (kmpl)',
  price: 'Price (₹)',
  seatingCapacity: 'Seating Capacity',
  suspension: 'Suspension',
  topSpeed: 'Top Speed',
  transmission: 'Transmission',
  warrantyYears: 'Warranty (Years)',
  weight: 'Weight (kg)',
  wheelSize: 'Wheel Size',
};

const getWinner = (
  field: string,
  val1: unknown,
  val2: unknown
): 'tie' | 'vehicle1' | 'vehicle2' | null => {
  if (typeof val1 === 'boolean' || typeof val2 === 'boolean') return null;
  if (typeof val1 === 'string' || typeof val2 === 'string') return null;
  if (typeof val1 === 'number' && typeof val2 === 'number') {
    const lowerIsBetter = ['kerbWeight', 'weight', 'price'];
    if (lowerIsBetter.includes(field)) {
      return val1 < val2 ? 'vehicle1' : val1 > val2 ? 'vehicle2' : 'tie';
    }
    return val1 > val2 ? 'vehicle1' : val1 < val2 ? 'vehicle2' : 'tie';
  }

  return null;
};

export const compareVehicles = async (type: VehicleType, id1: string, id2: string) => {
  const VehicleModel = modelMap[type];
  const fields = compareFields[type];
  const projection = ['brand', 'model', 'varient', 'variant', 'year', 'imageUrl', ...fields].join(
    ' '
  );

  const [vehicle1, vehicle2] = await Promise.all([
    (VehicleModel as any).findById(id1).select(projection).lean(),
    (VehicleModel as any).findById(id2).select(projection).lean(),
  ]);

  if (!vehicle1) throw new Error(`First ${type} not found`);
  if (!vehicle2) throw new Error(`Second ${type} not found`);

  const v1 = vehicle1 as Record<string, unknown>;
  const v2 = vehicle2 as Record<string, unknown>;

  const comparison = fields.map(field => {
    const val1 = v1[field];
    const val2 = v2[field];

    return {
      field,
      label: fieldLabels[field] ?? field,
      vehicle1Value: val1 ?? null,
      vehicle2Value: val2 ?? null,
      winner: getWinner(field, val1, val2),
    };
  });

  return {
    comparison,
    type,
    vehicle1: {
      _id: id1,
      brand: v1.brand,
      imageUrl: v1.imageUrl,
      model: v1.model,
      variant: v1.variant ?? v1.varient,
      year: v1.year,
    },
    vehicle2: {
      _id: id2,
      brand: v2.brand,
      imageUrl: v2.imageUrl,
      model: v2.model,
      variant: v2.variant ?? v2.varient,
      year: v2.year,
    },
  };
};
