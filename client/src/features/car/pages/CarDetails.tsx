import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetCarByIdQuery } from '../carApis';
import CarHero from '../components/CarHero';
import CarNavigation from '../components/CarNavigation';
import OverviewSection from '../components/OverviewSection';
import PerformanceSection from '../components/PerformanceSection';
import SafetySection from '../components/SafetySection';
import ComfortSection from '../components/ComfortSection';
import TechnologySection from '../components/TechnologySection';
import SpecificationsSection from '../components/SpecificationsSection';
import DimensionsSection from '../components/DimensionsSection';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCarByIdQuery(id!);
  const [activeSection, setActiveSection] = useState('overview');

  const car = data?.data;

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

  if (isError || !car) {
    return (
      <div className="w-full bg-background flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-slate-200">
          <h3 className="text-2xl font-bold mb-2 text-slate-900">Car not found</h3>
          <p className="text-slate-600 mb-6">The car you're looking for doesn't exist.</p>
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
            Back to Cars
          </Button>
        </div>
      </div>

      <CarHero car={car} />
      <CarNavigation activeSection={activeSection} onSectionClick={scrollToSection} />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <OverviewSection car={car} />
        <PerformanceSection car={car} />
        <SafetySection car={car} />
        <ComfortSection car={car} />
        <TechnologySection car={car} />
        <SpecificationsSection car={car} />
        <DimensionsSection car={car} />
      </div>
    </div>
  );
};

export default CarDetails;
