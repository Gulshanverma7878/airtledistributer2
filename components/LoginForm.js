'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../app/redux/slices/authSlice1';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error,token } = useSelector((state) => state.auth);
  console.log(user,token)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ mobileno, password }));
    console.log(resultAction);
    if (loginUser.fulfilled.match(resultAction)) {
      // Redirect based on role after successful login
      console.log(resultAction.payload.user?.role);
      if (resultAction.payload.user?.role === 'MasterAdmin') {
        router.push('/distributor');
      } else if (resultAction.payload.user?.role === 'SuperAdmin') {
        router.push('/');
      } else {
        router.push('/collector'); // Default redirect
      }
    }
  };

  // Redirect if user is logged in
  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);


  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileno"
              value={mobileno}
              onChange={(e) => setMobileNo(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
