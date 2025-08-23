import React, { useState, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Components/theame";
import { Toaster } from "./Components/ui/toaster";
import LoginModal from "./Pages/LoginModal";
import "./App.css"; // App-wide styles
import appRouter from "./Routes";
import SmoothScrollSmoother from "./Components/SmoothScrollSmoother/SmoothScrollSmoother";

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    view: "login",
  });

  const openModal = (view = "login") => setModalState({ isOpen: true, view });
  const closeModal = () => setModalState({ isOpen: false, view: "login" });

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
