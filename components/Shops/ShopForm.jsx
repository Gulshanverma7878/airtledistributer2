'use client'
import { addshop, updateshop } from '@/app/redux/slices/shopSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ShopForm = ({ isOpen, onClose, editData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    editData || {
        Retailer_Name: '',
        mobileno:  '',
        CollectorId: '',
        balance: '',
        whatsapp_no: '',
    }
  );

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
    if (editData) {
      dispatch(updateshop({ ...formData, id: editData.id }));
    } else {
      const updatedFormData = {
        ...formData
      };
  
      dispatch(addshop(updatedFormData));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{editData ? 'Edit shop' : 'Add shop'}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Bank Dropdown */}

          {/* Data Dropdown */}

          <div>
            <label htmlFor="Retailer_Name" className="block mb-2 text-sm font-medium text-gray-700">
            Retailer_Name
            </label>
            <input
              type="text"
              id="Retailer_Name"
              name="Retailer_Name"
              value={formData.Retailer_Name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Retailer_Name"
            />
          </div>



          {/* UTR No Input */}
          <div>
            <label htmlFor="mobileno" className="block mb-2 text-sm font-medium text-gray-700">
            mobile no
            </label>
            <input
              type="text"
              id="mobileno"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter mobileno"
            />
          </div>

          {/* Remark Input */}
          <div>
            <label htmlFor="CollectorId" className="block mb-2 text-sm font-medium text-gray-700">
              Collector mobile no
            </label>
            <input
              type="text"
              id="CollectorId"
              name="CollectorId"
              value={formData.CollectorId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Collector mobile no"
            />
          </div>

          <div>
            <label htmlFor="whatsapp_no" className="block mb-2 text-sm font-medium text-gray-700">
              whatsapp_no
            </label>
            <input
              type="number"
              id="whatsapp_no"
              name="whatsapp_no"
              value={formData.whatsapp_no}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter whatsapp_no"
            />
          </div>







          <div>
            <label htmlFor="balance" className="block mb-2 text-sm font-medium text-gray-700">
              balance
            </label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter balance"
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

export default ShopForm;
