'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { fetchMasterData, fetchBanks } from '../redux/slices/masterSlice';
import TransactionTable from '@/components/Transaction/TransactionTable';
import TransactionForm from '@/components/Transaction/TransactionForm';
import { fetchBanks } from '../redux/slices/bankSlice';
import { fetchMasterData } from '../redux/slices/masterSlice';
import { fetchTransactions, uploadExcelFile } from '../redux/slices/transactionSlice';
// import TransactionForm from '../components/TransactionForm';
// import TransactionTable from '../components/TransactionTable';

const HomePage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  React.useEffect(() => {
    // alert('helloddddddddddddddddddd')
    dispatch(fetchMasterData());
    dispatch(fetchBanks());
    dispatch(fetchTransactions());
  }, [dispatch]);

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
          Transaction Form
        </button>
      </div>

      <TransactionTable onEdit={handleEdit} />

      {isModalOpen && (
        <TransactionForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editData={editData}
        />
      )}
    </div>
  );
};

export default HomePage;