import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '@/types/user';

// Load initial state from localStorage if available
const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return {
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      currentUser: null,
      isAuthenticated: false,
      loading: false,
      error: null
    };
  }
};

const initialState: UserState = loadState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      // Save to localStorage
      localStorage.setItem('userState', JSON.stringify(state));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      // Clear localStorage on failure
      localStorage.removeItem('userState');
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      // Clear localStorage on logout
      localStorage.removeItem('userState');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        // Update localStorage with new user data
        localStorage.setItem('userState', JSON.stringify(state));
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  clearError
} = userSlice.actions;

export default userSlice.reducer; 