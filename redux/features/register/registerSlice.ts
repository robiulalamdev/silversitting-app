import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {}

const initialState: IInitialState = {};

const registerSlice = createSlice({
  name: "register slice",
  initialState,
  reducers: {},
});

export const {} = registerSlice.actions;

export default registerSlice.reducer;
