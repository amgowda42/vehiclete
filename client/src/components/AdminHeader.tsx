import { useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import LogOutButton from '@/features/auth/components/LogOutButton';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `text-lg font-semibold transition ${
      isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-700 hover:text-blue-600'
    }`;
  };

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `text-lg font-semibold transition py-2 px-2 rounded ${
      isActive ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
    }`;
  };

  return (
    <header className="border-b border-slate-400 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1
              className="text-2xl font-bold text-slate-900 cursor-pointer"
              onClick={() => navigate('/admin/home')}
            >
              Vehiclete
            </h1>
          </div>

          <nav className="hidden md:flex justify-center items-center space-x-6">
            <NavLink to="bikes" className={getNavLinkClass}>
              Bikes
            </NavLink>
            <NavLink to="cars" className={getNavLinkClass}>
              Cars
            </NavLink>
            <NavLink to="cycles" className={getNavLinkClass}>
              Cycles
            </NavLink>
            <NavLink to="compare" className={getNavLinkClass}>
              Compare
            </NavLink>
            <NavLink to="users" className={getNavLinkClass}>
              Users
            </NavLink>
            <NavLink to="add" className={getNavLinkClass}>
              Add Vehicles
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
              <NavLink to="bikes" onClick={closeMobileMenu} className={getMobileNavLinkClass}>
                Bikes
              </NavLink>
              <NavLink to="cars" onClick={closeMobileMenu} className={getMobileNavLinkClass}>
                Cars
              </NavLink>
              <NavLink to="cycles" onClick={closeMobileMenu} className={getMobileNavLinkClass}>
                Cycles
              </NavLink>
              <NavLink to="compare" onClick={closeMobileMenu} className={getMobileNavLinkClass}>
                Compare
              </NavLink>
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

export default AdminHeader;
