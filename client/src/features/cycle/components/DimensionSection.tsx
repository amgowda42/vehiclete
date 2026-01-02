import SectionWrapper from './SectionWrapper';
import { Ruler, Award } from 'lucide-react';
import type { ICycle } from '../cycleApis';

interface SpecRowProps {
  label: string;
  value: string;
}

const DimensionsSection = ({ cycle }: { cycle: ICycle }) => {
  return (
    <SectionWrapper
      id="dimensions"
      title="Dimensions & Warranty"
      icon={<Ruler className="w-5 h-5" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Physical Specifications</h3>
          <div className="space-y-3">
            <SpecRow label="Frame Size" value={cycle.frameSize} />
            <SpecRow label="Weight" value={`${cycle.weight} kg`} />
            <SpecRow label="Wheel Size" value={cycle.wheelSize} />
            <SpecRow label="Max Load Capacity" value={`${cycle.maxLoad} kg`} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Warranty Information</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-blue-600 mb-2">{cycle.warrantyYears} Years</div>
            <p className="text-sm text-slate-700 font-semibold">Manufacturer Warranty</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const SpecRow = ({ label, value }: SpecRowProps) => {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0">
      <span className="text-slate-600 font-medium">{label}</span>
      <span className="text-slate-900 font-semibold text-right">{value}</span>
    </div>
  );
};

export default DimensionsSection;
