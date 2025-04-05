import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/distributor_transactions_shops/get"; // ✅ API URL daalna

// ✅ Fetch Transactions
export const fetchTransactionsAsync = createAsyncThunk(
  "transaction/fetchAll",
  async ( distributorId , { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${distributorId}`); // ✅ API URL daalna
      return response.data.transactions; // ✅ API response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch transactions!");
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
