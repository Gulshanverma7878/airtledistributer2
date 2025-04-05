'use client';
import { fetchShopTransactions } from "@/app/redux/slices/distributorledger/shopTransactionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShopTransactionTable = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.shopTransaction);

  useEffect(() => {
    dispatch(fetchShopTransactions(2)); // ✅ Shop ID se data fetch
  }, [dispatch]);

  return (
    <div className="mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Shop Transactions</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Retailer Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Transaction Type</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">UTR No</th>
              <th className="border p-2">Remark</th>
              <th className="border p-2">File</th>
              <th className="border p-2">Bank Balance Before</th>
              <th className="border p-2">Bank Balance After</th>
              <th className="border p-2">Collector Balance Before</th>
              <th className="border p-2">Collector Balance After</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{txn.id}</td>
                  <td className="border p-2 text-center">{txn.Retailer_Name || "N/A"}</td>
                  <td className="border p-2 text-center">₹{txn.amount}</td>
                  <td className="border p-2 text-center">{txn.type}</td>
                  <td className="border p-2 text-center">{new Date(txn.createdAt).toLocaleString()}</td>
                  <td className="border p-2 text-center">{txn.utrno}</td>
                  <td className="border p-2 text-center">{txn.remark}</td>
                  <td className="border p-2 text-center">
                    {txn.fileUrl ? (
                      <a
                        href={`https://gsr9qc3n-3012.inc1.devtunnels.ms${txn.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                  <td className="border p-2 text-center">₹{txn.bankBeforeBalance}</td>
                  <td className="border p-2 text-center">₹{txn.bankAfterBalance}</td>
                  <td className="border p-2 text-center">₹{txn.collectorBalanceBefore}</td>
                  <td className="border p-2 text-center">₹{txn.collectorBalanceAfter}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="border p-4 text-center">
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

export default ShopTransactionTable;
