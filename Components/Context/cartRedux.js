import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addProductInCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((e) => {
        return e.id !== action.payload;
      });
    },
    changeTotal: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            total:
              action.payload.price && action.payload.quantity
                ? action.payload.price * action.payload.quantity
                : action.payload.price,
            quantity: action.payload.quantity,
          };
        } else {
          return item;
        }
      });
    },
  },
});

export const { addProductInCart, removeItem, changeTotal } = cartSlice.actions;

export default cartSlice.reducer;
