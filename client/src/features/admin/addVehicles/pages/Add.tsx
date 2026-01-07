import { Outlet, NavLink } from 'react-router';

const Add = () => {
  return (
    <div className="w-full bg-linear-to-br from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Add vehicles </h1>
              <p className="text-green-600 font-semibold">Add the new vehicles</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-2">
            <NavLink
              to="add-bike"
              className={({ isActive }) =>
                `px-4 py-1 rounded-full font-semibold text-sm whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 hover:bg-blue-600 hover:text-white border-slate-300 hover:border-blue-600'
                }`
              }
            >
              Bike
            </NavLink>
            <NavLink
              to="add-car"
              className={({ isActive }) =>
                `px-4 py-1 rounded-full font-semibold text-sm whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 hover:bg-blue-600 hover:text-white border-slate-300 hover:border-blue-600'
                }`
              }
            >
              Car
            </NavLink>
            <NavLink
              to="add-cycle"
              className={({ isActive }) =>
                `px-4 py-1 rounded-full font-semibold text-sm whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 hover:bg-blue-600 hover:text-white border-slate-300 hover:border-blue-600'
                }`
              }
            >
              Cycle
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Add;
