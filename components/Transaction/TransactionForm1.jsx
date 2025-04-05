'use client'
import { fetchBanks } from '@/app/redux/slices/bankSlice';
import { addTransaction, updateTransaction } from '@/app/redux/slices/transactionSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TransactionForm1 = ({ isOpen, onClose, editData,currentShopId,currentCollectorId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    editData || {
      // BankId: '',
      // distributeId:  '',
      // utrNo: '',
      remark: '',
      amount: '',
      shopId:currentShopId,
      type:'Debit',
      collectorId: currentCollectorId,
    }
  );

  

  useEffect(()=>{
    
    // console.log(formData);
    
     dispatch(fetchBanks());
  },[dispatch])


  useEffect(()=>{
    
    console.log(formData);
    
   
  },[formData])


  const {
    banks: { banks, status: banksStatus, error },
    master: { data, status: masterStatus },
  } = useSelector((state) => state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(addTransaction(formData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{editData ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Bank Dropdown */}
       

          {/* Data Dropdown */}
          {/* <div> */}
            {/* <label htmlFor="distributeId" className="block mb-2 text-sm font-medium text-gray-700">
              Select Distributor
            </label> */}
            {/* <select
              id="distributeId"
              name="distributeId"
              value={formData.distributeId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            > */}
              {/* <option value="">Select Distributor</option> */}
              {/* Populate data dynamically */}
              {/* {data?.map((item) => ( */}
                {/* <option key={item.id} value={item.id}>
                  {item.name}
                </option> */}
              {/* // ))} */}
            {/* </select> */}
          {/* </div> */}

          {/* <div> */}
            {/* <label htmlFor="shopId" className="block mb-2 text-sm font-medium text-gray-700">
              Shop Id
            </label> */}
            {/* <input
              type="text"
              id="shopId"
              name="shopId"
              value={formData.shopId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Shop Id"
            /> */}
          {/* </div> */}



          {/* UTR No Input */}
          {/* <div>
            <label htmlFor="utrNo" className="block mb-2 text-sm font-medium text-gray-700">
              UTR No
            </label>
            <input
              type="text"
              id="utrNo"
              name="utrNo"
              value={formData.utrNo}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter UTR No"
            />
          </div> */}

          {/* Remark Input */}



          {/* Amount Input */}
          {/* <div>
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700">
            Select Type
            </label>
            <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            >
            <option value="">Select Distributor</option>
            <option  value="Credit">
            Credit 
            </option>
            <option  value="Debit">
            Debit
            </option>
            <option  value="Other">
            Other
            </option>
            
            </select>
            </div> */}





          <div>
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Amount"
            />
          </div>

            <div>
              <label htmlFor="remark" className="block mb-2 text-sm font-medium text-gray-700">
                Remark
              </label>
              <input
                type="text"
                id="remark"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Remark"
              />
            </div>
          {/* Submit Button */}
          <div className="mt-4 flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              // disabled={!formData.selectedBank || !formData.selectedData || !formData.utrNo || !formData.remark || !formData.amount}
            >
              {editData ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm1;
