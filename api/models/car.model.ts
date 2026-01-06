import { model, Schema } from 'mongoose';

export interface ICar {
  // Basic Information
  brand: string;
  model: string;
  variant: string;
  year: number;
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'MPV';
  color: string;
  imageUrl: string;
  isAvailable: boolean;
  price: number;

  // Engine & Performance
  engineType: string; // Petrol, Diesel, Electric, Hybrid, CNG
  engineCapacity: number; // in cc (0 for electric)
  displacement: string; // e.g., "1197cc" (N/A for electric)
  fuelType: string; // Petrol, Diesel, Electric, Hybrid, Petrol+CNG
  maxPower: string; // e.g., "88 HP @ 6000 rpm"
  maxTorque: string; // e.g., "113 Nm @ 4200 rpm"
  acceleration: string; // 0-100 km/h time
  topSpeed: string;
  driveType: string; // FWD, RWD, AWD, 4WD
  transmission: string; // Manual, Automatic, CVT, DCT, AMT
  gearbox: string; // 5-speed, 6-speed, 7-speed, etc.

  // Fuel & Efficiency
  fuelTankCapacity: number;
  mileageCity: number; // kmpl or km/charge for EV
  mileageHighway: number;
  emissionStandard: string; // BS6, BS6 Phase 2, Euro 6
  range?: number; // For electric vehicles (km per charge)
  batteryCapacity?: number; // For electric/hybrid (kWh)
  chargingTime?: string; // For electric vehicles

  // Dimensions & Capacity
  length: number; // in mm
  width: number;
  height: number;
  wheelbase: number;
  groundClearance: number;
  kerbWeight: number;
  grossWeight: number;
  bootSpace: number; // in liters
  seatingCapacity: number;
  doors: number;

  // Suspension & Brakes
  frontSuspension: string;
  rearSuspension: string;
  frontBrakeType: string;
  rearBrakeType: string;
  brakingSystem: string;

  // Wheels & Tires
  wheelSize: string; // e.g., "R16"
  tireSize: string; // e.g., "195/65 R15"
  spareTire: string; // Full Size, Compact, Repair Kit

  // Safety Features
  airbags: number;
  abs: boolean;
  ebd: boolean; // Electronic Brake-force Distribution
  esc: boolean; // Electronic Stability Control
  tractionControl: boolean;
  hillAssist: boolean;
  isofix: boolean; // Child seat anchors
  parkingSensors: string; // Front, Rear, Front+Rear, 360° Camera
  reverseCamera: boolean;
  ncapRating?: number; // 0-5 stars

  // Comfort & Convenience
  ac: string; // Manual, Automatic, Dual Zone, Tri Zone
  powerSteering: boolean;
  powerWindows: string; // Front, All
  adjustableSeats: string; // Manual, Electric Driver, Electric Both
  cruiseControl: boolean;
  keylessEntry: boolean;
  pushButtonStart: boolean;
  sunroof: boolean;
  panoramicSunroof: boolean;
  ventilatedSeats: boolean;
  heatedSeats: boolean;

  // Infotainment & Technology
  infotainmentScreen: string; // Size in inches, e.g., "10.25 inch"
  touchscreen: boolean;
  androidAuto: boolean;
  appleCarPlay: boolean;
  bluetoothConnectivity: boolean;
  usbPorts: number;
  speakers: number;
  wirelessCharging: boolean;
  connectedCarFeatures: boolean;

  // Lighting
  headlightType: string; // Halogen, LED, Projector, Matrix LED
  drl: boolean; // Daytime Running Lights
  fogLights: boolean;
  taillightType: string; // LED, Halogen

  // Additional Features
  ecoMode: boolean;
  sportMode: boolean;
  driveModes: string[]; // e.g., ['Eco', 'Normal', 'Sport', 'Off-Road']
  adas: boolean; // Advanced Driver Assistance Systems
  autonomyLevel?: string; // L0, L1, L2, L3 (if applicable)

  // Warranty & Service
  warrantyYears: number;
  warrantyKm: number;
  freeServices: number;
}

const carSchema = new Schema<ICar>(
  {
    // Basic Information
    brand: { index: true, required: [true, 'Brand is required'], type: String },
    model: { index: true, required: [true, 'Model is required'], type: String },
    variant: { required: [true, 'Variant is required'], type: String },
    year: { index: true, required: [true, 'Year is required'], type: Number },
    bodyType: { required: [true, 'Body type is required'], type: String },
    color: { required: [true, 'Color is required'], type: String },
    imageUrl: { required: [true, 'Image URL is required'], type: String },
    isAvailable: { default: true, required: true, type: Boolean },
    price: { index: true, required: [true, 'Price is required'], type: Number },

    // Engine & Performance
    engineType: { required: [true, 'Engine type is required'], type: String },
    engineCapacity: { required: [true, 'Engine capacity is required'], type: Number },
    displacement: { required: [true, 'Displacement is required'], type: String },
    fuelType: { required: [true, 'Fuel type is required'], type: String },
    maxPower: { required: [true, 'Max power is required'], type: String },
    maxTorque: { required: [true, 'Max torque is required'], type: String },
    acceleration: { required: [true, 'Acceleration is required'], type: String },
    topSpeed: { required: [true, 'Top speed is required'], type: String },
    driveType: { required: [true, 'Drive type is required'], type: String },
    transmission: { required: [true, 'Transmission is required'], type: String },
    gearbox: { required: [true, 'Gearbox is required'], type: String },

    // Fuel & Efficiency
    fuelTankCapacity: { required: [true, 'Fuel tank capacity is required'], type: Number },
    mileageCity: { required: [true, 'City mileage is required'], type: Number },
    mileageHighway: { required: [true, 'Highway mileage is required'], type: Number },
    emissionStandard: { required: [true, 'Emission standard is required'], type: String },
    range: { type: Number }, // Optional for EVs
    batteryCapacity: { type: Number }, // Optional for EVs/Hybrids
    chargingTime: { type: String }, // Optional for EVs

    // Dimensions & Capacity
    length: { required: [true, 'Length is required'], type: Number },
    width: { required: [true, 'Width is required'], type: Number },
    height: { required: [true, 'Height is required'], type: Number },
    wheelbase: { required: [true, 'Wheelbase is required'], type: Number },
    groundClearance: { required: [true, 'Ground clearance is required'], type: Number },
    kerbWeight: { required: [true, 'Kerb weight is required'], type: Number },
    grossWeight: { required: [true, 'Gross weight is required'], type: Number },
    bootSpace: { required: [true, 'Boot space is required'], type: Number },
    seatingCapacity: { required: [true, 'Seating capacity is required'], type: Number },
    doors: { required: [true, 'Number of doors is required'], type: Number },

    // Suspension & Brakes
    frontSuspension: { required: [true, 'Front suspension is required'], type: String },
    rearSuspension: { required: [true, 'Rear suspension is required'], type: String },
    frontBrakeType: { required: [true, 'Front brake type is required'], type: String },
    rearBrakeType: { required: [true, 'Rear brake type is required'], type: String },
    brakingSystem: { required: [true, 'Braking system is required'], type: String },

    // Wheels & Tires
    wheelSize: { required: [true, 'Wheel size is required'], type: String },
    tireSize: { required: [true, 'Tire size is required'], type: String },
    spareTire: { required: [true, 'Spare tire type is required'], type: String },

    // Safety Features
    airbags: { required: [true, 'Number of airbags is required'], type: Number },
    abs: { required: true, type: Boolean },
    ebd: { required: true, type: Boolean },
    esc: { required: true, type: Boolean },
    tractionControl: { required: true, type: Boolean },
    hillAssist: { required: true, type: Boolean },
    isofix: { required: true, type: Boolean },
    parkingSensors: { required: [true, 'Parking sensors info is required'], type: String },
    reverseCamera: { required: true, type: Boolean },
    ncapRating: { type: Number, min: 0, max: 5 },

    // Comfort & Convenience
    ac: { required: [true, 'AC type is required'], type: String },
    powerSteering: { required: true, type: Boolean },
    powerWindows: { required: [true, 'Power windows info is required'], type: String },
    adjustableSeats: { required: [true, 'Adjustable seats info is required'], type: String },
    cruiseControl: { required: true, type: Boolean },
    keylessEntry: { required: true, type: Boolean },
    pushButtonStart: { required: true, type: Boolean },
    sunroof: { required: true, type: Boolean },
    panoramicSunroof: { required: true, type: Boolean },
    ventilatedSeats: { required: true, type: Boolean },
    heatedSeats: { required: true, type: Boolean },

    // Infotainment & Technology
    infotainmentScreen: { required: [true, 'Infotainment screen size is required'], type: String },
    touchscreen: { required: true, type: Boolean },
    androidAuto: { required: true, type: Boolean },
    appleCarPlay: { required: true, type: Boolean },
    bluetoothConnectivity: { required: true, type: Boolean },
    usbPorts: { required: [true, 'Number of USB ports is required'], type: Number },
    speakers: { required: [true, 'Number of speakers is required'], type: Number },
    wirelessCharging: { required: true, type: Boolean },
    connectedCarFeatures: { required: true, type: Boolean },

    // Lighting
    headlightType: { required: [true, 'Headlight type is required'], type: String },
    drl: { required: true, type: Boolean },
    fogLights: { required: true, type: Boolean },
    taillightType: { required: [true, 'Taillight type is required'], type: String },

    // Additional Features
    ecoMode: { required: true, type: Boolean },
    sportMode: { required: true, type: Boolean },
    driveModes: { type: [String], default: [] },
    adas: { required: true, type: Boolean },
    autonomyLevel: { type: String },

    // Warranty & Service
    warrantyYears: { required: [true, 'Warranty years is required'], type: Number },
    warrantyKm: { required: [true, 'Warranty kilometers is required'], type: Number },
    freeServices: { required: [true, 'Number of free services is required'], type: Number },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
carSchema.index({ brand: 1, model: 1 });
carSchema.index({ price: 1 });
carSchema.index({ year: -1 });
carSchema.index({ bodyType: 1 });
carSchema.index({ fuelType: 1 });

export const Car = model<ICar>('Car', carSchema);

// ============================================
// Field Categories Summary
// ============================================

/*
TOTAL FIELDS: ~85 fields

CATEGORIES:
1. Basic Information (9 fields)
   - brand, model, variant, year, bodyType, color, imageUrl, isAvailable, price

2. Engine & Performance (11 fields)
   - engineType, engineCapacity, displacement, fuelType, maxPower, maxTorque,
     acceleration, topSpeed, driveType, transmission, gearbox

3. Fuel & Efficiency (7 fields)
   - fuelTankCapacity, mileageCity, mileageHighway, emissionStandard,
     range, batteryCapacity, chargingTime

4. Dimensions & Capacity (10 fields)
   - length, width, height, wheelbase, groundClearance, kerbWeight,
     grossWeight, bootSpace, seatingCapacity, doors

5. Suspension & Brakes (5 fields)
   - frontSuspension, rearSuspension, frontBrakeType, rearBrakeType, brakingSystem

6. Wheels & Tires (3 fields)
   - wheelSize, tireSize, spareTire

7. Safety Features (10 fields)
   - airbags, abs, ebd, esc, tractionControl, hillAssist, isofix,
     parkingSensors, reverseCamera, ncapRating

8. Comfort & Convenience (11 fields)
   - ac, powerSteering, powerWindows, adjustableSeats, cruiseControl,
     keylessEntry, pushButtonStart, sunroof, panoramicSunroof,
     ventilatedSeats, heatedSeats

9. Infotainment & Technology (9 fields)
   - infotainmentScreen, touchscreen, androidAuto, appleCarPlay,
     bluetoothConnectivity, usbPorts, speakers, wirelessCharging,
     connectedCarFeatures

10. Lighting (4 fields)
    - headlightType, drl, fogLights, taillightType

11. Additional Features (5 fields)
    - ecoMode, sportMode, driveModes, adas, autonomyLevel

12. Warranty & Service (3 fields)
    - warrantyYears, warrantyKm, freeServices

KEY DIFFERENCES FROM BIKE MODEL:
✅ More body types (Sedan, SUV, Hatchback, etc.)
✅ Electric/Hybrid support (range, battery, charging)
✅ More safety features (airbags, ESC, NCAP rating)
✅ Comfort features (sunroof, ventilated seats, etc.)
✅ Infotainment system details
✅ Seating capacity and boot space
✅ Multiple drive modes
✅ ADAS (Advanced Driver Assistance Systems)
✅ Warranty information
*/
