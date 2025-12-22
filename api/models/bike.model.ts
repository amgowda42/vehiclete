import { model, Schema } from 'mongoose';

export interface IBike {
  abs: boolean;
  acceleration: string;
  brakingSystem: string;
  brand: string;
  caliperType: string;
  color: string;
  coolingSystem: string;
  displacement: string;
  engineCapacity: number;
  frontBrakeType: string;
  frontSuspension: string;
  fuelTankCapacity: number;
  groundClearance: number;
  imageUrl: string;
  isAvailable: boolean;
  kerbWeight: number;
  maxPower: string;
  maxTorque: string;
  mileage: number;
  model: string;
  price: number;
  quickShifter: boolean;
  rearBrakeType: string;
  rearSuspension: string;
  seatHeight: number;
  seatLength: number;
  topSpeed: string;
  transmission: string;
  varient: string;
  year: number;
}

const bikeSchema = new Schema<IBike>(
  {
    abs: { required: true, type: Boolean },
    acceleration: { required: [true, 'Acceleration is required'], type: String },
    brakingSystem: { required: [true, 'Braking system is required'], type: String },
    brand: { index: true, required: [true, 'Brand is required'], type: String },
    caliperType: { required: [true, 'Caliper type is required'], type: String },
    color: { required: [true, 'Color is required'], type: String },
    coolingSystem: { required: [true, 'Cooling system is required'], type: String },
    displacement: { required: [true, 'Displacement is required'], type: String },
    engineCapacity: { required: [true, 'Engine capacity is required'], type: Number },
    frontBrakeType: { required: [true, 'Front brake type is required'], type: String },
    frontSuspension: { required: [true, 'Front suspension is required'], type: String },
    fuelTankCapacity: { required: [true, 'Fuel tank capacity is required'], type: Number },
    groundClearance: { type: Number },
    imageUrl: { required: [true, 'Image URL is required'], type: String },
    isAvailable: {
      default: true,
      required: [true, 'Availability status is required'],
      type: Boolean,
    },
    kerbWeight: { required: [true, 'Kerb weight is required'], type: Number },
    maxPower: { required: [true, 'Max power is required'], type: String },
    maxTorque: { required: [true, 'Max torque is required'], type: String },
    mileage: { required: [true, 'Mileage is required'], type: Number },
    model: { index: true, required: [true, 'Model is required'], type: String },
    price: { index: true, required: [true, 'Price is required'], type: Number },
    quickShifter: { required: [true, 'Quick shifter is required'], type: Boolean },
    rearBrakeType: { required: [true, 'Rear brake type is required'], type: String },
    rearSuspension: { required: [true, 'Rear suspension is required'], type: String },
    seatHeight: { required: [true, 'Seat height is required'], type: Number },
    seatLength: { required: [true, 'Seat length is required'], type: Number },
    topSpeed: { required: [true, 'Top speed is required'], type: String },
    transmission: { required: [true, 'Transmission is required'], type: String },
    varient: { required: [true, 'Variant is required'], type: String },
    year: { index: true, required: [true, 'Year is required'], type: Number },
  },
  {
    timestamps: true,
  }
);

export const Bike = model<IBike>('Bike', bikeSchema);
