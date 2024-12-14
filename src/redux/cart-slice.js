import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  addItemToCart,
  fetchCartItems,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
} from '@/services/cart'

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchCartItems(userId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, item }, { rejectWithValue }) => {
    try {
      await addItemToCart(userId, item)
      return item
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ userId, itemId, quantity }, { rejectWithValue }) => {
    try {
      await updateCartItemQuantity(userId, itemId, quantity)
      return { itemId, quantity }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      await removeItemFromCart(userId, itemId)
      return itemId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async (userId, { rejectWithValue }) => {
    try {
      await clearCart(userId)
      return []
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload
        state.totalQuantity = action.payload.reduce((sum, item) => sum + item.quantity, 0)
        state.totalPrice = action.payload.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        state.loading = false
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.totalQuantity += action.payload.quantity
        state.totalPrice += action.payload.price * action.payload.quantity
        state.loading = false
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { itemId, quantity } = action.payload
        const item = state.items.find((item) => item.id === itemId)
        if (item) {
          state.totalQuantity += quantity - item.quantity
          state.totalPrice += (quantity - item.quantity) * item.price
          item.quantity = quantity
        }
        state.loading = false
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const itemId = action.payload
        const item = state.items.find((item) => item.id === itemId)
        if (item) {
          state.totalQuantity -= item.quantity
          state.totalPrice -= item.price * item.quantity
        }
        state.items = state.items.filter((item) => item.id !== itemId)
        state.loading = false
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(clearUserCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.items = []
        state.totalQuantity = 0
        state.totalPrice = 0
        state.loading = false
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = cartSlice.actions
export const cartReducer = cartSlice.reducer
