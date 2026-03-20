import { model, Schema } from 'mongoose';

export interface ICycle {
  batteryCapacity?: number;
  brakeType: string;
  brand: string;
  category: 'BMX' | 'Cruiser' | 'Electric' | 'Folding' | 'Hybrid' | 'Kids' | 'Mountain' | 'Road';
  color: string;
  features: string[];
  frameMaterial: string;
  frameSize: string;
  gears: number;
  gearType: string;
  imageUrl: string;
  isAvailable: boolean;
  isElectric: boolean;
  maxLoad: number;
  model: string;
  motorPower?: number;
  price: number;
  range?: number;
  recommendedHeight: string;
  suspension: string;
  terrain: string[];
  warrantyYears: number;
  weight: number;
  wheelSize: string;
  year: number;
}

const cycleSchema = new Schema<ICycle>(
  {
    batteryCapacity: { type: Number },
    brakeType: { required: [true, 'Brake type is required'], type: String },
    brand: { index: true, required: [true, 'Brand is required'], type: String },
    category: { required: [true, 'Category is required'], type: String },
    color: { required: [true, 'Color is required'], type: String },
    features: { default: [], type: [String] },
    frameMaterial: { required: [true, 'Frame material is required'], type: String },
    frameSize: { required: [true, 'Frame size is required'], type: String },
    gears: { required: [true, 'Number of gears is required'], type: Number },
    gearType: { required: [true, 'Gear type is required'], type: String },
    imageUrl: { required: [true, 'Image URL is required'], type: String },
    isAvailable: { default: true, required: true, type: Boolean },
    isElectric: { required: true, type: Boolean },
    maxLoad: { required: [true, 'Max load is required'], type: Number },
    model: { index: true, required: [true, 'Model is required'], type: String },
    motorPower: { type: Number },
    price: { index: true, required: [true, 'Price is required'], type: Number },
    range: { type: Number },
    recommendedHeight: { required: [true, 'Recommended height is required'], type: String },
    suspension: { required: [true, 'Suspension type is required'], type: String },
    terrain: { default: [], type: [String] },
    warrantyYears: { required: [true, 'Warranty years is required'], type: Number },
    weight: { required: [true, 'Weight is required'], type: Number },
    wheelSize: { required: [true, 'Wheel size is required'], type: String },
    year: { index: true, required: [true, 'Year is required'], type: Number },
  },
  {
    timestamps: true,
  }
);

cycleSchema.index({ brand: 1, model: 1 });
cycleSchema.index({ year: -1 });
cycleSchema.index({ category: 1 });
cycleSchema.index({ isElectric: 1 });

export const Cycle = model<ICycle>('Cycle', cycleSchema);
