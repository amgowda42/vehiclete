import { useState } from 'react';
import BikeCard from '../components/BikeCard';
import { Bike as BikeIcon } from 'lucide-react';
import { useGetAllBikesQuery, useGetBikeBrandsQuery } from '../bikeApis';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

const Bike = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const {
    data: bikesData,
    isLoading,
    isError,
  } = useGetAllBikesQuery(selectedBrand === 'All' ? '' : selectedBrand);
  const { data: brandsData } = useGetBikeBrandsQuery();
  const navigate = useNavigate();
  const { user } = useAuth();

  const brands = ['All', ...(brandsData?.data ?? [])];

  const handleBikeClick = (bikeId: string) => {
    if (!user) return;
    const basePath = user.role === 'admin' ? '/admin/bikes' : '/user/bikes';
    navigate(`${basePath}/${bikeId}`);
  };

  const handleBrandFilter = (brand: string) => {
    setSelectedBrand(brand);
  };

  return (
    <div className="w-full bg-linear-to-br from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Explore Bikes</h1>
              <p className="text-green-600 font-semibold">
                Discover {bikesData?.data?.length} amazing motorcycles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-2">
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => handleBrandFilter(brand)}
                className={`px-4 py-1 rounded-full font-semibold text-sm whitespace-nowrap transition-all border ${
                  selectedBrand === brand
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 hover:bg-blue-600 hover:text-white border-slate-300 hover:border-blue-600'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 animate-pulse"
              >
                <div className="h-48 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/4" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-8 bg-slate-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h3>
            <p className="text-slate-600 mb-6">We couldn't load the bikes. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Retry
            </button>
          </div>
        ) : bikesData?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BikeIcon className="w-20 h-20 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No bikes available</h3>
            <p className="text-slate-500">No motorcycles available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bikesData?.data?.map(bike => (
              <BikeCard key={bike._id} bike={bike} onClick={() => handleBikeClick(bike._id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bike;
