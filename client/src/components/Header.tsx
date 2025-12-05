import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1
              className="text-2xl font-bold text-slate-900 cursor-pointer"
              onClick={() => navigate(0)}
            >
              Vehiclete
            </h1>
          </div>
          <div className="hidden md:flex space-x-8">
            <h1 className="text-xl font-extrabold text-red-600">Wel Come</h1>
          </div>
          <div className="flex items-center gap-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 text-lg rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer"
              onClick={() => navigate('/sign-up')}
            >
              Sign Up
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 text-lg rounded-lg hover:bg-green-700 transition font-semibold cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
