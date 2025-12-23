import { TrendingUp, Zap, Circle, Gauge, Fuel, Settings } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SectionWrapper from './SectionWrapper';
import type { IBike } from '../bikeApis';

interface PerformanceCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

const PerformanceSection = ({ bike }: { bike: IBike }) => {
  return (
    <SectionWrapper id="performance" title="Performance" icon={<TrendingUp className="w-5 h-5" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PerformanceCard
          icon={<Zap className="text-blue-600" />}
          label="Max Power"
          value={bike.maxPower}
        />
        <PerformanceCard
          icon={<Circle className="text-blue-600" />}
          label="Max Torque"
          value={bike.maxTorque}
        />
        <PerformanceCard
          icon={<Gauge className="text-blue-600" />}
          label="Top Speed"
          value={bike.topSpeed}
        />
        <PerformanceCard
          icon={<TrendingUp className="text-blue-600" />}
          label="Acceleration"
          value={bike.acceleration}
        />
        <PerformanceCard
          icon={<Fuel className="text-blue-600" />}
          label="Mileage"
          value={`${bike.mileage} kmpl`}
        />
        <PerformanceCard
          icon={<Settings className="text-blue-600" />}
          label="Cooling"
          value={bike.coolingSystem}
        />
      </div>
    </SectionWrapper>
  );
};

const PerformanceCard = ({ icon, label, value }: PerformanceCardProps) => (
  <Card className="bg-primary/5">
    <CardContent className="p-6">
      <div className="text-primary mb-3">{icon}</div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

export default PerformanceSection;
