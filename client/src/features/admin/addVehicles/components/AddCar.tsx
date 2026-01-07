import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateCarMutation } from '@/features/car/carApis';
import { toast } from 'sonner';

const AddCar = () => {
  const navigate = useNavigate();
  const [createCar, { isLoading }] = useCreateCarMutation();

  const [formData, setFormData] = useState({
    // Basic Information
    brand: '',
    model: '',
    variant: '',
    year: new Date().getFullYear(),
    bodyType: 'Sedan' as const,
    color: '',
    price: '',
    isAvailable: true,

    // Engine & Performance
    engineType: '',
    engineCapacity: '',
    displacement: '',
    fuelType: '',
    maxPower: '',
    maxTorque: '',
    acceleration: '',
    topSpeed: '',
    driveType: '',
    transmission: '',
    gearbox: '',

    // Fuel & Efficiency
    fuelTankCapacity: '',
    mileageCity: '',
    mileageHighway: '',
    emissionStandard: '',
    range: '',
    batteryCapacity: '',
    chargingTime: '',

    // Dimensions & Capacity
    length: '',
    width: '',
    height: '',
    wheelbase: '',
    groundClearance: '',
    kerbWeight: '',
    grossWeight: '',
    bootSpace: '',
    seatingCapacity: '',
    doors: '',

    // Suspension & Brakes
    frontSuspension: '',
    rearSuspension: '',
    frontBrakeType: '',
    rearBrakeType: '',
    brakingSystem: '',

    // Wheels & Tires
    wheelSize: '',
    tireSize: '',
    spareTire: '',

    // Safety Features
    airbags: '',
    abs: false,
    ebd: false,
    esc: false,
    tractionControl: false,
    hillAssist: false,
    isofix: false,
    parkingSensors: '',
    reverseCamera: false,
    ncapRating: '',

    // Comfort & Convenience
    ac: '',
    powerSteering: false,
    powerWindows: '',
    adjustableSeats: '',
    cruiseControl: false,
    keylessEntry: false,
    pushButtonStart: false,
    sunroof: false,
    panoramicSunroof: false,
    ventilatedSeats: false,
    heatedSeats: false,

    // Infotainment & Technology
    infotainmentScreen: '',
    touchscreen: false,
    androidAuto: false,
    appleCarPlay: false,
    bluetoothConnectivity: false,
    usbPorts: '',
    speakers: '',
    wirelessCharging: false,
    connectedCarFeatures: false,

    // Lighting
    headlightType: '',
    drl: false,
    fogLights: false,
    taillightType: '',

    // Additional Features
    ecoMode: false,
    sportMode: false,
    adas: false,
    driveModes: [] as string[],
    autonomyLevel: '',

    // Warranty & Service
    warrantyYears: '',
    warrantyKm: '',
    freeServices: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [driveMode, setDriveMode] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDriveMode = () => {
    if (driveMode.trim() && !formData.driveModes.includes(driveMode.trim())) {
      setFormData(prev => ({
        ...prev,
        driveModes: [...prev.driveModes, driveMode.trim()],
      }));
      setDriveMode('');
    }
  };

  const handleRemoveDriveMode = (mode: string) => {
    setFormData(prev => ({
      ...prev,
      driveModes: prev.driveModes.filter(m => m !== mode),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      const carData: any = {
        // Basic Information
        brand: formData.brand,
        model: formData.model,
        variant: formData.variant,
        year: Number(formData.year),
        bodyType: formData.bodyType,
        color: formData.color,
        price: Number(formData.price),
        isAvailable: formData.isAvailable,

        // Engine & Performance
        engineType: formData.engineType,
        engineCapacity: Number(formData.engineCapacity),
        displacement: formData.displacement,
        fuelType: formData.fuelType,
        maxPower: formData.maxPower,
        maxTorque: formData.maxTorque,
        acceleration: formData.acceleration,
        topSpeed: formData.topSpeed,
        driveType: formData.driveType,
        transmission: formData.transmission,
        gearbox: formData.gearbox,

        // Fuel & Efficiency
        fuelTankCapacity: Number(formData.fuelTankCapacity),
        mileageCity: Number(formData.mileageCity),
        mileageHighway: Number(formData.mileageHighway),
        emissionStandard: formData.emissionStandard,

        // Dimensions & Capacity
        length: Number(formData.length),
        width: Number(formData.width),
        height: Number(formData.height),
        wheelbase: Number(formData.wheelbase),
        groundClearance: Number(formData.groundClearance),
        kerbWeight: Number(formData.kerbWeight),
        grossWeight: Number(formData.grossWeight),
        bootSpace: Number(formData.bootSpace),
        seatingCapacity: Number(formData.seatingCapacity),
        doors: Number(formData.doors),

        // Suspension & Brakes
        frontSuspension: formData.frontSuspension,
        rearSuspension: formData.rearSuspension,
        frontBrakeType: formData.frontBrakeType,
        rearBrakeType: formData.rearBrakeType,
        brakingSystem: formData.brakingSystem,

        // Wheels & Tires
        wheelSize: formData.wheelSize,
        tireSize: formData.tireSize,
        spareTire: formData.spareTire,

        // Safety Features
        airbags: Number(formData.airbags),
        abs: formData.abs,
        ebd: formData.ebd,
        esc: formData.esc,
        tractionControl: formData.tractionControl,
        hillAssist: formData.hillAssist,
        isofix: formData.isofix,
        parkingSensors: formData.parkingSensors,
        reverseCamera: formData.reverseCamera,

        // Comfort & Convenience
        ac: formData.ac,
        powerSteering: formData.powerSteering,
        powerWindows: formData.powerWindows,
        adjustableSeats: formData.adjustableSeats,
        cruiseControl: formData.cruiseControl,
        keylessEntry: formData.keylessEntry,
        pushButtonStart: formData.pushButtonStart,
        sunroof: formData.sunroof,
        panoramicSunroof: formData.panoramicSunroof,
        ventilatedSeats: formData.ventilatedSeats,
        heatedSeats: formData.heatedSeats,

        // Infotainment & Technology
        infotainmentScreen: formData.infotainmentScreen,
        touchscreen: formData.touchscreen,
        androidAuto: formData.androidAuto,
        appleCarPlay: formData.appleCarPlay,
        bluetoothConnectivity: formData.bluetoothConnectivity,
        usbPorts: Number(formData.usbPorts),
        speakers: Number(formData.speakers),
        wirelessCharging: formData.wirelessCharging,
        connectedCarFeatures: formData.connectedCarFeatures,

        // Lighting
        headlightType: formData.headlightType,
        drl: formData.drl,
        fogLights: formData.fogLights,
        taillightType: formData.taillightType,

        // Additional Features
        ecoMode: formData.ecoMode,
        sportMode: formData.sportMode,
        adas: formData.adas,

        // Warranty & Service
        warrantyYears: Number(formData.warrantyYears),
        warrantyKm: Number(formData.warrantyKm),
        freeServices: Number(formData.freeServices),

        image: imageFile,
      };

      // Add optional fields only if they have values
      if (formData.range) carData.range = Number(formData.range);
      if (formData.batteryCapacity) carData.batteryCapacity = Number(formData.batteryCapacity);
      if (formData.chargingTime) carData.chargingTime = formData.chargingTime;
      if (formData.ncapRating) carData.ncapRating = Number(formData.ncapRating);
      if (formData.driveModes.length > 0) carData.driveModes = formData.driveModes;
      if (formData.autonomyLevel) carData.autonomyLevel = formData.autonomyLevel;

      const response = await createCar(carData).unwrap();
      toast.success(response.message || 'Car created successfully!');
      navigate('/cars');
    } catch (error: any) {
      console.error('Error creating car:', error);
      toast.error(error?.data?.message || 'Failed to create car');
    }
  };

  const bodyTypes = [
    'Sedan',
    'SUV',
    'Hatchback',
    'Coupe',
    'Convertible',
    'Wagon',
    'Van',
    'Truck',
    'Crossover',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Add New Car</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />
              <label htmlFor="image" className="cursor-pointer">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-48 w-auto object-cover rounded-lg"
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="text-slate-400 text-5xl">🚗</div>
                    <p className="text-slate-600 font-medium">Click to upload car image</p>
                    <p className="text-sm text-slate-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </label>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Brand *</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Model *</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Variant *</label>
                  <input
                    type="text"
                    name="variant"
                    value={formData.variant}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Year *</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Body Type *
                  </label>
                  <select
                    name="bodyType"
                    value={formData.bodyType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {bodyTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Color *</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Engine & Performance */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Engine & Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Engine Type *
                  </label>
                  <input
                    type="text"
                    name="engineType"
                    value={formData.engineType}
                    onChange={handleInputChange}
                    placeholder="e.g., Inline-4"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Engine Capacity (cc) *
                  </label>
                  <input
                    type="number"
                    name="engineCapacity"
                    value={formData.engineCapacity}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Displacement *
                  </label>
                  <input
                    type="text"
                    name="displacement"
                    value={formData.displacement}
                    onChange={handleInputChange}
                    placeholder="e.g., 1498cc"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Fuel Type *
                  </label>
                  <input
                    type="text"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    placeholder="e.g., Petrol/Diesel/Electric"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max Power *
                  </label>
                  <input
                    type="text"
                    name="maxPower"
                    value={formData.maxPower}
                    onChange={handleInputChange}
                    placeholder="e.g., 150 PS @ 5500 rpm"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max Torque *
                  </label>
                  <input
                    type="text"
                    name="maxTorque"
                    value={formData.maxTorque}
                    onChange={handleInputChange}
                    placeholder="e.g., 250 Nm @ 2500 rpm"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Acceleration *
                  </label>
                  <input
                    type="text"
                    name="acceleration"
                    value={formData.acceleration}
                    onChange={handleInputChange}
                    placeholder="e.g., 0-100 in 9.5s"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Top Speed *
                  </label>
                  <input
                    type="text"
                    name="topSpeed"
                    value={formData.topSpeed}
                    onChange={handleInputChange}
                    placeholder="e.g., 200 km/h"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Drive Type *
                  </label>
                  <input
                    type="text"
                    name="driveType"
                    value={formData.driveType}
                    onChange={handleInputChange}
                    placeholder="e.g., FWD/RWD/AWD"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Transmission *
                  </label>
                  <input
                    type="text"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    placeholder="e.g., Manual/Automatic"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gearbox *</label>
                  <input
                    type="text"
                    name="gearbox"
                    value={formData.gearbox}
                    onChange={handleInputChange}
                    placeholder="e.g., 6-Speed Manual"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Fuel & Efficiency */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Fuel & Efficiency
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Fuel Tank Capacity (L) *
                  </label>
                  <input
                    type="number"
                    name="fuelTankCapacity"
                    value={formData.fuelTankCapacity}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mileage City (km/l) *
                  </label>
                  <input
                    type="number"
                    name="mileageCity"
                    value={formData.mileageCity}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mileage Highway (km/l) *
                  </label>
                  <input
                    type="number"
                    name="mileageHighway"
                    value={formData.mileageHighway}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Emission Standard *
                  </label>
                  <input
                    type="text"
                    name="emissionStandard"
                    value={formData.emissionStandard}
                    onChange={handleInputChange}
                    placeholder="e.g., BS6"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Range (km) - EV Only
                  </label>
                  <input
                    type="number"
                    name="range"
                    value={formData.range}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Battery Capacity (kWh) - EV
                  </label>
                  <input
                    type="number"
                    name="batteryCapacity"
                    value={formData.batteryCapacity}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Charging Time - EV
                  </label>
                  <input
                    type="text"
                    name="chargingTime"
                    value={formData.chargingTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 8 hours"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Suspension, Brakes & Wheels */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Suspension, Brakes & Wheels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Front Suspension *
                  </label>
                  <input
                    type="text"
                    name="frontSuspension"
                    value={formData.frontSuspension}
                    onChange={handleInputChange}
                    placeholder="e.g., MacPherson Strut"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Rear Suspension *
                  </label>
                  <input
                    type="text"
                    name="rearSuspension"
                    value={formData.rearSuspension}
                    onChange={handleInputChange}
                    placeholder="e.g., Multi-Link"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Front Brake Type *
                  </label>
                  <input
                    type="text"
                    name="frontBrakeType"
                    value={formData.frontBrakeType}
                    onChange={handleInputChange}
                    placeholder="e.g., Ventilated Disc"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Rear Brake Type *
                  </label>
                  <input
                    type="text"
                    name="rearBrakeType"
                    value={formData.rearBrakeType}
                    onChange={handleInputChange}
                    placeholder="e.g., Disc"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Braking System *
                  </label>
                  <input
                    type="text"
                    name="brakingSystem"
                    value={formData.brakingSystem}
                    onChange={handleInputChange}
                    placeholder="e.g., ABS with EBD"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Wheel Size *
                  </label>
                  <input
                    type="text"
                    name="wheelSize"
                    value={formData.wheelSize}
                    onChange={handleInputChange}
                    placeholder="e.g., 17 inch"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tire Size *
                  </label>
                  <input
                    type="text"
                    name="tireSize"
                    value={formData.tireSize}
                    onChange={handleInputChange}
                    placeholder="e.g., 215/60 R17"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Spare Tire *
                  </label>
                  <input
                    type="text"
                    name="spareTire"
                    value={formData.spareTire}
                    onChange={handleInputChange}
                    placeholder="e.g., Full Size"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dimensions & Capacity */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Dimensions & Capacity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Length (mm) *
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Width (mm) *
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Height (mm) *
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Wheelbase (mm) *
                  </label>
                  <input
                    type="number"
                    name="wheelbase"
                    value={formData.wheelbase}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ground Clearance (mm) *
                  </label>
                  <input
                    type="number"
                    name="groundClearance"
                    value={formData.groundClearance}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Kerb Weight (kg) *
                  </label>
                  <input
                    type="number"
                    name="kerbWeight"
                    value={formData.kerbWeight}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Gross Weight (kg) *
                  </label>
                  <input
                    type="number"
                    name="grossWeight"
                    value={formData.grossWeight}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Boot Space (L) *
                  </label>
                  <input
                    type="number"
                    name="bootSpace"
                    value={formData.bootSpace}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Seating Capacity *
                  </label>
                  <input
                    type="number"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Doors *</label>
                  <input
                    type="number"
                    name="doors"
                    value={formData.doors}
                    onChange={handleInputChange}
                    min="2"
                    max="6"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Comfort & Convenience */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Comfort & Convenience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">AC Type *</label>
                  <input
                    type="text"
                    name="ac"
                    value={formData.ac}
                    onChange={handleInputChange}
                    placeholder="e.g., Dual Zone Climate Control"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Power Windows *
                  </label>
                  <input
                    type="text"
                    name="powerWindows"
                    value={formData.powerWindows}
                    onChange={handleInputChange}
                    placeholder="e.g., All 4 Windows"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Adjustable Seats *
                  </label>
                  <input
                    type="text"
                    name="adjustableSeats"
                    value={formData.adjustableSeats}
                    onChange={handleInputChange}
                    placeholder="e.g., Driver & Co-Driver"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="powerSteering"
                    name="powerSteering"
                    checked={formData.powerSteering}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="powerSteering"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Power Steering
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cruiseControl"
                    name="cruiseControl"
                    checked={formData.cruiseControl}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="cruiseControl"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Cruise Control
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="keylessEntry"
                    name="keylessEntry"
                    checked={formData.keylessEntry}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="keylessEntry" className="ml-2 text-sm font-medium text-slate-700">
                    Keyless Entry
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pushButtonStart"
                    name="pushButtonStart"
                    checked={formData.pushButtonStart}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="pushButtonStart"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Push Button Start
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sunroof"
                    name="sunroof"
                    checked={formData.sunroof}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="sunroof" className="ml-2 text-sm font-medium text-slate-700">
                    Sunroof
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="panoramicSunroof"
                    name="panoramicSunroof"
                    checked={formData.panoramicSunroof}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="panoramicSunroof"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Panoramic Sunroof
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ventilatedSeats"
                    name="ventilatedSeats"
                    checked={formData.ventilatedSeats}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="ventilatedSeats"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Ventilated Seats
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="heatedSeats"
                    name="heatedSeats"
                    checked={formData.heatedSeats}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="heatedSeats" className="ml-2 text-sm font-medium text-slate-700">
                    Heated Seats
                  </label>
                </div>
              </div>
            </div>

            {/* Infotainment & Technology */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Infotainment & Technology
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Infotainment Screen *
                  </label>
                  <input
                    type="text"
                    name="infotainmentScreen"
                    value={formData.infotainmentScreen}
                    onChange={handleInputChange}
                    placeholder="e.g., 10.25 inch"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    USB Ports *
                  </label>
                  <input
                    type="number"
                    name="usbPorts"
                    value={formData.usbPorts}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Speakers *
                  </label>
                  <input
                    type="number"
                    name="speakers"
                    value={formData.speakers}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="touchscreen"
                    name="touchscreen"
                    checked={formData.touchscreen}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="touchscreen" className="ml-2 text-sm font-medium text-slate-700">
                    Touchscreen
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="androidAuto"
                    name="androidAuto"
                    checked={formData.androidAuto}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="androidAuto" className="ml-2 text-sm font-medium text-slate-700">
                    Android Auto
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="appleCarPlay"
                    name="appleCarPlay"
                    checked={formData.appleCarPlay}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="appleCarPlay" className="ml-2 text-sm font-medium text-slate-700">
                    Apple CarPlay
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bluetoothConnectivity"
                    name="bluetoothConnectivity"
                    checked={formData.bluetoothConnectivity}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="bluetoothConnectivity"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Bluetooth
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="wirelessCharging"
                    name="wirelessCharging"
                    checked={formData.wirelessCharging}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="wirelessCharging"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Wireless Charging
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="connectedCarFeatures"
                    name="connectedCarFeatures"
                    checked={formData.connectedCarFeatures}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="connectedCarFeatures"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Connected Car
                  </label>
                </div>
              </div>
            </div>

            {/* Lighting */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">Lighting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Headlight Type *
                  </label>
                  <input
                    type="text"
                    name="headlightType"
                    value={formData.headlightType}
                    onChange={handleInputChange}
                    placeholder="e.g., LED"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Taillight Type *
                  </label>
                  <input
                    type="text"
                    name="taillightType"
                    value={formData.taillightType}
                    onChange={handleInputChange}
                    placeholder="e.g., LED"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="drl"
                    name="drl"
                    checked={formData.drl}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="drl" className="ml-2 text-sm font-medium text-slate-700">
                    DRL (Daytime Running Lights)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fogLights"
                    name="fogLights"
                    checked={formData.fogLights}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="fogLights" className="ml-2 text-sm font-medium text-slate-700">
                    Fog Lights
                  </label>
                </div>
              </div>
            </div>

            {/* Safety Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Safety Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Airbags *</label>
                  <input
                    type="number"
                    name="airbags"
                    value={formData.airbags}
                    onChange={handleInputChange}
                    min="0"
                    max="12"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Parking Sensors *
                  </label>
                  <input
                    type="text"
                    name="parkingSensors"
                    value={formData.parkingSensors}
                    onChange={handleInputChange}
                    placeholder="e.g., Front & Rear"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    NCAP Rating
                  </label>
                  <input
                    type="number"
                    name="ncapRating"
                    value={formData.ncapRating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="abs"
                    name="abs"
                    checked={formData.abs}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="abs" className="ml-2 text-sm font-medium text-slate-700">
                    ABS
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ebd"
                    name="ebd"
                    checked={formData.ebd}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="ebd" className="ml-2 text-sm font-medium text-slate-700">
                    EBD
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="esc"
                    name="esc"
                    checked={formData.esc}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="esc" className="ml-2 text-sm font-medium text-slate-700">
                    ESC
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tractionControl"
                    name="tractionControl"
                    checked={formData.tractionControl}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="tractionControl"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Traction Control
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hillAssist"
                    name="hillAssist"
                    checked={formData.hillAssist}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hillAssist" className="ml-2 text-sm font-medium text-slate-700">
                    Hill Assist
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isofix"
                    name="isofix"
                    checked={formData.isofix}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isofix" className="ml-2 text-sm font-medium text-slate-700">
                    ISOFIX
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="reverseCamera"
                    name="reverseCamera"
                    checked={formData.reverseCamera}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="reverseCamera"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    Reverse Camera
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Features & Drive Modes */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Additional Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ecoMode"
                    name="ecoMode"
                    checked={formData.ecoMode}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="ecoMode" className="ml-2 text-sm font-medium text-slate-700">
                    Eco Mode
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sportMode"
                    name="sportMode"
                    checked={formData.sportMode}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="sportMode" className="ml-2 text-sm font-medium text-slate-700">
                    Sport Mode
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="adas"
                    name="adas"
                    checked={formData.adas}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="adas" className="ml-2 text-sm font-medium text-slate-700">
                    ADAS
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Drive Modes</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={driveMode}
                    onChange={e => setDriveMode(e.target.value)}
                    placeholder="e.g., Sport, Eco, Normal"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddDriveMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.driveModes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.driveModes.map((mode, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {mode}
                        <button
                          type="button"
                          onClick={() => handleRemoveDriveMode(mode)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Autonomy Level
                </label>
                <input
                  type="text"
                  name="autonomyLevel"
                  value={formData.autonomyLevel}
                  onChange={handleInputChange}
                  placeholder="e.g., Level 2"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Warranty & Service */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Warranty & Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Warranty (Years) *
                  </label>
                  <input
                    type="number"
                    name="warrantyYears"
                    value={formData.warrantyYears}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Warranty (Km) *
                  </label>
                  <input
                    type="number"
                    name="warrantyKm"
                    value={formData.warrantyKm}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Free Services *
                  </label>
                  <input
                    type="number"
                    name="freeServices"
                    value={formData.freeServices}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/cars')}
                className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Car'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
