// src/Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userData from "./userData";

// Persist config
const persistConfig = {
  key: "user", // persisted key in localStorage
  storage,
};

// Wrap reducer with persist
const persistedUserReducer = persistReducer(persistConfig, userData);

// Configure store
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // enable devTools only in dev
});

// Persistor for rehydration
export const persistor = persistStore(store);

export default store;
