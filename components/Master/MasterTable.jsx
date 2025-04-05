// components/MasterTable.js
import { deleteMasterData, fetchMasterData } from '@/app/redux/slices/masterSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileUploadPopup from './FileUploadPopup';
import DistributorFormPopup from './DistributorFormPopup';
import TransactionForm from '@/components/Master/TransactionForm';

const MasterTable = ({ onEdit,user1 }) => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.master);
  const { user, loading, error, token } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
    const { successMessage } = useSelector(
      (state) => state.distributor
    );
  


  const [openPopup, setOpenPopup] = useState(false);
  
  const [distributedId, setDistributedId] = useState("");

  const handleOpenPopup = (id) => {
    setDistributedId(id); // Distributed ID set kar raha hai
    setOpenPopup(true);
  };

  const handleOpenPopup1 = (id) => {
    setIsOpen(true);
    setDistributedId(id); 
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleClosePopup1 = () => {
    setIsOpen(false);
  };



useEffect(() => {
  if (!user) return; // अगर user null है तो कुछ मत करो

  if (user.role === 'SuperAdmin') {
    dispatch(fetchMasterData());
  } else {
    dispatch(fetchMasterData(user.id));
  }
}, [user, dispatch]);




  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (<>
  
   <FileUploadPopup open={open} handleClose={() => setOpen(false)} />
   <DistributorFormPopup open={openPopup} handleClose={handleClosePopup} distributedId={distributedId} />
   <TransactionForm open={isOpen} handleClose={handleClosePopup1} distributorId={distributedId} />
    
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Mobile No</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">seft commision</th>
            <th className="p-2 border">main balance</th>

          <th className="p-2 border">Actions</th>
            
            
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border text-center">{item.name}</td>
              <td className="p-2 border text-center">{item.mobileno}</td>
              <td className="p-2 border text-center">{item.company}</td>
              <td className="p-2 border text-center">{item.balance}</td>
              <td className="p-2 border text-center">{item.self_com}</td>
              <td className="p-2 border text-center">{item.main_balance}</td>
              <td className="p-2 border text-center">
              {/* <button
                className="bg-pink-500 text-white p-1 rounded ml-2"
                >
                  master transaction
                </button> */}
                <Link
                href={`distributor/master-transaction/${item.id}`}
                className="bg-blue-500 text-white p-2 rounded ml-2"
               >
                master transaction
               </Link> 
                {user1.role === 'SuperAdmin' && (
                  <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white p-1 rounded">
                    Edit
                  </button>
                )}
                {user1.role === 'SuperAdmin' && (
                  <button
                    onClick={() => dispatch(deleteMasterData(item.id))}
                    className="bg-red-500 text-white p-1 rounded ml-2"
                  >
                    Delete
                  </button>
                )}
                <Link
                href={`distributor/bank-transaction/${item.id}`}
                className="bg-blue-500 text-white p-2 rounded ml-2"
               >
                 Bank Transaction
               </Link> 
               <Link
                href={`distributor/collector-transactin/${item.id}`}
                className="bg-blue-500 text-white p-2 rounded ml-2"
               >
                collector Transaction
               </Link> 
                {/* <button
                  onClick={() => dispatch(deleteMasterData(item.id))}
                  className="bg-blue-500 text-white p-1 rounded ml-2"
                >
                  Transaction
                </button>
                <button
                  onClick={() => dispatch(deleteMasterData(item.id))}
                  className="bg-green-500 text-white p-1 rounded ml-2"
                >
                  Bank Transaction
                </button> */}
                <button
                   onClick={() => handleOpenPopup(item.id)}
                  className="bg-purple-500 text-white p-1 rounded ml-2"
                >
                  Create Transactions
                </button>
                
                <button
                   onClick={() => setOpen(true)}
                  className="bg-pink-500 text-white p-1 rounded ml-2"
                >
                  upload excel
                </button>
                <button
                 onClick={() => handleOpenPopup1(item.id)} 
                className="bg-pink-500 text-white p-1 rounded ml-2"
                >
                  airtel order
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default MasterTable;