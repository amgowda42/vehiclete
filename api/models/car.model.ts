import { model, Schema } from 'mongoose';

export interface ICar {
  abs: boolean;
  ac: string;
  acceleration: string;
  adas: boolean;
  adjustableSeats: string;
  airbags: number;
  androidAuto: boolean;
  appleCarPlay: boolean;
  autonomyLevel?: string;
  batteryCapacity?: number;
  bluetoothConnectivity: boolean;
  bodyType: 'Convertible' | 'Coupe' | 'Hatchback' | 'MPV' | 'Sedan' | 'SUV' | 'Wagon';
  bootSpace: number;
  brakingSystem: string;
  brand: string;
  chargingTime?: string;
  color: string;
  connectedCarFeatures: boolean;
  cruiseControl: boolean;
  displacement: string;
  doors: number;
  driveModes: string[];
  driveType: string;
  drl: boolean;
  ebd: boolean;
  ecoMode: boolean;
  emissionStandard: string;
  engineCapacity: number;
  engineType: string;
  esc: boolean;
  fogLights: boolean;
  freeServices: number;
  frontBrakeType: string;
  frontSuspension: string;
  fuelTankCapacity: number;
  fuelType: string;
  gearbox: string;
  grossWeight: number;
  groundClearance: number;
  heatedSeats: boolean;
  height: number;
  hillAssist: boolean;
  imageUrl: string;
  infotainmentScreen: string;
  isAvailable: boolean;
  isofix: boolean;
  kerbWeight: number;
  keylessEntry: boolean;
  length: number;
  maxPower: string;
  maxTorque: string;
  mileageCity: number;
  mileageHighway: number;
  model: string;
  ncapRating?: number;
  panoramicSunroof: boolean;
  parkingSensors: string;
  powerSteering: boolean;
  powerWindows: string;
  price: number;
  pushButtonStart: boolean;
  range?: number;
  rearBrakeType: string;
  rearSuspension: string;
  reverseCamera: boolean;
  seatingCapacity: number;
  spareTire: string;
  speakers: number;
  sportMode: boolean;
  sunroof: boolean;
  taillightType: string;
  tireSize: string;
  topSpeed: string;
  touchscreen: boolean;
  tractionControl: boolean;
  transmission: string;
  usbPorts: number;
  variant: string;
  ventilatedSeats: boolean;
  warrantyKm: number;
  warrantyYears: number;
  wheelbase: number;
  wheelSize: string;
  width: number;
  wirelessCharging: boolean;
  year: number;
}

const carSchema = new Schema<ICar>(
  {
    abs: { required: true, type: Boolean },
    ac: { required: [true, 'AC type is required'], type: String },
    acceleration: { required: [true, 'Acceleration is required'], type: String },
    adas: { required: true, type: Boolean },
    adjustableSeats: { required: [true, 'Adjustable seats info is required'], type: String },
    airbags: { required: [true, 'Number of airbags is required'], type: Number },
    androidAuto: { required: true, type: Boolean },
    appleCarPlay: { required: true, type: Boolean },
    autonomyLevel: { type: String },
    batteryCapacity: { type: Number },
    bluetoothConnectivity: { required: true, type: Boolean },
    bodyType: { required: [true, 'Body type is required'], type: String },
    bootSpace: { required: [true, 'Boot space is required'], type: Number },
    brakingSystem: { required: [true, 'Braking system is required'], type: String },
    brand: { index: true, required: [true, 'Brand is required'], type: String },
    chargingTime: { type: String },
    color: { required: [true, 'Color is required'], type: String },
    connectedCarFeatures: { required: true, type: Boolean },
    cruiseControl: { required: true, type: Boolean },
    displacement: { required: [true, 'Displacement is required'], type: String },
    doors: { required: [true, 'Number of doors is required'], type: Number },
    driveModes: { default: [], type: [String] },
    driveType: { required: [true, 'Drive type is required'], type: String },
    drl: { required: true, type: Boolean },
    ebd: { required: true, type: Boolean },
    ecoMode: { required: true, type: Boolean },
    emissionStandard: { required: [true, 'Emission standard is required'], type: String },
    engineCapacity: { required: [true, 'Engine capacity is required'], type: Number },
    engineType: { required: [true, 'Engine type is required'], type: String },
    esc: { required: true, type: Boolean },
    fogLights: { required: true, type: Boolean },
    freeServices: { required: [true, 'Number of free services is required'], type: Number },
    frontBrakeType: { required: [true, 'Front brake type is required'], type: String },
    frontSuspension: { required: [true, 'Front suspension is required'], type: String },
    fuelTankCapacity: { required: [true, 'Fuel tank capacity is required'], type: Number },
    fuelType: { required: [true, 'Fuel type is required'], type: String },
    gearbox: { required: [true, 'Gearbox is required'], type: String },
    grossWeight: { required: [true, 'Gross weight is required'], type: Number },
    groundClearance: { required: [true, 'Ground clearance is required'], type: Number },
    heatedSeats: { required: true, type: Boolean },
    height: { required: [true, 'Height is required'], type: Number },
    hillAssist: { required: true, type: Boolean },
    imageUrl: { required: [true, 'Image URL is required'], type: String },
    infotainmentScreen: { required: [true, 'Infotainment screen size is required'], type: String },
    isAvailable: { default: true, required: true, type: Boolean },
    isofix: { required: true, type: Boolean },
    kerbWeight: { required: [true, 'Kerb weight is required'], type: Number },
    keylessEntry: { required: true, type: Boolean },
    length: { required: [true, 'Length is required'], type: Number },
    maxPower: { required: [true, 'Max power is required'], type: String },
    maxTorque: { required: [true, 'Max torque is required'], type: String },
    mileageCity: { required: [true, 'City mileage is required'], type: Number },
    mileageHighway: { required: [true, 'Highway mileage is required'], type: Number },
    model: { index: true, required: [true, 'Model is required'], type: String },
    ncapRating: { max: 5, min: 0, type: Number },
    panoramicSunroof: { required: true, type: Boolean },
    parkingSensors: { required: [true, 'Parking sensors info is required'], type: String },
    powerSteering: { required: true, type: Boolean },
    powerWindows: { required: [true, 'Power windows info is required'], type: String },
    price: { index: true, required: [true, 'Price is required'], type: Number },
    pushButtonStart: { required: true, type: Boolean },
    range: { type: Number },
    rearBrakeType: { required: [true, 'Rear brake type is required'], type: String },
    rearSuspension: { required: [true, 'Rear suspension is required'], type: String },
    reverseCamera: { required: true, type: Boolean },
    seatingCapacity: { required: [true, 'Seating capacity is required'], type: Number },
    spareTire: { required: [true, 'Spare tire type is required'], type: String },
    speakers: { required: [true, 'Number of speakers is required'], type: Number },
    sportMode: { required: true, type: Boolean },
    sunroof: { required: true, type: Boolean },
    taillightType: { required: [true, 'Taillight type is required'], type: String },
    tireSize: { required: [true, 'Tire size is required'], type: String },
    topSpeed: { required: [true, 'Top speed is required'], type: String },
    touchscreen: { required: true, type: Boolean },
    tractionControl: { required: true, type: Boolean },
    transmission: { required: [true, 'Transmission is required'], type: String },
    usbPorts: { required: [true, 'Number of USB ports is required'], type: Number },
    variant: { required: [true, 'Variant is required'], type: String },
    ventilatedSeats: { required: true, type: Boolean },
    warrantyKm: { required: [true, 'Warranty kilometers is required'], type: Number },
    warrantyYears: { required: [true, 'Warranty years is required'], type: Number },
    wheelbase: { required: [true, 'Wheelbase is required'], type: Number },
    wheelSize: { required: [true, 'Wheel size is required'], type: String },
    width: { required: [true, 'Width is required'], type: Number },
    wirelessCharging: { required: true, type: Boolean },
    year: { index: true, required: [true, 'Year is required'], type: Number },
  },
  {
    timestamps: true,
  }
);

carSchema.index({ brand: 1, model: 1 });
carSchema.index({ year: -1 });
carSchema.index({ bodyType: 1 });
carSchema.index({ fuelType: 1 });

export const Car = model<ICar>('Car', carSchema);
