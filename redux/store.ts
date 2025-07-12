// store.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { api } from "./api/api"; // Assuming you have an api defined
import userReducer from "./features/user/userSlice";

// Reducers to persist
const persistedReducers = combineReducers({
  user: userReducer,
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

setupListeners(store.dispatch);
