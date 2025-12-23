import { Award, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import SectionWrapper from './SectionWrapper';
import type { IBike } from '../bikeApis';

const FeaturesSection = ({ bike }: { bike: IBike }) => {
  const features = [
    { label: 'ABS', value: bike.abs, type: 'boolean' as const },
    { label: 'Quick Shifter', value: bike.quickShifter, type: 'boolean' as const },
    { label: 'Cooling System', value: bike.coolingSystem, type: 'text' as const },
    { label: 'Braking System', value: bike.brakingSystem, type: 'text' as const },
    { label: 'Mileage', value: `${bike.mileage} kmpl`, type: 'text' as const },
    { label: 'Transmission', value: bike.transmission, type: 'text' as const },
    { label: 'Fuel Tank', value: `${bike.fuelTankCapacity}L`, type: 'text' as const },
    { label: 'Top Speed', value: bike.topSpeed, type: 'text' as const },
  ];

  return (
    <SectionWrapper id="features" title="Key Features" icon={<Award className="w-5 h-5" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            label={feature.label}
            value={feature.value}
            type={feature.type}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

const FeatureCard = ({
  label,
  value,
  type,
}: {
  label: string;
  value: boolean | string;
  type: 'boolean' | 'text';
}) => {
  if (type === 'boolean') {
    const isActive = value as boolean;
    return (
      <Card
        className={`p-4 transition-all hover:shadow-md ${
          isActive
            ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
            : 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isActive ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-slate-400 dark:text-slate-600" />
            )}
            <span
              className={`font-semibold ${
                isActive
                  ? 'text-green-900 dark:text-green-100'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {label}
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 transition-all hover:shadow-md bg-muted  dark:from-blue-950 dark:to-indigo-950 dark:border-blue-800">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          {label}
        </span>
        <span className="text-lg font-semibold">{value as string}</span>
      </div>
    </Card>
  );
};

export default FeaturesSection;
