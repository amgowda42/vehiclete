import { ArrowRight, GitCompare } from 'lucide-react';
import { useNavigate } from 'react-router';

const Hero = () => {
  const navigate = useNavigate();
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

        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 mb-12 max-w-2xl mx-auto">
          <p className="text-slate-700 text-lg leading-relaxed font-medium">
            Our platform makes vehicle browsing effortless and efficient. Whether you're looking for
            bikes, cars, or cycles, you'll find comprehensive details about different vehicle models
            all in one convenient location. The integrated comparison tool allows you to easily
            evaluate specifications, features, and prices side-by-side, helping you make informed
            decisions. Say goodbye to browsing multiple websites – everything you need is right
            here, designed to save you time and simplify your vehicle research journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/auth/login')}
          >
            <span>Explore Vehicles</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/auth/login')}
          >
            <GitCompare className="w-5 h-5" />
            <span>Compare Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
