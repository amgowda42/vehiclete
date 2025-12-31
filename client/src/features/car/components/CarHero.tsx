import { Card } from '@/components/ui/card';
import type { ICar } from '../carApis';
import { Button } from '@/components/ui/button';

interface CarHeroProps {
  car: ICar;
}

const CarHero = ({ car }: CarHeroProps) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-card text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {car.year} Model
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700">
              {car.brand} {car.model}
            </h1>
            <p className="text-xl text-slate-400 mb-6">{car.variant}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Card className="px-4 text-center min-w-32">
                <p className="text-sm text-slate-400">Body Type</p>
                <p className="font-semibold">{car.bodyType}</p>
              </Card>
              <Card className="px-4 text-center min-w-32">
                <p className="text-sm text-slate-400">Fuel Type</p>
                <p className="font-semibold">{car.fuelType}</p>
              </Card>
              <Card className="px-4 text-center min-w-32">
                <p className="text-sm text-slate-400">Transmission</p>
                <p className="font-semibold">{car.transmission}</p>
              </Card>
            </div>

            <div className="text-3xl font-bold text-green-400 mb-4">{formatPrice(car.price)}</div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Book Test Ride
              </Button>
              <Button variant="outline" className="flex-1 cursor-pointer text-black">
                Get EMI Details
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={car.imageUrl}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-96 object-cover rounded-2xl"
              onError={e => {
                e.currentTarget.src = 'https://placehold.co/800x600?text=Car+Image+Not+Available';
              }}
            />
            {!car.isAvailable && (
              <div className="absolute inset-0 bg-black bg-opacity-70 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold bg-red-600 px-6 py-3 rounded-lg">
                  Currently Unavailable
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHero;
