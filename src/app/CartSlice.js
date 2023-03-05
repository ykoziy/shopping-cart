import { createSlice } from '@reduxjs/toolkit';

const removeItem = (state, action) => {
  const { id } = action.payload;
  let countRemoved = 0;
  let newCart = state.cart.filter((item) => {
    if (item.id === id) {
      countRemoved = item.count;
    }
    return item.id !== id;
  });
  state.cart = newCart;
  state.cartCount = state.cartCount - countRemoved;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    cartCount: 0,
  },
  reducers: {
    add: (state, action) => {
      // can write mutable reducer, because it uses Immer
      // insert an item if not in cart, otherwise update existing item
      const newItem = action.payload;
      let isUpdated = false;
      let totalCount = 0;
      let newCart = state.cart.map((item) => {
        if (item.id === newItem.id) {
          isUpdated = true;
          let newCount = item.count + newItem.count;
          totalCount += newCount;
          return { ...item, count: newCount };
        }
        totalCount++;
        return item;
      });

      if (isUpdated) {
        state.cart = newCart;
        state.cartCount = totalCount;
      } else {
        state.cart = [...state.cart, newItem];
        state.cartCount = state.cartCount + newItem.count;
      }
    },
    update: (state, action) => {
      const { id, count } = action.payload;
      let itemCount = 0;
      let newCart = state.cart.map((item) => {
        if (item.id === id) {
          let newCount = item.count + count;
          itemCount += newCount;
          return { ...item, count: newCount };
        }
        return item;
      });

      if (itemCount === 0) {
        removeItem(state, action);
      } else {
        state.cart = newCart;
        state.cartCount = state.cartCount + count;
      }
    },
    remove: (state, action) => {
      removeItem(state, action);
    },
    empty: (state) => {
      state.cart = [];
      state.cartCount = 0;
    },
  },
});

// action creation, generated on each reducer
export const { add, remove, empty, update } = cartSlice.actions;
export default cartSlice.reducer;
