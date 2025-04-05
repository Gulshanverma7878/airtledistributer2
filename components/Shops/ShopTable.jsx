// import { deleteTransaction } from '@/app/redux/slices/transactionSlice';
import { deleteshop } from '@/app/redux/slices/shopSlice';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteTransaction } from '../features/transactionSlice';
import TransactionForm1 from '../Transaction/TransactionForm1';

const ShopTable = ({ onEdit ,user1 }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { shops, status } = useSelector((state) => state.shop);
  const [currentShopId, setCurrentShopId] = useState(null);
  console.log(shops);
  let navData=[];
  

  if(shops.data){
    navData=shops.data;
    console.log(navData);
  }else{
    navData=shops?.Shops
  } 

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (<>
  {isModalOpen && (
    
        <TransactionForm1
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
           currentShopId={currentShopId}
        />
      )}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Sr</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Mobile No</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Collector Id</th>
            <th className="p-2 border">what's app no</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {navData?.map((shop,index) => (
            <tr key={shop.id} className={`${
              shop.balance >= 5000 ? " font-semibold bg-red-500 text-white" : "text-black"
            }`}>
                  <td className="p-2 border text-center">{index+1}</td>
              <td className="p-2 border text-center">{shop.Retailer_Name}</td>
              <td className="p-2 border  text-center">{shop.mobileno}</td>
              <td className={`p-2 border  text-center `}>{shop.balance}</td>
              <td className="p-2 border  text-center">{shop.Collector?.mobileno}</td>
              <td className="p-2 border  text-center">{shop.whatsapp_no}</td>
              <td className="p-2 border  text-center">
              <button
                  // onClick={() => onEdit(shop)}
                  onClick={() => {
                    setCurrentShopId(shop.mobileno);
                    setIsModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white p-1 rounded m-1"
                >
                  Collection
                </button>


                {
                  user1.role === 'SuperAdmin' && (
                    <>
                     <button
                  onClick={() => onEdit(shop)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteshop(shop.id))}
                  className="bg-red-500 text-white p-1 rounded ml-2"
                >
                  Delete
                </button>
                    </>
                  )
                }
                <Link
                  href={`/transaction/${shop.id}?type=shoptransaction`}
                
                  className="bg-green-500 text-white p-2 rounded ml-2"
                >
                  View Transaction
                </Link>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default ShopTable;