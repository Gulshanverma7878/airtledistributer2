'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchMasterData, fetchBanks } from '../redux/slices/masterSlice';
// import TransactionTable from '@/components/Transaction/TransactionTable';
// import TransactionForm from '@/components/Transaction/TransactionForm';
// import { fetchBanks } from '../redux/slices/bankSlice';
// import { fetchMasterData } from '../redux/slices/masterSlice';
// import { fetchTransactions } from '../redux/slices/transactionSlice';
import ShopForm from '@/components/Shops/ShopForm';
import ShopTable1 from '@/components/Shops/ShopTable1';
import { fetchshops, uploadExcelFile } from '@/app/redux/slices/shopSlice1';
// import { fetchshops, uploadExcelFile } from '../redux/slices/shopSlice';
// import TransactionForm from '../components/TransactionForm';
// import TransactionTable from '../components/TransactionTable';

const Shops = ({params}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const {shopid}=React.use(params);
  const user1 = JSON.parse(localStorage.getItem('user'))
  console.log(user1);

  console.log(shopid)
 
  
  const { user, loading, error, token } = useSelector((state) => state.auth);

  console.log(user); 
//   uploadExcelFile
  
  useEffect(() => {
    // if (!user) return; // अगर user null है तो कुछ मत करो
  
    // if (user.role === 'SuperAdmin') {
    //   dispatch(fetchshops());
    // } else {
    //   dispatch(fetchshops(shopid));
    // }
    dispatch(fetchshops(shopid));
  }, [ shopid, dispatch]);
  

  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('file got seleceted brother...!')
      dispatch(uploadExcelFile(file));
    }
  };

  return (
    <div className="p-6">

     {
      user1.role === 'SuperAdmin' && (
        <div className="flex justify-between m-4">
        <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
          />
          <label htmlFor="file-upload" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
            Upload Excel
          </label>
          <button   
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Shops
          </button>
        </div>
      )
     }

      <ShopTable1 onEdit={handleEdit} user1={user1} />
      {isModalOpen && (
        <ShopForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Shops;