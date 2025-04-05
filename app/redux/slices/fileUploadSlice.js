import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk function for file upload
export const uploadFileAsync = createAsyncThunk(
  "fileUpload/uploadFile",
  async ({ file, bankId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bankId", bankId);

      const response = await axios.post(
        "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/upload/data",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data); // API se aaya response console mein dekhein

      return response.data; // API ka response return karega (message + skippedTransactions)
    } catch (error) {
      return rejectWithValue(error.response?.data || "File upload failed");
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    uploadedFile: null,
    successMessage: "",
    skippedTransactions: [], // Skipped transactions ke liye naya state
    loading: false,
    error: null,
  },
  reducers: {
    resetUpload: (state) => {
      state.uploadedFile = null;
      state.successMessage = "";
      state.skippedTransactions = []; // Reset skipped transactions
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileAsync.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = null;
      })
      .addCase(uploadFileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedFile = action.payload;
        state.successMessage = action.payload.message; // API se aaya message set karega
        state.skippedTransactions = action.payload.skippedTransactions || []; // Skipped transactions handle karega
      })
      .addCase(uploadFileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpload } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
