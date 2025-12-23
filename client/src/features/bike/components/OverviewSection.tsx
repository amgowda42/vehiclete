import { Eye } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import type { IBike } from '../bikeApis';

const OverviewSection = ({ bike }: { bike: IBike }) => {
  return (
    <SectionWrapper id="overview" title="Overview" icon={<Eye className="w-5 h-5" />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <InfoCard label="Brand" value={bike.brand} />
        <InfoCard label="Model" value={bike.model} />
        <InfoCard label="Variant" value={bike.varient} />
        <InfoCard label="Year" value={bike.year.toString()} />
        <InfoCard label="Color" value={bike.color} />
        <InfoCard label="Displacement" value={bike.displacement} />
        <InfoCard label="Engine" value={`${bike.engineCapacity}cc`} />
        <InfoCard label="Transmission" value={bike.transmission} />
      </div>
    </SectionWrapper>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-muted p-4 rounded-lg">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default OverviewSection;
