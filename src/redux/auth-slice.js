import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, signup, logout as logoutService } from '@/services/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { db, auth } from '@/firebase'
import { sanitizeUser } from '@/services/auth'

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await login({ email, password })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      return await signup({ email, password, displayName })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutService()
      return null
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const initializeUser = createAsyncThunk(
  'auth/initializeUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await new Promise((resolve) => {
        onAuthStateChanged(auth, resolve)
      })
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const additionalData = userDoc.exists() ? userDoc.data() : {}
        const { createdAt, ...sanitizedData } = additionalData
        return { ...sanitizeUser(user), ...sanitizedData }
      } else {
        dispatch(clearUser())
        return null
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthModalOpen: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearUser: (state) => {
      state.user = null
    },
    openAuthModal: (state) => {
      state.isAuthModalOpen = true
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.loading = false
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(initializeUser.pending, (state) => {
        state.loading = true
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(initializeUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearUser, openAuthModal, closeAuthModal } = authSlice.actions
export const authReducer = authSlice.reducer
