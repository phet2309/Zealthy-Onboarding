import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useLoggedIn } from '../context/LoggedInContext';
import { logoutUser } from '../api/userApi';
import { showToast } from './Toast';

// Navbar component for navigation
const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn, setEmailVal } = useLoggedIn();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setEmailVal(null);
    const resp = await logoutUser();
    if (resp === 'Success') {
      navigate('/user-onboard-auth', {
        replace: true
      }
      );
    } else {
      console.error('Logout failed');
      showToast('Logout failed', 'error');
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to='/'><div className="text-xl font-bold cursor-pointer">Zealthy</div></Link>
      <div className="flex space-x-4">
        {!isLoggedIn ? (
          <Link to="/user-onboard-auth" className="text-md underline">Start Onboarding</Link>
        ) : (
          <button onClick={handleLogout} className="text-md underline">Logout</button>
        )}
        <Link to="/data" className="text-md underline">Data Table</Link>
        <Link to="/admin" className="text-md underline">Admin</Link>
        <Link to="/" className="text-md underline">Home</Link>
      </div>
    </div>
  );
};

export default Navbar;
