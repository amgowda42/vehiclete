import SectionWrapper from './SectionWrapper';
import type { ICycle } from '../cycleApis';
import { Settings } from 'lucide-react';

const SpecificationsSection = ({ cycle }: { cycle: ICycle }) => {
  return (
    <SectionWrapper
      id="specifications"
      title="Technical Specifications"
      icon={<Settings className="w-5 h-5" />}
    >
      <div className="space-y-3">
        <SpecRow label="Frame Material" value={cycle.frameMaterial} />
        <SpecRow label="Gears" value={`${cycle.gears} Speed`} />
        <SpecRow label="Gear Type" value={cycle.gearType} />
        <SpecRow label="Brake Type" value={cycle.brakeType} />
        <SpecRow label="Suspension" value={cycle.suspension} />
        <SpecRow label="Recommended Height" value={cycle.recommendedHeight} />
        <SpecRow label="Max Load" value={`${cycle.maxLoad} kg`} />
        <SpecRow label="Terrain" value={cycle.terrain.join(', ')} />
      </div>
    </SectionWrapper>
  );
};

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-3 border-b border-slate-200 last:border-0">
    <span className="text-slate-600 font-medium">{label}</span>
    <span className="text-slate-900 font-semibold">{value}</span>
  </div>
);

export default SpecificationsSection;
