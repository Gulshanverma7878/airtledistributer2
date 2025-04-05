'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import TransactionTable from '@/components/Transaction/TransactionTable';
import TransactionForm from '@/components/Transaction/TransactionForm';
import { fetchBanks } from '../../redux/slices/bankSlice';
import { fetchMasterData } from '../../redux/slices/masterSlice';
import { fetchTransactions, uploadExcelFile } from '@/app/redux/slices/transactionSlice';
// import TransactionTable from '@/components/Transaction/TransactionTable1';
import TransactionTable1 from '@/components/Transaction/TransactionTable1';
import TransactionTable2 from '@/components/Transaction/TransactionTable2';
import { useParams, useSearchParams } from 'next/navigation';


const HomePage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const params = useParams();
  const searchParams = useSearchParams();


  
  // const transactionId = params.transactionId;  // Getting dynamic route param
  // const type = searchParams.get("type"); // Getting query param
  
  const [transactionId, setTransaction] = useState(params.transactionId);
  const [type, setType] = useState(searchParams.get("type"));

 
  

  React.useEffect(() => {
    // alert(transactionId);
    dispatch(fetchMasterData());  
    dispatch(fetchBanks());
    dispatch(fetchTransactions({ id: transactionId, type }));
  }, [dispatch, transactionId,type]);

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
      {/* <input
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
        </button> */}
      </div>

   { type === 'collectortransaction' ?  <TransactionTable2 onEdit={handleEdit} /> : <TransactionTable1 onEdit={handleEdit} />}
{/* 
      {isModalOpen && (
        <TransactionForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editData={editData}
        />
      )} */}
    </div>
  );
};

export default HomePage;