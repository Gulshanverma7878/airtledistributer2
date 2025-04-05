'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../Inputs/Dropdown';
import { addcollectorData, updatecollectorData } from '@/app/redux/slices/collectorSlice';

const CollectorForm = ({ editData, onClose,data }) => {
    const dispatch = useDispatch();
  
    const [formData, setFormData] = useState(
      editData || {
        name: '',
        mobileno: '',
        password: '',
        distributorId: '',
      }
    );
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (editData) {
        dispatch(updatecollectorData(formData));
      } else {
        dispatch(addcollectorData(formData));
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white shadow-md rounded p-6 w-96">
          <h2 className="text-xl mb-4">{editData ? 'Edit Data' : 'Add Data'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="mobileno"
                placeholder="Mobile No"
                value={formData.mobileno}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              {!editData && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              )}
              <Dropdown
                name="distributorId"
                value={formData.distributorId}
                onChange={handleChange}
                options={data}
                placeholder="Select Distributor"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                {editData ? 'Update' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-2 bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default CollectorForm;
