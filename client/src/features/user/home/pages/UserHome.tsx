import { Bike, Car, Award, ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

const UserHome = () => {
  return (
    <div className="bg-linear-to-br from-slate-50 to-slate-100">
      {/* Hero Section  */}
      <section className="relative bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="text-blue-300">Vehiclete</span>
            </h1>
            <p className="text-2xl md:text-3xl text-blue-200 font-semibold mb-4">
              Hello, <span className="text-yellow-300">John Doe</span>! 👋
            </p>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              You're in the vehicle world that has{' '}
              <span className="font-bold text-white">Cars</span>,{' '}
              <span className="font-bold text-white">Bikes</span>,{' '}
              <span className="font-bold text-white">Cycles</span> and easy comparison tools to help
              you find your perfect ride!
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-slate-600 font-semibold">Bikes Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">300+</div>
              <p className="text-slate-600 font-semibold">Cars Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
              <p className="text-slate-600 font-semibold">Cycles Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">50K+</div>
              <p className="text-slate-600 font-semibold">Happy Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bikes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200 hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800"
                  alt="Bikes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-blue-900/80 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold inline-flex items-center gap-2">
                    <Bike className="w-5 h-5" />
                    Motorcycles
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Explore Bikes</h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  Discover a wide range of motorcycles from top brands. Whether you're looking for
                  performance, comfort, or style, we have the perfect bike for you.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">500+ Bike Models Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">
                      Detailed Specifications & Reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">Compare Multiple Models</span>
                  </div>
                </div>

                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition inline-flex items-center gap-2 shadow-lg">
                  Browse Bikes
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-200 hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 order-2 lg:order-1">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Discover Cars</h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  Browse through our extensive collection of cars. From compact hatchbacks to luxury
                  SUVs, find your dream car with complete specifications and pricing.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Car className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">
                      300+ Car Models from Top Brands
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">Safety Ratings & Features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">Price Comparison Tools</span>
                  </div>
                </div>

                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition inline-flex items-center gap-2 shadow-lg">
                  Browse Cars
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-80 lg:h-auto order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"
                  alt="Cars"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-l from-green-900/80 to-transparent"></div>
                <div className="absolute top-6 right-6">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold inline-flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    Automobiles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cycles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200 hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800"
                  alt="Cycles"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-purple-900/80 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold inline-flex items-center gap-2">
                    <Bike className="w-5 h-5" />
                    Bicycles
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Find Your Cycle</h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  Whether you're into mountain biking, road cycling, or looking for an electric
                  bike, explore our diverse collection of bicycles for every terrain and purpose.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bike className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">
                      200+ Cycle Models Available
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">Electric & Regular Cycles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">
                      Best Prices & Warranty Info
                    </span>
                  </div>
                </div>

                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-purple-700 transition inline-flex items-center gap-2 shadow-lg">
                  Browse Cycles
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Feature Section */}
      <section className="py-16 bg-linear-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Compare Before You Buy</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Make informed decisions with our powerful comparison tool. Compare specifications,
              prices, and features side by side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-700/50 backdrop-blur rounded-xl p-8 border border-slate-600 hover:border-blue-400 transition">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Bike className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Bike Comparison</h3>
              <p className="text-slate-300 text-center mb-6">
                Compare multiple motorcycles based on engine capacity, mileage, price, and features.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Compare Bikes
              </button>
            </div>

            <div className="bg-slate-700/50 backdrop-blur rounded-xl p-8 border border-slate-600 hover:border-green-400 transition">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Car Comparison</h3>
              <p className="text-slate-300 text-center mb-6">
                Compare cars by safety ratings, fuel efficiency, technology features, and pricing.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Compare Cars
              </button>
            </div>

            <div className="bg-slate-700/50 backdrop-blur rounded-xl p-8 border border-slate-600 hover:border-purple-400 transition">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Bike className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Cycle Comparison</h3>
              <p className="text-slate-300 text-center mb-6">
                Compare bicycles by frame material, gears, weight, and suitability for terrain.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Compare Cycles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Vehiclete?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your trusted platform for all vehicle information and comparison needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Comprehensive Database</h3>
              <p className="text-slate-600">1000+ vehicles with detailed specifications</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Comparison</h3>
              <p className="text-slate-600">Compare up to 4 vehicles side by side</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Information</h3>
              <p className="text-slate-600">Accurate and up-to-date vehicle data</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Easy to Use</h3>
              <p className="text-slate-600">User-friendly interface for quick searches</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserHome;
