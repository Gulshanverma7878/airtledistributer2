import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://gsr9qc3n-3012.inc1.devtunnels.ms/api/lapu-collector/';
// api/collector/get/lapu/:id
// const API_URL = 'https://gsr9qc3n-3012.inc1.devtunnels.ms/api/collector/get/lapu';
// Fetch shops
export const fetchshops = createAsyncThunk('shop/fetchshops', async (id,ident) => {
  let response;
  if(id){
    if(ident==id){
      alert('jk')
      response = await axios.get(`${API_URL}/${id}`);

    }else{
      // alert('hello')
      response = await axios.get(`${API_URL}/${id}`);
    }
  }else{
    // alert('without id')
    response = await axios.get(API_URL);
  }
  console.log(response.data);
  return response.data;
});

// Add shop
export const addshop = createAsyncThunk('shop/addshop', async (data) => {
  const response = await axios.post(API_URL, data);
  console.log(response.data.createLapu);
  return response.data.createLapu;
});

  


// Update shop
export const updateshop = createAsyncThunk('shop/updateshop', async (data) => {
  const response = await axios.put(`${API_URL}/${data.id}`, data);
  // console.log(response);
  // return;
  return response.data.update;
});






// Delete shop
export const deleteshop = createAsyncThunk('shop/deleteshop', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});






// Upload Excel file
export const uploadExcelFile = createAsyncThunk('shop/uploadExcelFile', async (file, {dispatch, rejectWithValue }) => {
  alert('heelo')
  try {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);

    const response = await axios.post(`${API_URL}upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response);
    console.log(response.data.data);
    dispatch(fetchshops());

    return []

    // return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});




const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: [],
    status: 'idle',
    uploadStatus: 'idle', // Add uploadStatus for Excel upload
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchshops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchshops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = action.payload;
      })
      .addCase(fetchshops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addshop.fulfilled, (state, action) => {
        state.shops.data.push(action.payload);
      })
      .addCase(updateshop.fulfilled, (state, action) => {
        const index = state.shops.data.findIndex((t) => t.id.toString() === action.payload.id.toString());
        if (index !== -1) {
          state.shops.data[index] = action.payload;
        }
      })
      .addCase(deleteshop.fulfilled, (state, action) => {
        console.log(action.payload);
        state.shops.data = state.shops.data.filter((t) => t.id.toString() !== action.payload.toString());
      })
      // Upload Excel file
      .addCase(uploadExcelFile.pending, (state) => {
        state.uploadStatus = 'loading';
      })
      .addCase(uploadExcelFile.fulfilled, (state,action) => {
        console.log(action);
        state.shops.data=action.payload;
        state.uploadStatus = 'succeeded';
        // Optionally, you can refetch shops after successful upload
        state.status = 'idle'; // Reset status to refetch shops
        
      })
      .addCase(uploadExcelFile.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;