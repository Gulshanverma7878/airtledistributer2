'use client';

import { logout } from '@/app/redux/slices/authSlice1';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const headerRef = useRef(null);
  const sidebarWidth = 256; // Sidebar width
  const transitionDuration = '0.3s'; // Transition duration
  const dispatch=useDispatch();
  const router=useRouter();

  // Get header height
  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
  }, []);

  const handleLogout = () => {
  

    dispatch(logout()); // Clear user data from Redux
    router.push('/login'); // Redirect to login page
  };

  return (
    <header
      ref={headerRef}
      className="bg-blue-600 text-white p-4 flex justify-between items-center fixed w-full z-10"
      style={{
        paddingLeft: isSidebarOpen ? `${sidebarWidth}px` : '0',
        transition: `padding-left ${transitionDuration} ease`,
      }}
    >
      <div className="flex items-center">
        {/* Hamburger Menu Button */}
        <button onClick={toggleSidebar} className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {/* App Logo */}
        <Link href="/" className="text-xl font-bold">
          Airtel Distributor
        </Link>
      </div>
      {/* Navigation Links */} 
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;