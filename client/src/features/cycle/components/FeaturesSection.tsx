import SectionWrapper from './SectionWrapper';
import type { ICycle } from '../cycleApis';
import { Package } from 'lucide-react';

const FeaturesSection = ({ cycle }: { cycle: ICycle }) => {
  return (
    <SectionWrapper
      id="features"
      title="Features & Accessories"
      icon={<Package className="w-5 h-5" />}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cycle.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-green-50 border border-green-200 p-3 rounded-lg"
          >
            <svg
              className="w-5 h-5 text-green-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-semibold text-slate-900">{feature}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FeaturesSection;
