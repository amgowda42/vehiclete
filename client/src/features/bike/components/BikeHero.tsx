import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BikeIcon, Gauge, Zap, Fuel, IndianRupee } from 'lucide-react';
import type { IBike } from '../bikeApis';
import { useNavigate } from 'react-router';

interface BikeHeroProps {
  bike: IBike;
}

const BikeHero = ({ bike }: BikeHeroProps) => {
  const navigate = useNavigate();
  return (
    <div className="border-b bg-card">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-96 bg-muted rounded-xl overflow-hidden">
            <img
              src={bike.imageUrl}
              alt={`${bike.brand} ${bike.model}`}
              className="w-full h-full object-cover"
              onError={e => {
                e.currentTarget.src = 'https://placehold.co/800x600?text=Bike+Image+Not+Available';
              }}
            />
            <div className="absolute top-4 right-4">
              <Badge variant={bike.isAvailable ? 'default' : 'destructive'}>
                {bike.isAvailable ? '✓ Available' : '✗ Not Available'}
              </Badge>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BikeIcon className="w-5 h-5  text-blue-600" />
              <span className="text-sm font-bold uppercase text-blue-600">{bike.brand}</span>
            </div>
            <h1 className="text-5xl font-bold mb-3">{bike.model}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {bike.varient} • {bike.year}
            </p>

            <Card className="p-6 mb-6 bg-primary/5">
              <p className="text-sm text-muted-foreground mb-2">Ex-showroom Price</p>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-8 h-8 text-primary" />
                <span className="text-4xl font-bold text-green-600">
                  {bike.price.toLocaleString('en-IN')}
                </span>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="p-4 text-center">
                <Gauge className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground mb-1">Engine</p>
                <p className="font-bold">{bike.engineCapacity}cc</p>
              </Card>
              <Card className="p-4 text-center">
                <Zap className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground mb-1">Power</p>
                <p className="font-bold">{bike.maxPower.split('@')[0]}</p>
              </Card>
              <Card className="p-4 text-center">
                <Fuel className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground mb-1">Mileage</p>
                <p className="font-bold">{bike.mileage} kmpl</p>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                onClick={() => navigate(`/user/bikes/test-drive/${bike._id}`)}
              >
                Book Test Ride
              </Button>
              <Button
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={() => navigate(`/user/bikes/emi/${bike._id}`)}
              >
                Get EMI Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeHero;
