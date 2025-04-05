import { deleteTransaction } from '@/app/redux/slices/transactionSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteTransaction } from '../features/transactionSlice';

const TransactionTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { transactions, status } = useSelector((state) => state.transaction);

  console.log(transactions);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
          <th className="p-2 border">Sr</th>
            <th className="p-2 border">Bank</th>
            <th className="p-2 border">UTR No</th>
            <th className="p-2 border">Remark</th>
            <th className="p-2 border">Before Balance</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">After Balance</th>
            <th className="p-2 border">Transaction Date</th>
            <th className="p-2 border">Distrubutor</th>
            {/* <th className="p-2 border">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {transactions?.transactions?.map((transaction,index) => (
            <tr key={transaction.id}>
              <td className="p-2 border text-center">{index+1}</td>
              <td className="p-2 border text-center">{transaction.Bank?.bankName}</td>
              <td className="p-2 border  text-center">{transaction.utrNo}</td>
              <td className="p-2 border  text-center">{transaction.remark}</td>
              <td className="p-2 border  text-center">{transaction.BeforeBalances}</td>
              <td className="p-2 border  text-center">{transaction.amount}</td>
              <td className="p-2 border  text-center">{transaction.AfterBalances}</td>
              <th className="p-2 border">
  {new Date(transaction.createdAt).toDateString().split(" ").slice(1).join(" ")}{" "}
  - {new Date(transaction.createdAt).toLocaleTimeString()}
</th>
              <td className="p-2 border  text-center">{transaction.MasterModel?.mobileno}</td>
              {/* <td className="p-2 border  text-center">
                <button
                  onClick={() => onEdit(transaction)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteTransaction(transaction.id))}
                  className="bg-red-500 text-white p-1 rounded ml-2"
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;