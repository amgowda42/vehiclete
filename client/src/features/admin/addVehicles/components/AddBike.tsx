import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateBikeMutation } from '@/features/bike/bikeApis';
import { toast } from 'sonner';

const AddBike = () => {
  const navigate = useNavigate();
  const [createBike, { isLoading }] = useCreateBikeMutation();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    varient: '',
    year: new Date().getFullYear(),
    color: '',
    price: '',
    engineCapacity: '',
    displacement: '',
    maxPower: '',
    maxTorque: '',
    transmission: '',
    coolingSystem: '',
    fuelTankCapacity: '',
    mileage: '',
    topSpeed: '',
    acceleration: '',
    frontSuspension: '',
    rearSuspension: '',
    frontBrakeType: '',
    rearBrakeType: '',
    brakingSystem: '',
    caliperType: '',
    seatHeight: '',
    seatLength: '',
    kerbWeight: '',
    groundClearance: '',
    abs: false,
    quickShifter: false,
    isAvailable: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      const bikeData = {
        ...formData,
        engineCapacity: Number(formData.engineCapacity),
        year: Number(formData.year),
        price: Number(formData.price),
        fuelTankCapacity: Number(formData.fuelTankCapacity),
        mileage: Number(formData.mileage),
        seatHeight: Number(formData.seatHeight),
        seatLength: Number(formData.seatLength),
        kerbWeight: Number(formData.kerbWeight),
        groundClearance: formData.groundClearance ? Number(formData.groundClearance) : undefined,
        image: imageFile,
      };

      const response = await createBike(bikeData).unwrap();
      toast.success(response.message || 'Bike created successfully!');
      navigate('/bikes');
    } catch (error: any) {
      console.error('Error creating bike:', error);
      toast.error(error?.data?.message || 'Failed to create bike');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Add New Bike</h2>

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
                    <div className="text-slate-400 text-5xl">📷</div>
                    <p className="text-slate-600 font-medium">Click to upload bike image</p>
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
                    name="varient"
                    value={formData.varient}
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

            {/* Engine Specifications */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Engine Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    placeholder="e.g., 649cc"
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
                    placeholder="e.g., 47.6 PS @ 8500 rpm"
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
                    placeholder="e.g., 52.3 Nm @ 6700 rpm"
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
                    placeholder="e.g., 6-Speed"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Cooling System *
                  </label>
                  <input
                    type="text"
                    name="coolingSystem"
                    value={formData.coolingSystem}
                    onChange={handleInputChange}
                    placeholder="e.g., Liquid Cooled"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    Mileage (km/l) *
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
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
                    placeholder="e.g., 170 km/h"
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
                    placeholder="e.g., 0-100 in 4.5s"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Suspension & Brakes */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Suspension & Brakes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Front Suspension *
                  </label>
                  <input
                    type="text"
                    name="frontSuspension"
                    value={formData.frontSuspension}
                    onChange={handleInputChange}
                    placeholder="e.g., USD Fork"
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
                    placeholder="e.g., Monoshock"
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
                    placeholder="e.g., Disc"
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
                    placeholder="e.g., Dual Channel ABS"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Caliper Type *
                  </label>
                  <input
                    type="text"
                    name="caliperType"
                    value={formData.caliperType}
                    onChange={handleInputChange}
                    placeholder="e.g., Radial"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dimensions & Weight */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">
                Dimensions & Weight
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Seat Height (mm) *
                  </label>
                  <input
                    type="number"
                    name="seatHeight"
                    value={formData.seatHeight}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Seat Length (mm) *
                  </label>
                  <input
                    type="number"
                    name="seatLength"
                    value={formData.seatLength}
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
                    Ground Clearance (mm)
                  </label>
                  <input
                    type="number"
                    name="groundClearance"
                    value={formData.groundClearance}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    ABS (Anti-lock Braking System)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="quickShifter"
                    name="quickShifter"
                    checked={formData.quickShifter}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="quickShifter" className="ml-2 text-sm font-medium text-slate-700">
                    Quick Shifter
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isAvailable" className="ml-2 text-sm font-medium text-slate-700">
                    Available for Sale
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/bikes')}
                className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Bike'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBike;
