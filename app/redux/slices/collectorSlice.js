// features/collectorSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://gsr9qc3n-3012.inc1.devtunnels.ms/api/collector';

// Fetch all data
export const fetchcollectorData = createAsyncThunk('collector/fetchcollectorData', async (id) => {
  let response;
  if(id){
    // response=await axios.get(`${API_URL}/onedistributor/ofcollectors/${id}`)
    // alert('this one will get called');
    console.log(id);
   id.role=='Collector' ? response=await axios.get(`${API_URL}/getCollectorby/${id.id}`) : response=await axios.get(`${API_URL}/onedistributor/ofcollectors/${id.id}`);
    console.log(response.data);
    
  }else{
    response = await axios.get(API_URL);
  }
  console.log(response.data);
  return response.data;
});

// export const fetchcollectorData = createAsyncThunk(
//   "collector/fetchcollectorData",
//   async (id) => {
//     const token = localStorage.getItem("token"); // Get token from localStorage
//     let response;

//     if (!id) {
//       response = await axios.get(`${API_URL}/getCollectorby/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add token in headers
//         },
//       });
//     } else {
//       response = await axios.get(API_URL, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add token in headers
//         },
//       });
//     }

//     console.log(response.data);
//     return response.data;
//   }
// );

// Add new data
export const addcollectorData = createAsyncThunk('collector/addcollectorData', async (data) => {
    console.log(data);
  const response = await axios.post(API_URL, data);
  console.log(response.data)
  return response.data.createCollector;
});

// Update data
export const updatecollectorData = createAsyncThunk('collector/updatecollectorData', async (data) => {
    const {id,...rest}=data;
  const response = await axios.put(`${API_URL}/${data.id}`, rest);
  console.log(response.data);
  return response.data.update;
});

// Delete data
export const deletecollectorData = createAsyncThunk('collector/deletecollectorData', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});




const collectorSlice = createSlice({
  name: 'collector',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcollectorData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchcollectorData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchcollectorData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addcollectorData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updatecollectorData.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id.toString() === action.payload.id.toString());
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deletecollectorData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default collectorSlice.reducer;