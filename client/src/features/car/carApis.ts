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

export interface CarFormData {
  // Basic Information
  brand: string;
  model: string;
  variant: string;
  year: number;
  bodyType: ICar['bodyType'];
  color: string;
  image: File;
  isAvailable?: boolean;
  price: number;

  // Engine & Performance
  engineType: string;
  engineCapacity: number;
  displacement: string;
  fuelType: string;
  maxPower: string;
  maxTorque: string;
  acceleration: string;
  topSpeed: string;
  driveType: string;
  transmission: string;
  gearbox: string;

  // Fuel & Efficiency
  fuelTankCapacity: number;
  mileageCity: number;
  mileageHighway: number;
  emissionStandard: string;
  range?: number;
  batteryCapacity?: number;
  chargingTime?: string;

  // Dimensions & Capacity
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  groundClearance: number;
  kerbWeight: number;
  grossWeight: number;
  bootSpace: number;
  seatingCapacity: number;
  doors: number;

  // Suspension & Brakes
  frontSuspension: string;
  rearSuspension: string;
  frontBrakeType: string;
  rearBrakeType: string;
  brakingSystem: string;

  // Wheels & Tires
  wheelSize: string;
  tireSize: string;
  spareTire: string;

  // Safety Features
  airbags: number;
  abs: boolean;
  ebd: boolean;
  esc: boolean;
  tractionControl: boolean;
  hillAssist: boolean;
  isofix: boolean;
  parkingSensors: string;
  reverseCamera: boolean;
  ncapRating?: number;

  // Comfort & Convenience
  ac: string;
  powerSteering: boolean;
  powerWindows: string;
  adjustableSeats: string;
  cruiseControl: boolean;
  keylessEntry: boolean;
  pushButtonStart: boolean;
  sunroof: boolean;
  panoramicSunroof: boolean;
  ventilatedSeats: boolean;
  heatedSeats: boolean;

  // Infotainment & Technology
  infotainmentScreen: string;
  touchscreen: boolean;
  androidAuto: boolean;
  appleCarPlay: boolean;
  bluetoothConnectivity: boolean;
  usbPorts: number;
  speakers: number;
  wirelessCharging: boolean;
  connectedCarFeatures: boolean;

  // Lighting
  headlightType: string;
  drl: boolean;
  fogLights: boolean;
  taillightType: string;

  // Additional Features
  ecoMode: boolean;
  sportMode: boolean;
  adas: boolean;
  driveModes?: string[];
  autonomyLevel?: string;

  // Warranty & Service
  warrantyYears: number;
  warrantyKm: number;
  freeServices: number;
}

export interface UpdateCarFormData extends Partial<CarFormData> {
  id: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const carApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCars: builder.query<CarListResponse, void>({
      query: () => ({
        url: '/cars',
      }),
      providesTags: ['Car'],
    }),

    getCarById: builder.query<CarDetailResponse, string>({
      query: id => ({
        url: `/cars/${id}`,
      }),
    }),

    createCar: builder.mutation<ApiResponse<ICar>, CarFormData>({
      query: data => {
        const formData = new FormData();

        // Basic Information
        formData.append('brand', data.brand);
        formData.append('model', data.model);
        formData.append('variant', data.variant);
        formData.append('year', String(data.year));
        formData.append('bodyType', data.bodyType);
        formData.append('color', data.color);
        formData.append('isAvailable', String(data.isAvailable ?? true));
        formData.append('price', String(data.price));

        // Engine & Performance
        formData.append('engineType', data.engineType);
        formData.append('engineCapacity', String(data.engineCapacity));
        formData.append('displacement', data.displacement);
        formData.append('fuelType', data.fuelType);
        formData.append('maxPower', data.maxPower);
        formData.append('maxTorque', data.maxTorque);
        formData.append('acceleration', data.acceleration);
        formData.append('topSpeed', data.topSpeed);
        formData.append('driveType', data.driveType);
        formData.append('transmission', data.transmission);
        formData.append('gearbox', data.gearbox);

        // Fuel & Efficiency
        formData.append('fuelTankCapacity', String(data.fuelTankCapacity));
        formData.append('mileageCity', String(data.mileageCity));
        formData.append('mileageHighway', String(data.mileageHighway));
        formData.append('emissionStandard', data.emissionStandard);

        if (data.range !== undefined) formData.append('range', String(data.range));
        if (data.batteryCapacity !== undefined)
          formData.append('batteryCapacity', String(data.batteryCapacity));
        if (data.chargingTime) formData.append('chargingTime', data.chargingTime);

        // Dimensions & Capacity
        formData.append('length', String(data.length));
        formData.append('width', String(data.width));
        formData.append('height', String(data.height));
        formData.append('wheelbase', String(data.wheelbase));
        formData.append('groundClearance', String(data.groundClearance));
        formData.append('kerbWeight', String(data.kerbWeight));
        formData.append('grossWeight', String(data.grossWeight));
        formData.append('bootSpace', String(data.bootSpace));
        formData.append('seatingCapacity', String(data.seatingCapacity));
        formData.append('doors', String(data.doors));

        // Suspension & Brakes
        formData.append('frontSuspension', data.frontSuspension);
        formData.append('rearSuspension', data.rearSuspension);
        formData.append('frontBrakeType', data.frontBrakeType);
        formData.append('rearBrakeType', data.rearBrakeType);
        formData.append('brakingSystem', data.brakingSystem);

        // Wheels & Tires
        formData.append('wheelSize', data.wheelSize);
        formData.append('tireSize', data.tireSize);
        formData.append('spareTire', data.spareTire);

        // Safety Features
        formData.append('airbags', String(data.airbags));
        formData.append('abs', String(data.abs));
        formData.append('ebd', String(data.ebd));
        formData.append('esc', String(data.esc));
        formData.append('tractionControl', String(data.tractionControl));
        formData.append('hillAssist', String(data.hillAssist));
        formData.append('isofix', String(data.isofix));
        formData.append('parkingSensors', data.parkingSensors);
        formData.append('reverseCamera', String(data.reverseCamera));
        if (data.ncapRating !== undefined) formData.append('ncapRating', String(data.ncapRating));

        // Comfort & Convenience
        formData.append('ac', data.ac);
        formData.append('powerSteering', String(data.powerSteering));
        formData.append('powerWindows', data.powerWindows);
        formData.append('adjustableSeats', data.adjustableSeats);
        formData.append('cruiseControl', String(data.cruiseControl));
        formData.append('keylessEntry', String(data.keylessEntry));
        formData.append('pushButtonStart', String(data.pushButtonStart));
        formData.append('sunroof', String(data.sunroof));
        formData.append('panoramicSunroof', String(data.panoramicSunroof));
        formData.append('ventilatedSeats', String(data.ventilatedSeats));
        formData.append('heatedSeats', String(data.heatedSeats));

        // Infotainment & Technology
        formData.append('infotainmentScreen', data.infotainmentScreen);
        formData.append('touchscreen', String(data.touchscreen));
        formData.append('androidAuto', String(data.androidAuto));
        formData.append('appleCarPlay', String(data.appleCarPlay));
        formData.append('bluetoothConnectivity', String(data.bluetoothConnectivity));
        formData.append('usbPorts', String(data.usbPorts));
        formData.append('speakers', String(data.speakers));
        formData.append('wirelessCharging', String(data.wirelessCharging));
        formData.append('connectedCarFeatures', String(data.connectedCarFeatures));

        // Lighting
        formData.append('headlightType', data.headlightType);
        formData.append('drl', String(data.drl));
        formData.append('fogLights', String(data.fogLights));
        formData.append('taillightType', data.taillightType);

        // Additional Features
        formData.append('ecoMode', String(data.ecoMode));
        formData.append('sportMode', String(data.sportMode));
        formData.append('adas', String(data.adas));
        if (data.driveModes && data.driveModes.length > 0) {
          formData.append('driveModes', JSON.stringify(data.driveModes));
        }
        if (data.autonomyLevel) formData.append('autonomyLevel', data.autonomyLevel);

        // Warranty & Service
        formData.append('warrantyYears', String(data.warrantyYears));
        formData.append('warrantyKm', String(data.warrantyKm));
        formData.append('freeServices', String(data.freeServices));

        // Append image file
        formData.append('image', data.image);

        return {
          url: '/cars',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Car'],
    }),
  }),
});

export const { useGetAllCarsQuery, useGetCarByIdQuery, useCreateCarMutation } = carApis;
