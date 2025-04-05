import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchMasterData } from "../masterSlice";

const API_URL = "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/orderTransactions/bydisributor";

// ✅ Fetch Transactions by Distributor ID
export const fetchDistributorBankTransactions = createAsyncThunk(
  "distributorBankTransaction/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.data; // ✅ API response से transactions return कर रहा है
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch transactions!");
    }
  }
);

const distributorBankTransactionSlice = createSlice({
  name: "distributorBankTransaction",
  initialState: {
    transactions: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistributorBankTransactions.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchDistributorBankTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        const user = JSON.parse(localStorage.getItem("user"));
                if (!user) return; // अगर user null है तो कुछ मत करो
        
                if (user.role === 'SuperAdmin') {
                  dispatch(fetchMasterData());
                  
                } else {
                  dispatch(fetchMasterData(user.id));
                }
        
      })
      .addCase(fetchDistributorBankTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default distributorBankTransactionSlice.reducer;
