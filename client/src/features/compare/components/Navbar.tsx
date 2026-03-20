import { NavLink } from 'react-router';

import { useGetVehiclesStatsQuery } from '@/features/vehiclesStats/vehiclesStatsAPis';

const Navbar = () => {
  const { data } = useGetVehiclesStatsQuery();
  const links = [
    { label: 'Bike', to: 'bike', count: data?.data?.bikes?.total ?? 0 },
    { label: 'Car', to: 'car', count: data?.data?.cars?.total ?? 0 },
    { label: 'Cycle', to: 'cycle', count: data?.data?.cycles?.total ?? 0 },
  ];
  return (
    <nav className="bg-white border-b border-gray-100 px-8">
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#1a1a2e] rounded-md" />
          <span className="text-[15px] font-semibold text-[#1a1a2e] tracking-tight">CompareX</span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
          compare mode
        </span>
      </div>
      <div className="flex gap-1 pt-2">
        {links.map(({ label, to, count }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors duration-150
              ${
                isActive
                  ? 'text-[#1a1a2e] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#1a1a2e] after:rounded-t'
                  : 'text-gray-400 hover:text-[#1a1a2e] hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {label}
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border transition-colors duration-150
                  ${
                    isActive
                      ? 'bg-[#1a1a2e] text-white border-transparent'
                      : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}
                >
                  {count}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
