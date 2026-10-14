import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./redux/pasteSlice";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});

store.subscribe(() => {
  try {
    const pastes = store.getState().paste.pastes;

    localStorage.setItem("pastes", JSON.stringify(pastes));
  } catch (error) {
    console.error("Could not save pastes:", error);
  }
});
