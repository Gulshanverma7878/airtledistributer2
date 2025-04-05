import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction';


// collector/transations/:id

// Fetch transactions
// export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async (id,type) => {
//   // collectortransaction
//   console.log(id);
//   console.log(type);
//   // alert(id);
//   // here if here i have id then i will chek type if type is collectortransaction then api_URL + collector/transations/:id else API_URL+`/getshopsone/transations`}/${id}` if not id
//   //  simpler api_url
//   const response =id ? await axios.get(`${API_URL+`/getshopsone/transations`}/${id}`) : await axios.get(API_URL);
//   console.log(id);
//   console.log(response.data);
//   return id ? response.data : response.data;
// });

// export const fetchTransactions = createAsyncThunk(
//   'transaction/fetchTransactions',
//   async ({ id, type }={}) => {  // Object destructuring
//     try {
//       let url = API_URL; // Default URL

//       if (id) {
//         url = type === 'collectortransaction' 
//           ? `${API_URL}/collector/transations/${id}` 
//           : `${API_URL}/getshopsone/transations/${id}`;
//       }

//       console.log(url);
//       console.log("Fetching transactions from:", url);
//       const response = await axios.get(url);

//       console.log("Fetched transactions:", response);

//       console.log(response.data);
      
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       throw error; // Ensure Redux handles error properly
//     }
//   }
// );


export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async ({ id, type }={}) => {  // Object destructuring
    try {
      let url = API_URL; // Default URL

      if (id) {
        // alert(type === 'collectortransaction');
        url = type === 'collectortransaction' 
          ? `${API_URL}/shops/transactions/byCollectorId/${id}` 
          : `${API_URL}/get/alltransactionsAShop/${id}`;
      }

      console.log(url);
      console.log("Fetching transactions from:", url);
      const response = await axios.get(url);

      console.log("Fetched transactions:", response);

      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error; // Ensure Redux handles error properly
    }
  }
);
// createBTCollection/shops

// Add transaction
// export const addTransaction = createAsyncThunk('transaction/addTransaction', async (data) => {
//   const response = await axios.post(API_URL, data);
//   console.log(response.data.data);
//   return response.data.data;
// });
export const addTransaction = createAsyncThunk('transaction/addTransaction', async (data) => {
  alert('heelo khauf')
  const response = await axios.post(`${API_URL}/createBTCollection/shops`, data);
  console.log(response.data.data);
  return response.data.data;
});


// Update transaction
export const updateTransaction = createAsyncThunk('transaction/updateTransaction', async (data) => {
  const response = await axios.put(`${API_URL}/${data.id}`, data);
  return response.data.update;
});

// Delete transaction
export const deleteTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Upload Excel file
export const uploadExcelFile = createAsyncThunk('transaction/uploadExcelFile', async (file, { dispatch,rejectWithValue }) => {
  alert('heelo ')
  try {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);

    const response = await axios.post(`https://gsr9qc3n-3012.inc1.devtunnels.ms/api/lapu-collector/upload/data`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    

    console.log(response.data);
    dispatch(fetchTransactions());
    return;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});




const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: { transactions: [] },
    status: 'idle',
    uploadStatus: 'idle', // Add uploadStatus for Excel upload
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(state.transactions);
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log(state.transactions);
        state.transactions.transactions.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex((t) => t.id.toString() === action.payload.id.toString());
        if (index !== -1) {
          state.transactions.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions.transactions = state.transactions.transactions.filter((t) => t.id !== action.payload);
      })
      // Upload Excel file
      .addCase(uploadExcelFile.pending, (state) => {
        state.uploadStatus = 'loading';
      })
      .addCase(uploadExcelFile.fulfilled, (state,action) => {
        state.uploadStatus = 'succeeded';
        // Optionally, you can refetch transactions after successful upload
        state.status = 'idle'; // Reset status to refetch transactions
      })
      .addCase(uploadExcelFile.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;