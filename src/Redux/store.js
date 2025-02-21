import { configureStore } from "@reduxjs/toolkit";
import userData from "./userData";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: 'user', // Key for the persisted state
    storage,     // Storage method (localStorage in this case)
  };
  
  // Create a persisted reducer
  const persistedReducer = persistReducer(persistConfig, userData);
  
  // Configure the store
  const store = configureStore({
    reducer: {
      user: persistedReducer, // Use the persisted reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore redux-persist actions
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });
  
  export default store;