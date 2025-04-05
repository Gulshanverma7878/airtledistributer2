// components/MasterForm.js
import { addMasterData, updateMasterData } from '@/app/redux/slices/masterSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const MasterForm = ({ editData, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    editData || {
      name: '',
      mobileno: '',
      company: '',
      balance: '',
      self_com: '',
      retailer_com: '',
      password:''
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
        // const {id,...rest}=formData;
      dispatch(updateMasterData(formData));
    } else {
      dispatch(addMasterData(formData));
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
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="balance"
              placeholder="Balance"
              value={formData.balance}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          {!editData &&  <input
              type="number"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />}
            <input
              type="number"
              name="self_com"
              placeholder="Self Commission"
              value={formData.self_com}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="retailer_com"
              placeholder="Retailer Commission"
              value={formData.retailer_com}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
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

export default MasterForm;
