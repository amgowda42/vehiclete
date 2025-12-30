import type { ICar } from '../carApis';
import SectionWrapper from './SectionWrapper';
import { Ruler } from 'lucide-react';

const DimensionsSection = ({ car }: { car: ICar }) => (
  <SectionWrapper id="dimensions" title="Dimensions & Weight" icon={<Ruler className="w-5 h-5" />}>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-600 mb-2">Length</p>
        <p className="text-2xl font-bold text-slate-900">{car.length}</p>
        <p className="text-xs text-slate-500">mm</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-600 mb-2">Width</p>
        <p className="text-2xl font-bold text-slate-900">{car.width}</p>
        <p className="text-xs text-slate-500">mm</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-600 mb-2">Height</p>
        <p className="text-2xl font-bold text-slate-900">{car.height}</p>
        <p className="text-xs text-slate-500">mm</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-600 mb-2">Wheelbase</p>
        <p className="text-2xl font-bold text-slate-900">{car.wheelbase}</p>
        <p className="text-xs text-slate-500">mm</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-600 mb-2">Ground Clearance</p>
        <p className="text-2xl font-bold text-slate-900">{car.groundClearance}</p>
        <p className="text-xs text-slate-500">mm</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-600 mb-2">Kerb Weight</p>
        <p className="text-2xl font-bold text-slate-900">{car.kerbWeight}</p>
        <p className="text-xs text-slate-500">kg</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-600 mb-2">Gross Weight</p>
        <p className="text-2xl font-bold text-slate-900">{car.grossWeight}</p>
        <p className="text-xs text-slate-500">kg</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-600 mb-2">Boot Space</p>
        <p className="text-2xl font-bold text-slate-900">{car.bootSpace}</p>
        <p className="text-xs text-slate-500">liters</p>
      </div>
    </div>
  </SectionWrapper>
);

export default DimensionsSection;
