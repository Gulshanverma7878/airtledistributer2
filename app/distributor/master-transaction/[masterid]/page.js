'use client';
import { fetchTransactionsAsync } from "@/app/redux/slices/distributorledger/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchTransactionsAsync } from "../redux/transactionSlice";

const TransactionTable = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.mastertransaction);
  console.log(transactions)

  useEffect(() => {
    dispatch(fetchTransactionsAsync('2'));
  }, [dispatch]);

  return (
    <div className=" mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Retailer Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Transaction ID</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{txn.id}</td>
                  <td className="border p-2 text-center">{txn.Retailer_Name}</td>
                  <td className="border p-2 text-center">₹{txn.amount}</td>
                  <td className="border p-2 text-center">{txn.Transaction_Id}</td>
                  <td className="border p-2 text-center">{new Date(txn.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-4 text-center">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
