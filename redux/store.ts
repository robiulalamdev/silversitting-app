// store.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { api } from "./api/api"; // Assuming you have an api defined
import chatReducer from "./features/chat/chatSlice";
import childCareSearchReducer from "./features/childCareSearch/childCareSearchSlice";
import globalReducer from "./features/global/globalSlice";
import registerReducer from "./features/register/registerSlice";
import userReducer from "./features/user/userSlice";

// Reducers to persist
const persistedReducers = combineReducers({
  global: globalReducer,
  user: userReducer,
  register: registerReducer,
  childCarerFilter: childCareSearchReducer,
  chat: chatReducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

const persistedRootReducer = persistReducer(persistConfig, persistedReducers);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
