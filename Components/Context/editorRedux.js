import { createSlice } from '@reduxjs/toolkit';

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    face: 'front',
    allDecals: [],
    activeDecalR: 0,
  },
  reducers: {
    changeFace: (state, action) => {
      state.face = action.payload;
    },
    addDecals: (state, action) => {
      state.allDecals = [...state.allDecals, action.payload];
    },
    removeDecal: (state, action) => {
      state.allDecals = state.allDecals.filter((e) => {
        return e.id !== action.payload;
      });
    },
    setActiveDecalR: (state, action) => {
      state.activeDecalR = action.payload;
    },
    removeValues: (state) => {
      (state.face = ''), (state.allDecals = []), (state.activeDecalR = 0);
    },
  },
});

export const {
  changeFace,
  addDecals,
  removeDecal,
  setActiveDecalR,
  removeValues,
} = editorSlice.actions;

export default editorSlice.reducer;
