import apiSlice from '@/app/apiSlice';

export interface ICar {
  _id: string;
  abs: boolean;
  ac: string;
  acceleration: string;
  adjustableSeats: string;
  adas: boolean;
  airbags: number;
  androidAuto: boolean;
  appleCarPlay: boolean;
  autonomyLevel: string;

  bluetoothConnectivity: boolean;
  bodyType: string;
  bootSpace: number;
  brand: string;
  brakingSystem: string;

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
  headlightType: string;
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

  ncapRating: number;

  panoramicSunroof: boolean;
  parkingSensors: string;
  powerSteering: boolean;
  powerWindows: string;
  price: number;
  pushButtonStart: boolean;

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
  wheelSize: string;
  wheelbase: number;
  width: number;
  wirelessCharging: boolean;

  year: number;
}

export interface CarListResponse {
  success: boolean;
  message: string;
  data: ICar[];
}

export interface CarDetailResponse {
  success: boolean;
  message: string;
  data: ICar;
}

export const carApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCars: builder.query<CarListResponse, string>({
      query: brand => ({
        url: '/cars',
        params: brand ? { brand } : {},
      }),
      providesTags: ['Car'],
    }),

    getCarById: builder.query<CarDetailResponse, string>({
      query: id => ({
        url: `/cars/${id}`,
      }),
    }),

    getCarBrands: builder.query<{ success: boolean; message: string; data: string[] }, void>({
      query: () => ({
        url: '/cars/brands',
      }),
    }),
  }),
});

export const { useGetAllCarsQuery, useGetCarByIdQuery, useGetCarBrandsQuery } = carApis;
