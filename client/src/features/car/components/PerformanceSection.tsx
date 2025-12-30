import { TrendingUp } from 'lucide-react';
import type { ICar } from '../carApis';
import SectionWrapper from './SectionWrapper';

const PerformanceSection = ({ car }: { car: ICar }) => (
  <SectionWrapper id="performance" title="Performance" icon={<TrendingUp className="w-5 h-5" />}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-slate-800">Engine Specifications</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Engine Type</span>
            <span className="font-semibold text-slate-900">{car.engineType}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Displacement</span>
            <span className="font-semibold text-slate-900">{car.displacement}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Max Power</span>
            <span className="font-semibold text-slate-900">{car.maxPower}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Max Torque</span>
            <span className="font-semibold text-slate-900">{car.maxTorque}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Transmission</span>
            <span className="font-semibold text-slate-900">{car.transmission}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Gearbox</span>
            <span className="font-semibold text-slate-900">{car.gearbox}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-slate-800">Performance Metrics</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">0-100 km/h</span>
            <span className="font-semibold text-slate-900">{car.acceleration}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Top Speed</span>
            <span className="font-semibold text-slate-900">{car.topSpeed}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">City Mileage</span>
            <span className="font-semibold text-slate-900">{car.mileageCity} km/l</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Highway Mileage</span>
            <span className="font-semibold text-slate-900">{car.mileageHighway} km/l</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Emission Standard</span>
            <span className="font-semibold text-slate-900">{car.emissionStandard}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Drive Modes</span>
            <span className="font-semibold text-slate-900">{car.driveModes.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default PerformanceSection;
