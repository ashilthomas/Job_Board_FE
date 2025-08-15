import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Components/theame";
import { Toaster } from "./Components/ui/toaster";
import LoginModal from "./Pages/LoginModal";
 // All routes centralized
import "./App.css"; // Only app-wide styles
import appRouter from "./Routes";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState("login"); // "login" or "signup"

  const openModal = (view) => {
    setAuthView(view);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {isModalOpen && <LoginModal closeModal={closeModal} initialView={authView} />}
      <Toaster />
      <RouterProvider router={appRouter(openModal)} />
    </ThemeProvider>
  );
}

export default App;
