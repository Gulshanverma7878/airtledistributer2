import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBalanceAsync, resetDistributorState } from "@/app/redux/slices/distributorSlice";
import { fetchMasterData } from "@/app/redux/slices/masterSlice";

const DistributorFormPopup = ({ open, handleClose, distributedId }) => {
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const dispatch = useDispatch();
  const { successMessage, loading, error, updatedMainBalance, selfComAmount } = useSelector(
    (state) => state.distributor
  );

  // ✅ Success hone ke baad form reset aur popup close ho jaye
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        handleClosePopup();


        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return; // अगर user null है तो कुछ मत करो

        if (user.role === 'SuperAdmin') {
          dispatch(fetchMasterData());
        } else {
          dispatch(fetchMasterData(user.id));
        }

      }, 2000);
    }
    let user=JSON.parse(localStorage.getItem("user"));

    console.log(user);


  }, [successMessage]);

  const handleSubmit = () => {
    if (amount && remark && distributedId) {
      dispatch(addBalanceAsync({ amount, remark, distributorId: distributedId }));
    }
  };

  const handleClosePopup = () => {
    dispatch(resetDistributorState());
    setAmount("");
    setRemark("");
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Distributor Balance</h2>

        {loading ? (
          <p className="text-blue-600 font-medium">Processing...</p>
        ) : successMessage ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">{successMessage}</p>
            <p className="text-gray-600 text-sm mt-1">Updated Balance: {updatedMainBalance}</p>
            <p className="text-gray-600 text-sm">Self Commission: {selfComAmount}</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md w-full"
            >
              Done
            </button>
          </div>
        ) : (
          <>
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
                disabled={!amount || !remark || loading}
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

export default DistributorFormPopup;
