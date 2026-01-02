import SectionWrapper from './SectionWrapper';
import type { ICycle } from '../cycleApis';
import { Eye } from 'lucide-react';

const OverviewSection = ({ cycle }: { cycle: ICycle }) => {
  return (
    <SectionWrapper id="overview" title="Overview" icon={<Eye className="w-5 h-5" />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <InfoCard label="Brand" value={cycle.brand} />
        <InfoCard label="Model" value={cycle.model} />
        <InfoCard label="Year" value={cycle.year.toString()} />
        <InfoCard label="Category" value={cycle.category} />
        <InfoCard label="Color" value={cycle.color} />
        <InfoCard label="Frame Size" value={cycle.frameSize} />
        <InfoCard label="Weight" value={`${cycle.weight} kg`} />
        <InfoCard label="Wheel Size" value={cycle.wheelSize} />
      </div>
    </SectionWrapper>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
    <p className="text-xs text-slate-600 mb-1">{label}</p>
    <p className="font-semibold text-slate-900">{value}</p>
  </div>
);

export default OverviewSection;
