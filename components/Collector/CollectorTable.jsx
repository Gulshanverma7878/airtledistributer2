// components/MasterTable.js
import { deletecollectorData, fetchcollectorData } from '@/app/redux/slices/collectorSlice';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CollectorTable = ({ onEdit,user1 }) => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.collector);
 const { user, loading, error, token } = useSelector((state) => state.auth);

 console.log(data.data);

console.log(user);

// useEffect(() => {
//   if (!user) return; // अगर user null है तो कुछ मत करो

//   if (user.role === 'SuperAdmin') {
//     dispatch(fetchcollectorData());
//   } else {
//     dispatch(fetchcollectorData(user.id));
//   }
// }, [user, dispatch]);



  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
          <th className="p-2 border">Sr</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Mobile No</th>
            <th className="p-2 border ">Wallet Amount</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item,index) => (
            <tr key={item.id}>
                 <td className="p-2 border text-center">{index+1}</td>
              <td className="p-2 border text-center">{item.name}</td>
              <td className="p-2 border text-center">{item.mobileno}</td>
              <td className="p-2 border text-center "><span className=' font-bold text-green-600 p-2 m-2'>₹{item.collector_woliont}</span></td>
              <td className="p-2 border text-center">
                {
                  user1?.role === 'SuperAdmin' && (
                    <>
                    <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white p-1 rounded">
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deletecollectorData(item.id))}
                  className="bg-red-500 text-white p-1 rounded ml-2"
                >
                  Delete
                </button>
                    </>
                  )
                }
               <Link
                href={`/collector/${item.id}`}
                className="bg-blue-500 text-white p-2 rounded ml-2"
               >
               View
               </Link>
               <Link
                href={`/transaction/${item.mobileno}?type=collectortransaction`}
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
  );
};

export default CollectorTable;