import React, { useState, useMemo, useCallback } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Components/theame";
import { Toaster } from "./Components/ui/toaster";
import LoginModal from "./Pages/LoginModal";
import "./App.css"; // App-wide styles
import appRouter from "./Routes";


function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    view: "login",
  });

  const openModal = useCallback((view = "login") => setModalState({ isOpen: true, view }), []);
  const closeModal = useCallback(() => setModalState({ isOpen: false, view: "login" }), []);

  // Memoize router to prevent re-creating on every render
  const router = useMemo(() => appRouter(openModal), [openModal]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {modalState.isOpen && (
        <LoginModal closeModal={closeModal} initialView={modalState.view} />
      )}
      <Toaster />

      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
