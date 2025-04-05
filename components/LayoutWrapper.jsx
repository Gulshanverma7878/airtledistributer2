'use client';

import { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../app/redux/store';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Footer from './Layout/Footer';
import { usePathname } from 'next/navigation';
import { initializeUserFromStorage } from '@/app/redux/slices/authSlice1';

const LayoutWrapper = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userToken, setUserToken] = useState(null); // State to store the token
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
 

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check local storage for token on component mount
  useEffect(() => {
    store.dispatch(initializeUserFromStorage());
    // setLoading(false);
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setUserToken(token); // Set the token state
  }, []);

  // If it's the login page, render only the Provider and children
  if (isLoginPage) {
    return <Provider store={store}>{children}</Provider>;
  }

  // If it's not the login page, render the full layout
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar isSidebarOpen={isSidebarOpen} />

          {/* Main Content */}
          <main
            className="flex-1 bg-gray-100"
            style={{
              paddingLeft: isSidebarOpen ? '256px' : '0', // Adjust padding based on sidebar state
              paddingTop: '64px', // Add padding-top to push content below the header
              transition: 'padding-left 0.3s ease', // Smooth transition
            }}
          >
            {children}
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Provider>
  );
};

export default LayoutWrapper;