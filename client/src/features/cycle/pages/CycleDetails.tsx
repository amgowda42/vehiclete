import { useNavigate, useParams } from 'react-router';
import { useGetCycleByIdQuery } from '../cycleApis';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CycleHero from '../components/CycleHero';
import CycleNavigation from '../components/CycleNavigation';
import OverviewSection from '../components/OverviewSection';
import SpecificationsSection from '../components/SpecificationsSection';
import FeaturesSection from '../components/FeaturesSection';
import ElectricSection from '../components/ElectricSection';
import DimensionsSection from '../components/DimensionSection';

const CycleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCycleByIdQuery(id!);
  const [activeSection, setActiveSection] = useState('overview');

  const cycle = data?.data;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-background p-4 space-y-6">
        <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-96 w-full bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-12 w-full bg-slate-200 rounded animate-pulse" />
        <div className="h-64 w-full bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (isError || !cycle) {
    return (
      <div className="w-full bg-background flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-slate-200">
          <h3 className="text-2xl font-bold mb-2 text-slate-900">Cycle not found</h3>
          <p className="text-slate-600 mb-6">The cycle you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)} variant="destructive" className="bg-red-600">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="border-b bg-card">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2 text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cycles
          </Button>
        </div>
      </div>

      <CycleHero cycle={cycle} />
      <CycleNavigation activeSection={activeSection} onSectionClick={scrollToSection} />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <OverviewSection cycle={cycle} />
        <SpecificationsSection cycle={cycle} />
        <FeaturesSection cycle={cycle} />
        <ElectricSection cycle={cycle} />
        <DimensionsSection cycle={cycle} />
      </div>
    </div>
  );
};

export default CycleDetails;
