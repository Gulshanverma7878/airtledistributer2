'use client'
import CollectorForm from '@/components/Collector/CollectorForm';
import { useEffect, useState } from 'react';
import { fetchMasterData } from '../redux/slices/masterSlice';
import { useDispatch, useSelector } from 'react-redux';
import CollectorTable from '@/components/Collector/CollectorTable';
import { fetchcollectorData } from '../redux/slices/collectorSlice';
const Home = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { data, status } = useSelector((state) => state.master);
  const [user1,setUser1] = useState(null);
  // const user1 = JSON.parse(localStorage.getItem('user'));


  console.log(user1);

  console.log(data,status);

  useEffect(() => {
    const user1 = JSON.parse(localStorage.getItem('user'));
    setUser1(user1);
  }, []);

  useEffect(() => {
    if (!user1) return; // अगर user1 null है तो कुछ मत करो
  
    if (user1.role === 'SuperAdmin') {
      dispatch(fetchcollectorData());
    } else {
      dispatch(fetchcollectorData(user1));
    }
  }, [user1, dispatch]);

  const handleEdit = (data) => {
    setEditData(data);
    setIsFormOpen(true);
  };

  return (
    <div className="p-4">
      <div className='flex justify-end'>
     {
      user1?.role === 'SuperAdmin' && (
        <button
        onClick={() => {
          setEditData(null);
          setIsFormOpen(true);
        }}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Add Collector
      </button>
      )
     }

      </div>
      {isFormOpen && <CollectorForm editData={editData} onClose={() => setIsFormOpen(false)}  data={data}/>}
      <CollectorTable onEdit={handleEdit} 
      user1={user1}
      />
    </div>
  );
};

export default Home;