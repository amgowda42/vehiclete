import { Wrench, Circle, Layers } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import type { IBike } from '../bikeApis';

const BrakesSection = ({ bike }: { bike: IBike }) => {
  return (
    <SectionWrapper id="brakes" title="Brakes & Suspension" icon={<Wrench className="w-5 h-5" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
            <Circle className="w-5 h-5" />
            Braking System
          </h3>
          <SpecRow label="System" value={bike.brakingSystem} />
          <SpecRow label="Front Brake" value={bike.frontBrakeType} />
          <SpecRow label="Rear Brake" value={bike.rearBrakeType} />
          <SpecRow label="Caliper Type" value={bike.caliperType} />
          <SpecRow label="ABS" value={bike.abs ? 'Yes' : 'No'} />
        </div>
        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2  text-blue-600">
            <Layers className="w-5 h-5" />
            Suspension
          </h3>
          <SpecRow label="Front" value={bike.frontSuspension} />
          <SpecRow label="Rear" value={bike.rearSuspension} />
        </div>
      </div>
    </SectionWrapper>
  );
};

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-3 border-b last:border-0">
    <span className="text-muted-foreground ">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default BrakesSection;
