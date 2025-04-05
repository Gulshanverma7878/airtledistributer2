import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchMasterData } from "../masterSlice";

const API_URL = "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/collectorTransactionsForMaster"; 

// ✅ Fetch Transactions by ID
export const fetchShopTransactions = createAsyncThunk(
  "shopTransaction/fetchById",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);

        dispatch(fetchMasterData(2));

      return response.data.transactions; // ✅ API response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch transactions!");
    }
  }
);

const shopTransactionSlice = createSlice({
  name: "shopTransaction",
  initialState: {
    transactions: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopTransactions.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchShopTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchShopTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shopTransactionSlice.reducer;
