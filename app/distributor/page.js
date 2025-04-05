'use client'
import MasterForm from '@/components/Master/MasterForm';
import MasterTable from '@/components/Master/MasterTable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks } from '../redux/slices/bankSlice';

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
    const [user1,setUser1] = useState('');
    useEffect(() => {
      const user1 = JSON.parse(localStorage.getItem('user'));
      setUser1(user1);
    }, []);

    useEffect(() => {
      dispatch(fetchBanks());
    }, [dispatch]);

    


  const handleEdit = (data) => {
    setEditData(data);
    setIsFormOpen(true);
  };

  return (
    <div className="p-4">
      <div className='flex justify-end'>
      {user1?.role === 'SuperAdmin' && (
        <button
        onClick={() => {
          setEditData(null);
          setIsFormOpen(true);
        }}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Add Data
      </button>
      )}

      </div>
      {isFormOpen && <MasterForm editData={editData} onClose={() => setIsFormOpen(false)} />}
      <MasterTable onEdit={handleEdit} user1={user1} />
    </div>
  );
};

export default Home;