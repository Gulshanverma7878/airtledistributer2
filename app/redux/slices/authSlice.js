import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://gsr9qc3n-3012.inc1.devtunnels.ms/api/admin/login', credentials);
      return response.data; // Assuming the API returns a token
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    initializeUserFromStorage: (state) => {
        
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        // console.log(storedUser)
        // console.log(storedToken)
        if (storedUser && storedToken) {
          state.user = JSON.parse(storedUser);
          state.token = storedToken;
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.signin; // Adjust based on API response
        state.token = action.payload.token;
         // Save user and token to localStorage
         localStorage.setItem('user', JSON.stringify(action.payload.signin));
         localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout,initializeUserFromStorage } = authSlice.actions;
export default authSlice.reducer;