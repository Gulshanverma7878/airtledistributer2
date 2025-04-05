// features/masterSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://gsr9qc3n-3012.inc1.devtunnels.ms/api/master';

// Fetch all data
export const fetchMasterData = createAsyncThunk('master/fetchMasterData', async (id) => {
  let response;
  if(id){
    response = await axios.get(`${API_URL}/id/${id}`);
  }else{
    response = await axios.get(`${API_URL}`);
  }
  return response.data;
});

// Add new data
export const addMasterData = createAsyncThunk('master/addMasterData', async (data) => {
    console.log(data);
  const response = await axios.post(API_URL, data);
  console.log(response.data)
  return response.data.Data;
});

// Update data
export const updateMasterData = createAsyncThunk('master/updateMasterData', async (data) => {
    const {id,...rest}=data;
  const response = await axios.put(`${API_URL}/${data.id}`, rest);
  console.log(response.data);
  return response.data.update;
});

// Delete data
export const deleteMasterData = createAsyncThunk('master/deleteMasterData', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});




const masterSlice = createSlice({
  name: 'master',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasterData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMasterData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMasterData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMasterData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateMasterData.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id.toString() === action.payload.id.toString());
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteMasterData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default masterSlice.reducer;