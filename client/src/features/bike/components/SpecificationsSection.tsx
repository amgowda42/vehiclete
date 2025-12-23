import { Settings } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import type { IBike } from '../bikeApis';

const SpecificationsSection = ({ bike }: { bike: IBike }) => {
  return (
    <SectionWrapper
      id="specifications"
      title="Engine Specifications"
      icon={<Settings className="w-5 h-5" />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SpecCard>
          <SpecRow label="Displacement" value={bike.displacement} />
          <SpecRow label="Engine Capacity" value={`${bike.engineCapacity}cc`} />
          <SpecRow label="Max Power" value={bike.maxPower} />
          <SpecRow label="Max Torque" value={bike.maxTorque} />
        </SpecCard>
        <SpecCard>
          <SpecRow label="Cooling System" value={bike.coolingSystem} />
          <SpecRow label="Transmission" value={bike.transmission} />
          <SpecRow label="Fuel Tank" value={`${bike.fuelTankCapacity}L`} />
          <SpecRow label="Mileage" value={`${bike.mileage} kmpl`} />
        </SpecCard>
      </div>
    </SectionWrapper>
  );
};

const SpecCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted rounded-lg p-6">{children}</div>
);

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-3 border-b last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default SpecificationsSection;
