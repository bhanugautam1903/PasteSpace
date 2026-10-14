import { createSlice } from "@reduxjs/toolkit";

const loadPastes = () => {
  try {
    const savedPastes = localStorage.getItem("pastes");
    return savedPastes ? JSON.parse(savedPastes) : [];
  } catch {
    return [];
  }
};

const initialState = {
  pastes: loadPastes(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,

  reducers: {
    addToPastes: (state, action) => {
      state.pastes.push(action.payload);
    },

    updateToPastes: (state, action) => {
      const index = state.pastes.findIndex(
        (paste) => paste._id === action.payload._id
      );

      if (index !== -1) {
        state.pastes[index] = action.payload;
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
    },

    removeFromPastes: (state, action) => {
      state.pastes = state.pastes.filter(
        (paste) => paste._id !== action.payload
      );
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
