import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchMasterData } from "../masterSlice";

const API_URL = "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/order/airtel/Distribut";

// ✅ Async Thunk for creating a transaction
export const createTransactionAsync = createAsyncThunk(
  "transaction/create",
  async ({ bankId, distributorId, amount, remark }, { dispatch, rejectWithValue }) => {
    try {
   
      const response = await axios.post(API_URL, { bankId, distributorId, amount, remark });
      dispatch(fetchMasterData(2));
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong!");
    }
  }
);

// ✅ Redux Slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    successMessage: "",
    loading: false,
    error: "",
    transactionData: null,
  },
  reducers: {
    resetTransactionState: (state) => {
      state.successMessage = "";
      state.error = "";
      state.transactionData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransactionAsync.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.successMessage = "";
      })
      .addCase(createTransactionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.transactionData = action.payload.data;
      })
      .addCase(createTransactionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
