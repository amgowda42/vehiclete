import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Compare = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Compare;
