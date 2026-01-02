import SectionWrapper from './SectionWrapper';
import { Zap } from 'lucide-react';
import type { ICycle } from '../cycleApis';

const ElectricSection = ({ cycle }: { cycle: ICycle }) => {
  if (!cycle.isElectric) {
    return (
      <SectionWrapper
        id="electric"
        title="Electric Specifications"
        icon={<Zap className="w-5 h-5" />}
      >
        <div className="text-center py-8 text-slate-500">
          <p className="text-lg text-slate-900 font-medium">This is not an electric cycle</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="electric"
      title="Electric Specifications"
      icon={<Zap className="w-5 h-5" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{cycle.motorPower}W</div>
          <p className="text-sm text-slate-700 font-semibold">Motor Power</p>
        </div>
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{cycle.batteryCapacity}Ah</div>
          <p className="text-sm text-slate-700 font-semibold">Battery Capacity</p>
        </div>
        <div className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{cycle.range} km</div>
          <p className="text-sm text-slate-700 font-semibold">Range per Charge</p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ElectricSection;
