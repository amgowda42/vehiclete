import { Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Vehiclete</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#bikes" className="text-slate-700 text-lg hover:text-blue-600 transition">
              Bikes
            </a>
            <a href="#cars" className="text-slate-700 text-lg hover:text-blue-600 transition">
              Cars
            </a>
            <a href="#cycles" className="text-slate-700 text-lg hover:text-blue-600 transition">
              Cycles
            </a>
            <a href="#compare" className="text-slate-700 text-lg hover:text-blue-600 transition">
              Compare
            </a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 text-lg rounded-lg hover:bg-blue-700 transition">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header