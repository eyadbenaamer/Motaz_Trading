import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    _id: "",
    name: "",
    username: "",
    email: "",
    balance: 0,
    picture: "",
    createdAt: "",
    cargoCount: 0,
  },
  inventory: null,
  authStatus: {
    email: null,
    isLoggedin: false,
    isVerified: false,
  },
  resetPasswordInfo: {
    email: null,
    token: null,
    message: "",
    isCodeSent: false,
    isPasswordReset: false,
  },
  infoMessage: "",
};

export const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAuthStatus: (state, action) => {
      if (action.payload === null) state.authStatus = null;
      state.authStatus = { ...state.authStatus, ...action.payload };
    },
    setResetPasswordInfo: (state, action) => {
      if (action.payload === null) state.resetPasswordInfo = null;
      state.resetPasswordInfo = {
        ...state.resetPasswordInfo,
        ...action.payload,
      };
    },
    setShowMessage: (state, action) => {
      state.infoMessage = action.payload;
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
      state.authStatus.email = null;
      state.authStatus.isLoggedin = false;
      state.authStatus.isVerified = false;
      state.infoMessage = "";
    },
  },
});
export const {
  setProfile,
  setIsVerified,
  setAuthStatus,
  setResetPasswordInfo,
  setShowMessage,
  clearSessionStorage,
  logout,
} = slice.actions;
export default slice.reducer;
