import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUpload, uploadFileAsync } from "@/app/redux/slices/fileUploadSlice";

const FileUploadPopup = ({ open, handleClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");
  const dispatch = useDispatch();
  const { successMessage, loading, error } = useSelector((state) => state.fileUpload);
  const { banks } = useSelector((state) => state.banks); // Redux se banks array le raha hu

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedFile && selectedBank) {
      dispatch(uploadFileAsync({ file: selectedFile, bankId: selectedBank }));

      setTimeout(() => {
        dispatch(resetUpload());
        handleClose();
        
      }, 2000);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload File</h2>

        {loading ? (
          <p className="text-blue-600 font-medium">Uploading...</p>
        ) : successMessage ? (
          <p className="text-green-600 font-semibold">{successMessage}</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <input type="file" onChange={handleFileChange} className="border p-2 w-full rounded-md mb-3" />
            <select value={selectedBank} onChange={handleBankChange} className="border p-2 w-full rounded-md mb-3">
              <option value="" disabled>Select Bank</option>
              {banks && banks.length > 0 ? (
                banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.bankName}
                  </option>
                ))
              ) : (
                <option disabled>No banks available</option>
              )}
            </select>
          </>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={handleClose} className="px-4 py-2 bg-red-500 text-white rounded-md mr-2">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={!selectedFile || !selectedBank || loading}>
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPopup;
