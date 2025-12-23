import { Bike } from 'lucide-react';
import type { IBike } from '../bikeApis';

interface BikeCardProps {
  bike: IBike;
  onClick?: () => void;
}

const BikeCard = ({ bike, onClick }: BikeCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-slate-200 hover:border-blue-500"
    >
      <div className="relative h-48 bg-linear-to-br from-slate-50 to-slate-100 overflow-hidden">
        <img
          src={bike.imageUrl}
          alt={`${bike.brand} ${bike.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => {
            e.currentTarget.src = 'https://placehold.co/800x600?text=Bike+Image+Not+Available';
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-semibold text-sm bg-blue-600 px-4 py-2 rounded-full">
            View Details
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Bike className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            {bike.brand}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
          {bike.model}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-sm font-bold text-blue-700">{bike.engineCapacity}cc</span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
            <svg
              className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BikeCard;
