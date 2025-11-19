import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  showMenu: boolean;
}

const initialState: IInitialState = {
  showMenu: false,
};

const globalSlice = createSlice({
  name: "Global slice",
  initialState,
  reducers: {
    setShowMenu: (state, action: { payload: boolean }) => {
      state.showMenu = action.payload;
    },
  },
});

export const { setShowMenu } = globalSlice.actions;

export default globalSlice.reducer;
