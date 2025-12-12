import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApis } from './authApis';

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin' | string;
    isActive: boolean;
  } | null;
}

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    clearCredentials: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApis.endpoints.authCheck.matchFulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addMatcher(authApis.endpoints.authCheck.matchRejected, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
