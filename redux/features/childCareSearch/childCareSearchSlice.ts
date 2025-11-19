import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChildCarerSearchState {
  filterData: any; // You can replace 'any' with a more specific type if available
  city: string;
  step: number | string;
}

const initialState: ChildCarerSearchState = {
  filterData: null,
  city: "",
  step: 0,
};

const childCarerSearchSlice = createSlice({
  name: "childCarerSearch",
  initialState,
  reducers: {
    setChildCarerFilterData: (state, action: PayloadAction<any>) => {
      state.filterData = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setStep: (state, action: PayloadAction<number | string>) => {
      state.step = action.payload;
    },
  },
});

export default childCarerSearchSlice.reducer;

export const { setChildCarerFilterData, setCity, setStep } =
  childCarerSearchSlice.actions;
