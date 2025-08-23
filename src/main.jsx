import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App";
import "./index.css"; // Only global styles
import store from "./Redux/store";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
window.addEventListener("error", (event) => {
  if (event.message?.includes("destroy is not a function")) {
    console.warn("Suppressed Radix destroy error:", event.message);
    event.preventDefault(); // prevent it from bubbling
  }
});

window.addEventListener("unhandledrejection", (event) => {
  if (event.reason?.message?.includes("destroy is not a function")) {
    console.warn("Suppressed Radix destroy promise error:", event.reason);
    event.preventDefault();
  }
});

const persistor = persistStore(store);


createRoot(document.getElementById("root")).render(
 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
              <App />
        </ErrorBoundary>

      
       
 
      </PersistGate>
    </Provider>

);