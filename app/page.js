'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { initializeUserFromStorage } from './features/authSlice';

export default function Home() {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);


  useEffect(() => {
    // Wait for token to be available
    if (token === null) {
      setTimeout(() => {
        setIsCheckingAuth(false);
      }, 1000); // Delay to wait for Redux state update
    } else {
      setIsCheckingAuth(false);
    }
  }, [token]);





  useEffect(() => {
    if (!isCheckingAuth && !token) {
      router.push('/login'); // Redirect after checking auth
    }
  }, [isCheckingAuth, token, router]);








  if (isCheckingAuth) {
    return <p>Checking authentication...</p>; // Show loader while checking
  }

  if (!token) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <h1>Hello, this is another level of the home page!</h1>
  );
}
