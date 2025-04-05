'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchBanks, addBank, updateBank, deleteBank } from '@/redux/slices/bankSlice';
import { useEffect } from 'react';
import { addBank, deleteBank, fetchBanks, updateBank } from '../redux/slices/bankSlice';

const BankPage = () => {
  const dispatch = useDispatch();
  const { banks, status, error } = useSelector((state) => state.banks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    ifscCode: '',
    branchName: '',
    AC_Number: '',
    ACH_Name: '',
    mobileno: '',
    balance: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(banks);
    e.preventDefault();
    if (editId) {
      const {id,...rest}=formData;
      await dispatch(updateBank({ id: editId, bankData: rest }));
    } else {
      await dispatch(addBank(formData));
    }
    setIsFormOpen(false);
    setFormData({
      bankName: '',
      ifscCode: '',
      branchName: '',
      AC_Number: '',
      ACH_Name: '',
      mobileno: '',
      balance: '',
    });
    setEditId(null);
  };

  const handleEdit = (bank) => {
    setFormData(bank);
    setEditId(bank.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteBank(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bank Management</h1>
      <div className='flex justify-end'>
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Bank ||
      </button>

      </div>

      {/* Form Popup */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Bank' : 'Add Bank'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="ifscCode"
                  placeholder="IFSC Code"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="branchName"
                  placeholder="Branch Name"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="AC_Number"
                  placeholder="Account Number"
                  value={formData.AC_Number}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="ACH_Name"
                  placeholder="Account Holder Name"
                  value={formData.ACH_Name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="mobileno"
                  placeholder="Mobile Number"
                  value={formData.mobileno}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="balance"
                  placeholder="Balance"
                  value={formData.balance}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editId ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Bank Name</th>
            <th className="p-2 border">IFSC Code</th>
            <th className="p-2 border">Branch Name</th>
            <th className="p-2 border">Account Number</th>
            <th className="p-2 border">Account Holder</th>
            <th className="p-2 border">Mobile</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank) => (
            <tr key={bank.id} className="border">
              <td className="p-2 border text-center">{bank.bankName}</td>
              <td className="p-2 border text-center">{bank.ifscCode}</td>
              <td className="p-2 border text-center">{bank.branchName}</td>
              <td className="p-2 border text-center">{bank.AC_Number}</td>
              <td className="p-2 border text-center">{bank.ACH_Name}</td>
              <td className="p-2 border text-center">{bank.mobileno}</td>
              <td className="p-2 border text-center">{bank.balance}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleEdit(bank)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bank.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankPage;