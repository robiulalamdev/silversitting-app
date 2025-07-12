import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  user: object | null;
}

const initialState: IInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
