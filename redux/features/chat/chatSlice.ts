import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
  },
});

export default chatSlice.reducer;

export const { setConversationId } = chatSlice.actions;
