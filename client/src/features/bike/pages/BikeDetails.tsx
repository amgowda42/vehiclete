import { useParams, useNavigate } from 'react-router';
import { useGetBikeByIdQuery } from '../bikeApis';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import BikeHero from '../components/BikeHero';
import BikeNavigation from '../components/BikeNavigation';
import OverviewSection from '../components/OverviewSection';
import FeaturesSection from '../components/FeaturesSection';
import PerformanceSection from '../components/PerformanceSection';
import SpecificationsSection from '../components/SpecificationsSection';
import DimensionsSection from '../components/DimenstionsSection';
import BrakesSection from '../components/BrakesSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const BikeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBikeByIdQuery(id!);
  const [activeSection, setActiveSection] = useState('overview');

  const bike = data?.data;

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
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !bike) {
    return (
      <div className="w-full bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h3 className="text-2xl font-bold mb-2">Bike not found</h3>
          <p className="text-muted-foreground mb-6">The bike you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)} variant="destructive" className="bg-red-600">
            Go Back
          </Button>
        </Card>
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
            Back to Bikes
          </Button>
        </div>
      </div>
      <BikeHero bike={bike} />
      <BikeNavigation activeSection={activeSection} onSectionClick={scrollToSection} />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <OverviewSection bike={bike} />
        <FeaturesSection bike={bike} />
        <PerformanceSection bike={bike} />
        <SpecificationsSection bike={bike} />
        <DimensionsSection bike={bike} />
        <BrakesSection bike={bike} />
      </div>
    </div>
  );
};

export default BikeDetails;
