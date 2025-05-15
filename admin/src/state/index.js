import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearSessionStorage: () => {
      sessionStorage.clear();
    },
    logout: (state) => {
      //clear localStorage and sessionStorage to start a new session
      localStorage.clear();
      sessionStorage.clear();

      // set the state back to the initial state
      state.token = null;
    },
  },
});
export const { setToken, clearSessionStorage, logout } = slice.actions;
export default slice.reducer;
