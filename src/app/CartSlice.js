import { createSlice } from '@reduxjs/toolkit';

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
      // update cart item, change quantity
      console.log('Calling update reducer');
    },
    remove: (state, action) => {
      // find item
      // remove it
      console.log('Calling remove reducer');
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

// const onItemAdd = (event) => {
//   let targetElement;
//   targetElement = event.target.parentNode;
//   const quantity = parseInt(
//     targetElement.querySelector('.quantity-input #quantity').value,
//   );
//   let id = targetElement.getAttribute('data-id');
//   let item = shopData.find((i) => i.id === id);
//   if (item != null) {
//     let newItem = {
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       image: item.image,
//       count: quantity,
//     };
//     props.onUpdate(newItem);
//   }
//   event.stopPropagation();
// };
