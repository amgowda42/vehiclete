import { useState } from 'react';
import { Search, ArrowRight, GitCompare } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Find Your Perfect Vehicle
        </h2>
        <p className="text-xl text-slate-700 mb-8">
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
            className="w-full pl-12 pr-4 py-4 border-2 border-slate-400 rounded-xl focus:border-blue-600 focus:outline-none text-slate-900 text-lg"
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
  );
};

export default Hero;
