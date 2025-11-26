import { useState } from 'react';
import {
  Car,
  Bike,
  CircleDot,
  Search,
  ArrowRight,
  GitCompare,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

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
      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">Vehiclete</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#bikes" className="text-slate-600 hover:text-blue-600 transition">
                Bikes
              </a>
              <a href="#cars" className="text-slate-600 hover:text-blue-600 transition">
                Cars
              </a>
              <a href="#cycles" className="text-slate-600 hover:text-blue-600 transition">
                Cycles
              </a>
              <a href="#compare" className="text-slate-600 hover:text-blue-600 transition">
                Compare
              </a>
            </nav>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Find Your Perfect Vehicle
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Compare bikes, cars, and cycles. Get detailed specifications, prices, and reviews all in
            one place.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for any vehicle model or brand..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-slate-900 text-lg"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
              <span>Explore Vehicles</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition flex items-center space-x-2">
              <GitCompare className="w-5 h-5" />
              <span>Compare Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Browse by Category</h3>
            <p className="text-slate-600">Choose your preferred vehicle type</p>
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
                  className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-slate-300 transition cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 ${colorClasses[category.color]} rounded-xl flex items-center justify-center mb-6 group-hover:text-white transition`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{category.title}</h4>
                  <p className="text-slate-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      {category.count} Models
                    </span>
                    <button
                      className={`${category.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : category.color === 'red' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded-lg transition`}
                    >
                      View All
                    </button>
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
            <p className="text-slate-600">Explore vehicles from top manufacturers</p>
          </div>

          <div className="space-y-12">
            {Object.entries(popularBrands).map(([category, brands]) => (
              <div key={category}>
                <h4 className="text-xl font-bold text-slate-900 mb-4 capitalize">{category}</h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      className="bg-white border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-600 hover:border-blue-600 hover:text-blue-600 transition font-medium"
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
            <p className="text-slate-600">Everything you need to make the right choice</p>
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
                  <p className="text-slate-600 text-sm">{feature.description}</p>
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
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of users who trust Vehiclete for their vehicle research
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
              Start Exploring
            </button>
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition text-lg font-semibold">
              Compare Vehicles
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
                <h5 className="text-xl font-bold">Vehiclete</h5>
              </div>
              <p className="text-slate-400">Your trusted vehicle comparison platform</p>
            </div>
            <div>
              <h6 className="font-bold mb-4">Categories</h6>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Bikes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Cars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Cycles
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">Company</h6>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">Support</h6>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Vehiclete. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Public;
