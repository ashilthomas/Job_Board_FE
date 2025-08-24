import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App";
import "./index.css"; // Only global styles
import store from "./Redux/store";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { Toaster } from "./Components/ui/toaster";

const persistor = persistStore(store);


createRoot(document.getElementById("root")).render(
 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
              <App />
                <Toaster />
        </ErrorBoundary>

      
       
 
      </PersistGate>
    </Provider>

);