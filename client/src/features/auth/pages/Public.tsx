import { Car, Bike, CircleDot, Search, GitCompare, TrendingUp, Shield } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import { useNavigate } from 'react-router';

interface VehicleCategory {
  id: 'bikes' | 'cars' | 'cycles';
  title: string;
  icon: LucideIcon;
  description: string;
  count: string;
  color: 'blue' | 'red' | 'green';
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Public = () => {
  const navigate = useNavigate();
  const vehicleCategories: VehicleCategory[] = [
    {
      id: 'bikes',
      title: 'Bikes',
      icon: Bike,
      description: 'Explore 500+ motorcycle models',
      count: '500+',
      color: 'blue',
    },
    {
      id: 'cars',
      title: 'Cars',
      icon: Car,
      description: 'Discover 1000+ car models',
      count: '1000+',
      color: 'red',
    },
    {
      id: 'cycles',
      title: 'Cycles',
      icon: CircleDot,
      description: 'Browse 300+ bicycle models',
      count: '300+',
      color: 'green',
    },
  ];

  const features: Feature[] = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find your perfect vehicle with advanced filters',
    },
    {
      icon: GitCompare,
      title: 'Easy Compare',
      description: 'Compare specs, prices, and features side-by-side',
    },
    {
      icon: TrendingUp,
      title: 'Latest Models',
      description: 'Stay updated with newest launches and trends',
    },
    {
      icon: Shield,
      title: 'Verified Data',
      description: 'Accurate specifications from official sources',
    },
  ];

  const popularBrands = {
    bikes: ['Royal Enfield', 'Honda', 'Yamaha', 'KTM', 'Bajaj', 'TVS'],
    cars: ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota'],
    cycles: ['Hero', 'Firefox', 'Trek', 'Giant', 'Cannondale', 'Specialized'],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Vehicle Categories */}
      <section className="bg-slate-50 py-16 bikes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Browse by Category</h3>
            <p className="text-slate-700">Choose your preferred vehicle type</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vehicleCategories.map(category => {
              const Icon = category.icon;
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600 border-blue-600 hover:bg-blue-600',
                red: 'bg-red-100 text-red-600 border-red-600 hover:bg-red-600',
                green: 'bg-green-100 text-green-600 border-green-600 hover:bg-green-600',
              };

              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl p-8 border-2 border-slate-400 hover:border-slate-300 transition group"
                >
                  <div
                    className={`w-16 h-16 ${colorClasses[category.color]} rounded-xl flex items-center justify-center mb-6 group-hover:text-white transition`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{category.title}</h4>
                  <p className="text-slate-700 mb-4">{category.description}</p>
                  <div className="flex items-center justify-start">
                    <span className="text-sm font-semibold text-slate-500">
                      {category.count} Models
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Popular Brands</h3>
            <p className="text-slate-700">Explore vehicles from top manufacturers</p>
          </div>

          <div className="space-y-12">
            {Object.entries(popularBrands).map(([category, brands]) => (
              <div key={category}>
                <h4 className="text-xl font-bold text-slate-900 mb-4 capitalize">{category}</h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      className="bg-white border-2 border-slate-400 rounded-lg px-4 py-3 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition font-medium"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Vehiclete?</h3>
            <p className="text-slate-700">Everything you need to make the right choice</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-slate-700 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Find Your Vehicle?</h3>
          <p className="text-xl text-slate-700 mb-8">
            Join thousands of users who trust Vehiclete for their vehicle research
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Start Exploring
            </button>
            <button
              className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition text-lg font-semibold cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Compare Vehicles
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Public;
