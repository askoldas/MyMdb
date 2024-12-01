import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '@/firebase'; // Adjust this import to your Firebase config file
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// Async Thunk: Login
export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Sign Up
export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await user.updateProfile({ displayName });
      return {
        uid: user.uid,
        email: user.email,
        displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null; // Clear user data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // User data (e.g., { uid, email, displayName })
    loading: false, // Loading state for authentication actions
    error: null, // Error message for failed actions
  },
  reducers: {
    // Clear any existing error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign Up
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearError } = authSlice.actions;

// Export the reducer (named export)
export const authReducer = authSlice.reducer;
