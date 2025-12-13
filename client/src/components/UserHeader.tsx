import { useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import LogOutButton from '@/features/auth/components/LogOutButton';

const UserHeader = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-slate-400 sticky top-0 bg-white z-50">
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

          <nav className="hidden md:flex justify-center items-center space-x-6">
            <NavLink
              to="/bikes"
              className="text-slate-700 text-lg font-semibold hover:text-blue-600 transition"
            >
              Bikes
            </NavLink>
            <NavLink
              to="/cars"
              className="text-slate-700 text-lg font-semibold hover:text-blue-600 transition"
            >
              Cars
            </NavLink>
            <NavLink
              to="/cycles"
              className="text-slate-700 text-lg font-semibold hover:text-blue-600 transition"
            >
              Cycles
            </NavLink>
            <NavLink
              to="/compare"
              className="text-slate-700 text-lg font-semibold hover:text-blue-600 transition"
            >
              Compare
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <LogOutButton />
            <button
              className="md:hidden text-slate-700 hover:text-blue-600 transition"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4 animate-slideDown">
            <nav className="flex flex-col space-y-3">
              <a
                href="#bikes"
                onClick={e => {
                  e.preventDefault();
                  handleNavClick('#bikes');
                }}
                className="text-slate-700 text-lg font-semibold hover:text-blue-600 transition py-2 px-2 hover:bg-slate-50 rounded"
              >
                Bikes
              </a>
              <a
                href="#cars"
                onClick={e => {
                  e.preventDefault();
                  handleNavClick('#cars');
                }}
                className="text-slate-700 text-lg font-semibold hover:text-blue-600 transition py-2 px-2 hover:bg-slate-50 rounded"
              >
                Cars
              </a>
              <a
                href="#cycles"
                onClick={e => {
                  e.preventDefault();
                  handleNavClick('#cycles');
                }}
                className="text-slate-700 text-lg font-semibold hover:text-blue-600 transition py-2 px-2 hover:bg-slate-50 rounded"
              >
                Cycles
              </a>
              <a
                href="#compare"
                onClick={e => {
                  e.preventDefault();
                  handleNavClick('#compare');
                }}
                className="text-slate-700 text-lg font-semibold hover:text-blue-600 transition py-2 px-2 hover:bg-slate-50 rounded"
              >
                Compare
              </a>
            </nav>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default UserHeader;
