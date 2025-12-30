import { Eye } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import type { ICar } from '../carApis';

const OverviewSection = ({ car }: { car: ICar }) => (
  <SectionWrapper id="overview" title="Overview" icon={<Eye className="w-5 h-5" />}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Engine Capacity</p>
        <p className="text-xl font-bold text-slate-900">{car.displacement}</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Max Power</p>
        <p className="text-xl font-bold text-slate-900">{car.maxPower}</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">City Mileage</p>
        <p className="text-xl font-bold text-slate-900">{car.mileageCity} km/l</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Seating</p>
        <p className="text-xl font-bold text-slate-900">{car.seatingCapacity} Seats</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Fuel Tank</p>
        <p className="text-xl font-bold text-slate-900">{car.fuelTankCapacity}L</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Boot Space</p>
        <p className="text-xl font-bold text-slate-900">{car.bootSpace}L</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Ground Clearance</p>
        <p className="text-xl font-bold text-slate-900">{car.groundClearance}mm</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Drive Type</p>
        <p className="text-xl font-bold text-slate-900">{car.driveType}</p>
      </div>
    </div>
  </SectionWrapper>
);

export default OverviewSection;
