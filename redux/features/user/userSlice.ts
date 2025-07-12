import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  user: object | null;
  registerPage: {
    step: number;
    heading: boolean;
  };
}

const initialState: IInitialState = {
  user: null,
  registerPage: {
    step: 1,
    heading: false,
  },
};

const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setStepControl: (state, action) => {
      if (action.payload === "childcarer") {
        state.registerPage.step = 2;
        state.registerPage.heading = true;
        return;
      }
      if (action.payload === "parents") {
        state.registerPage.step = 2;
        state.registerPage.heading = false;
        return;
      }
      if (action.payload === "go-back") {
        state.registerPage.step = 1;
      } else {
        state.registerPage.step = state.registerPage.step + 1;
      }
    },
  },
});

export const { setUser, setStepControl } = userSlice.actions;

export default userSlice.reducer;
