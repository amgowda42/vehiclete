import { Ruler, Weight, Fuel, Layers } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import type { IBike } from '../bikeApis';
import type { ReactNode } from 'react';

interface DimensionCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const DimensionsSection = ({ bike }: { bike: IBike }) => {
  return (
    <SectionWrapper
      id="dimensions"
      title="Dimensions & Capacity"
      icon={<Ruler className="w-5 h-5" />}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <DimensionCard
          icon={<Weight className="text-blue-600" />}
          label="Kerb Weight"
          value={`${bike.kerbWeight} kg`}
        />
        <DimensionCard
          icon={<Ruler className="text-blue-600" />}
          label="Seat Height"
          value={`${bike.seatHeight} mm`}
        />
        <DimensionCard
          icon={<Ruler className="text-blue-600" />}
          label="Seat Length"
          value={`${bike.seatLength} mm`}
        />
        <DimensionCard
          icon={<Ruler className="text-blue-600" />}
          label="Ground Clearance"
          value={`${bike.groundClearance} mm`}
        />
        <DimensionCard
          icon={<Fuel className="text-blue-600" />}
          label="Fuel Capacity"
          value={`${bike.fuelTankCapacity}L`}
        />
        <DimensionCard
          icon={<Layers className="text-blue-600" />}
          label="Displacement"
          value={bike.displacement}
        />
      </div>
    </SectionWrapper>
  );
};

const DimensionCard = ({ icon, label, value }: DimensionCardProps) => (
  <div className="bg-muted p-4 rounded-lg text-center">
    <div className="text-primary mb-2 flex justify-center">{icon}</div>
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default DimensionsSection;
