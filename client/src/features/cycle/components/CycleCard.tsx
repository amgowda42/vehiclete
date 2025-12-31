import type { ICycle } from '../cycleApis';
import { Bike } from 'lucide-react';

interface CycleCardProps {
  cycle: ICycle;
  onClick?: () => void;
}

const CycleCard = ({ cycle, onClick }: CycleCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-slate-200 hover:border-blue-500"
    >
      <div className="relative h-48 bg-linear-to-br from-slate-50 to-slate-100 overflow-hidden">
        <img
          src={cycle.imageUrl}
          alt={`${cycle.brand} ${cycle.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => {
            e.currentTarget.src = 'https://placehold.co/800x600?text=Cycle+Image+Not+Available';
          }}
        />

        {cycle.isElectric && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            ⚡ Electric
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-semibold text-sm bg-blue-600 px-4 py-2 rounded-full">
            View Details
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bike className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {cycle.brand}
            </span>
          </div>
          <span className="text-xs text-slate-500">{cycle.year}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {cycle.model}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-semibold">
            {cycle.category}
          </span>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-semibold">
            {cycle.wheelSize}
          </span>
          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold">
            {cycle.gears} Gears
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500 mb-1">Starting from</p>
            <p className="text-lg font-bold text-green-600">{formatPrice(cycle.price)}</p>
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

export default CycleCard;
