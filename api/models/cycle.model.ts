import { model, Schema } from 'mongoose';

export interface ICycle {
  // Basic Information
  brand: string;
  model: string;
  year: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric' | 'Kids' | 'BMX' | 'Folding' | 'Cruiser';
  color: string;
  imageUrl: string;
  isAvailable: boolean;
  price: number;

  // Frame & Specifications
  frameMaterial: string; // Steel, Aluminum, Carbon Fiber, Alloy
  frameSize: string; // Small, Medium, Large, XL
  weight: number; // in kg

  // Wheels & Gears
  wheelSize: string; // 26", 27.5", 29", 700c
  gears: number; // Number of gears
  gearType: string; // Shimano, SRAM, Single Speed

  // Brakes & Suspension
  brakeType: string; // Disc, V-Brake, Caliper
  suspension: string; // Front, Full, Rigid

  // Features
  features: string[]; // e.g., ['Mudguards', 'Kickstand', 'Carrier', 'Lights']

  // Electric Cycle Specific (Optional)
  isElectric: boolean;
  motorPower?: number; // in Watts
  batteryCapacity?: number; // in Ah
  range?: number; // in km per charge

  // Usage & Dimensions
  recommendedHeight: string; // e.g., "5'5\" - 6'2\""
  maxLoad: number; // in kg
  terrain: string[]; // e.g., ['Road', 'Trail', 'Mountain']

  // Warranty
  warrantyYears: number;
}

const cycleSchema = new Schema<ICycle>(
  {
    // Basic Information
    brand: { index: true, required: [true, 'Brand is required'], type: String },
    model: { index: true, required: [true, 'Model is required'], type: String },
    year: { index: true, required: [true, 'Year is required'], type: Number },
    category: { required: [true, 'Category is required'], type: String },
    color: { required: [true, 'Color is required'], type: String },
    imageUrl: { required: [true, 'Image URL is required'], type: String },
    isAvailable: { default: true, required: true, type: Boolean },
    price: { index: true, required: [true, 'Price is required'], type: Number },

    // Frame & Specifications
    frameMaterial: { required: [true, 'Frame material is required'], type: String },
    frameSize: { required: [true, 'Frame size is required'], type: String },
    weight: { required: [true, 'Weight is required'], type: Number },

    // Wheels & Gears
    wheelSize: { required: [true, 'Wheel size is required'], type: String },
    gears: { required: [true, 'Number of gears is required'], type: Number },
    gearType: { required: [true, 'Gear type is required'], type: String },

    // Brakes & Suspension
    brakeType: { required: [true, 'Brake type is required'], type: String },
    suspension: { required: [true, 'Suspension type is required'], type: String },

    // Features
    features: { type: [String], default: [] },

    // Electric Cycle Specific
    isElectric: { required: true, type: Boolean },
    motorPower: { type: Number },
    batteryCapacity: { type: Number },
    range: { type: Number },

    // Usage & Dimensions
    recommendedHeight: { required: [true, 'Recommended height is required'], type: String },
    maxLoad: { required: [true, 'Max load is required'], type: Number },
    terrain: { type: [String], default: [] },

    // Warranty
    warrantyYears: { required: [true, 'Warranty years is required'], type: Number },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
cycleSchema.index({ brand: 1, model: 1 });
cycleSchema.index({ price: 1 });
cycleSchema.index({ year: -1 });
cycleSchema.index({ category: 1 });
cycleSchema.index({ isElectric: 1 });

export const Cycle = model<ICycle>('Cycle', cycleSchema);

// ============================================
// Field Categories Summary
// ============================================

/*
TOTAL FIELDS: 25 fields

CATEGORIES:
1. Basic Information (8 fields)
   - brand, model, year, category, color, imageUrl, isAvailable, price

2. Frame & Specifications (3 fields)
   - frameMaterial, frameSize, weight

3. Wheels & Gears (3 fields)
   - wheelSize, gears, gearType

4. Brakes & Suspension (2 fields)
   - brakeType, suspension

5. Features (1 field)
   - features (array: mudguards, kickstand, carrier, lights, etc.)

6. Electric Cycle Specific (4 fields - Optional)
   - isElectric, motorPower, batteryCapacity, range

7. Usage & Dimensions (3 fields)
   - recommendedHeight, maxLoad, terrain

8. Warranty (1 field)
   - warrantyYears

SUPPORTED CATEGORIES:
✅ Mountain bikes
✅ Road bikes
✅ Hybrid bikes
✅ Electric bikes (e-bikes)
✅ Kids bikes
✅ BMX bikes
✅ Folding bikes
✅ Cruiser bikes
*/
