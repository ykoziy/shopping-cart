import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
// Store = stores app state

const initialState = {};

export default configureStore({
  reducer: { cart: cartReducer },
  preloadedState: initialState,
});
