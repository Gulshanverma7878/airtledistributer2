import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchMasterData } from "./masterSlice";

const API_URL = "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/adbalance/distributorform";

// ✅ Async Thunk for adding balance
export const addBalanceAsync = createAsyncThunk(
  "distributor/addBalance",
  async ({ amount, remark, distributorId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { amount, remark, distributorId });
      // const user=JSON.parse(localStorage.getItem("user"))
      //  if (user.role === 'SuperAdmin') {
      //   alert("SuperAdmin")
      //     dispatch(fetchMasterData());
          
      //   } else {
      //     dispatch(fetchMasterData(user.id));
      //   }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong!");
    }
  }
);

// ✅ Redux Slice
const distributorSlice = createSlice({
  name: "distributor",
  initialState: {
    successMessage: "",
    loading: false,
    error: "",
    updatedMainBalance: 0,
    selfComAmount: 0,
    remark: "",
  },
  reducers: {
    resetDistributorState: (state) => {
      state.successMessage = "";
      state.error = "";
      state.updatedMainBalance = 0;
      state.selfComAmount = 0;
      state.remark = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBalanceAsync.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.successMessage = "";
      })
      .addCase(addBalanceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.updatedMainBalance = action.payload.updatedMainBalance;
        state.selfComAmount = action.payload.selfComAmount;
        state.remark = action.payload.remark;
      })
      .addCase(addBalanceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDistributorState } = distributorSlice.actions;
export default distributorSlice.reducer;
