import { Button } from '@/components/ui/button';
import { Eye, Award, TrendingUp, Settings, Ruler, Wrench } from 'lucide-react';

interface BikeNavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const BikeNavigation = ({ activeSection, onSectionClick }: BikeNavigationProps) => {
  const sections = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'features', label: 'Features', icon: Award },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'specifications', label: 'Specifications', icon: Settings },
    { id: 'dimensions', label: 'Dimensions', icon: Ruler },
    { id: 'brakes', label: 'Brakes & Suspension', icon: Wrench },
  ];

  return (
    <div className="border-b bg-card sticky top-0 z-10 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {sections.map(section => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'ghost'}
              onClick={() => onSectionClick(section.id)}
              className={`gap-2 whitespace-nowrap cursor-pointer ${
                activeSection === section.id ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BikeNavigation;
