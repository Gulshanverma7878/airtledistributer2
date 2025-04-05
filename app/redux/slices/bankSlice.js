import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all banks
export const fetchBanks = createAsyncThunk('banks/fetchBanks', async () => {
  const response = await axios.get('https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank');
  return response.data;
});

// Add a new bank
export const addBank = createAsyncThunk('banks/addBank', async (bankData) => {
  console.log(bankData);
  const response = await axios.post('https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank', bankData);
  console.log(response.data);
  return response.data.bankAdd;
});

// Update a bank
export const updateBank = createAsyncThunk('banks/updateBank', async ({ id, bankData }) => {
  const response = await axios.put(`https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank/${id}`, bankData);
  console.log(response.data);
  return response.data.update;
});

// Delete a bank
export const deleteBank = createAsyncThunk('banks/deleteBank', async (id) => {
  await axios.delete(`https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank/${id}`);
  return id;
});

const bankSlice = createSlice({
  name: 'banks',
  initialState: {
    banks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Banks
      .addCase(fetchBanks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banks = action.payload;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Bank
      .addCase(addBank.fulfilled, (state, action) => {
        
        state.banks.push(action.payload);
        console.log(state.banks);
      })
      // Update Bank
      // .addCase(updateBank.fulfilled, (state, action) => {
      //   console.log(JSON.parse(JSON.stringify(action.payload)));
      //  console.log(JSON.parse(JSON.stringify([...state.banks])));

      //   const index = state.banks.findIndex((bank) => {
      //     console.log(bank);
      //     return bank.id === action.payload.id
      //   });
      //   console.log(index);
      //   if (index !== -1) {
      //     state.banks[index] = action.payload;
      //   }
      // })



      .addCase(updateBank.fulfilled, (state, action) => {
        console.log("Action Payload:", JSON.parse(JSON.stringify(action.payload)));
        console.log("State Banks:", JSON.parse(JSON.stringify(state.banks)));
      
        const index = state.banks.findIndex((bank) => {
          console.log("Bank ID:", bank.id, "Type:", typeof bank.id);
          console.log("Payload ID:", action.payload.id, "Type:", typeof action.payload.id);
          return bank.id.toString() === action.payload.id.toString(); // Ensure same type
        });
      
        console.log("Index:", index);
      
        if (index !== -1) {
          state.banks[index] = action.payload;
        } else {
          console.log("Bank not found in state.banks");
        }
      })










      // Delete Bank
      .addCase(deleteBank.fulfilled, (state, action) => {
        state.banks = state.banks.filter((bank) => bank.id !== action.payload);
      });
  },
});

export default bankSlice.reducer;