import type { ICar } from '../carApis';
import SectionWrapper from './SectionWrapper';
import { Award, Gauge, Calendar, Settings } from 'lucide-react';

const SpecificationsSection = ({ car }: { car: ICar }) => (
  <SectionWrapper
    id="specifications"
    title="Technical Specifications"
    icon={<Settings className="w-5 h-5" />}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-slate-800">Suspension & Wheels</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Front Suspension</span>
            <span className="font-semibold text-slate-900">{car.frontSuspension}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Rear Suspension</span>
            <span className="font-semibold text-slate-900">{car.rearSuspension}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Wheel Size</span>
            <span className="font-semibold text-slate-900">{car.wheelSize}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Tire Size</span>
            <span className="font-semibold text-slate-900">{car.tireSize}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Spare Tire</span>
            <span className="font-semibold text-slate-900">{car.spareTire}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-slate-800">Warranty & Service</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-slate-600">Warranty Period</p>
              <p className="text-lg font-bold text-slate-900">{car.warrantyYears} Years</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
            <Gauge className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-slate-600">Warranty Distance</p>
              <p className="text-lg font-bold text-slate-900">
                {car.warrantyKm.toLocaleString()} km
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <Award className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-slate-600">Free Services</p>
              <p className="text-lg font-bold text-slate-900">{car.freeServices} Services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default SpecificationsSection;
