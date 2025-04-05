import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransactionAsync, resetTransactionState } from "@/app/redux/slices/distributorledger/transactionSlice";
import { deleteMasterData, fetchMasterData } from '@/app/redux/slices/masterSlice';

const TransactionForm = ({ open, handleClose, distributorId }) => {
  const [bankId, setBankId] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const dispatch = useDispatch();
  const { successMessage, loading, error, transactionData } = useSelector((state) => state.ledgertransaction);
  const { banks } = useSelector((state) => state.banks);
  

  // ✅ Success hone ke baad form reset aur popup close ho jaye

  useEffect(() => {
    console.log("TransactionForm mounted or updated");
    console.log("Success Message:", successMessage);
    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Transaction Data:", transactionData);


   }, [ successMessage, loading, error, transactionData]);



  useEffect(() => {

    if (successMessage) {
      setTimeout(() => {  
        handleClosePopup();
        //  const user = JSON.parse(localStorage.getItem("user"));
        //         if (!user) return; // अगर user null है तो कुछ मत करो
        
        //         if (user.role === 'SuperAdmin') {
        //           dispatch(fetchMasterData());
        //         } else {
        //           dispatch(fetchMasterData(user.id));
        //         }
      }, 2000);
      
    }


    
  }, [successMessage]);

  const handleSubmit = () => {
    if (!bankId) {
      alert("Please select a bank");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!remark.trim()) {
      alert("Please enter a remark");
      return;
    }
    if (!distributorId) {
      alert("Distributor ID is missing");
      return;
    }

    dispatch(createTransactionAsync({ bankId, distributorId, amount, remark }));
  };

  const handleClosePopup = () => {
    dispatch(resetTransactionState());
    setBankId("");
    setAmount("");
    setRemark("");
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Transaction</h2>

        {loading ? (
          <p className="text-blue-600 font-medium">Processing...</p>
        ) : successMessage ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">{successMessage}</p>
            <p className="text-gray-600 text-sm mt-1">Transaction ID: {transactionData?.id}</p>
            <p className="text-gray-600 text-sm">Bank Balance Before: {transactionData?.bankBalanceBefore}</p>
            <p className="text-gray-600 text-sm">Bank Balance After: {transactionData?.bankBalanceAfter}</p>
            <p className="text-gray-600 text-sm">Distributor Balance Before: {transactionData?.distributorMainBalanceBefore}</p>
            <p className="text-gray-600 text-sm">Distributor Balance After: {transactionData?.distributorMainBalanceAfter}</p>
            <p className="text-gray-600 text-sm">Amount: {transactionData?.amount}</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md w-full"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <select
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="border p-2 w-full rounded-md mb-3"
            >
              <option value="" disabled>Select Bank</option>
              {banks?.length > 0 ? (
                banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.bankName}
                  </option>
                ))
              ) : (
                <option disabled>No banks available</option>
              )}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="border p-2 w-full rounded-md mb-3"
            />
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter Remark"
              className="border p-2 w-full rounded-md mb-3"
            />

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
