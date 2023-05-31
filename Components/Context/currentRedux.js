import { createSlice } from '@reduxjs/toolkit';

export const currentSlice = createSlice({
  name: 'current',
  initialState: {
    id: undefined,
    gender: undefined,
    size: undefined,
    color: undefined,
    model: undefined,
    mQ: undefined,
    price: undefined,
  },
  reducers: {
    changeGender: (state, action) => {
      state.gender = action.payload;
    },
    changeColor: (state, action) => {
      state.color = action.payload;
    },
    changeSize: (state, action) => {
      state.size = action.payload;
    },
    removeChanges: (state) => {
      state.size = undefined;
      state.color = undefined;
      state.gender = undefined;
    },
  },
});

export const { changeGender, changeColor, changeSize, removeChanges } =
  currentSlice.actions;

export default currentSlice.reducer;
