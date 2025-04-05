'use client';


import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/redux/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-semibold">My App</h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-lg">Welcome, {user.email}</span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-lg">Please login</span>
        )}
      </div>
    </nav>
  );
}
