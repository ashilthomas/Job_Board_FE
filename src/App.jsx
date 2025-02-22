import  { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import LandingPage from "./Pages/LandingPage";
import "./App.css";
import { ThemeProvider } from "./Components/theame";
import LoginModal from "./Pages/LoginModal";
import JobsPage from "./Pages/JobsPage";

import AdminLayout from "./Layouts/AdminLayout";
import PostJob from "./Pages/PostJob";
import AdminAllJobs from "./Pages/AdminAllJobs";
import JobDetails from "./Pages/JobDetails";
import { Toaster } from "./Components/ui/toaster";
import MyJobs from "./Pages/MyJobs";
import { Provider } from "react-redux";
import store from "./Redux/store";
import PostJobVerify from "./Pages/PostJobVerify";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import RecommendedJobs from "./Pages/RecommendedJobs";
import SeekerApplied from "./Pages/SeekerApplied";
import UserRoute from "./Utils/protectedRoutes/UserRoutes";
import EmpolyerRoutes from "./Utils/protectedRoutes/EmpolyerRoutes";

function App() {
  const persistor = persistStore(store);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState("login"); // "login" or "signup"

  const openModal = (view) => {
    setAuthView(view); // Set login or signup view
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const router = createBrowserRouter([
    {
      element: <MainLayout openLogin={openModal} openSignup={openModal} />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/jobs", element: <JobsPage /> },
      ],
    },
    {
      element: (
      <UserRoute>
          <MainLayout /></UserRoute>
       
      ), // Wrap only protected routes
      children: [
        { path: "/myjob", element: <MyJobs /> },
        { path: "/employer", element: <PostJobVerify /> },
        { path: "/recommended", element: <RecommendedJobs /> },
        { path: "/seekerapplyedjobs/:id", element: <SeekerApplied /> },
        { path: "/jobdetails/:id", element: <JobDetails /> },
      ],
    },
    {
      element: (
        <EmpolyerRoutes>
          {" "}
          <AdminLayout />{" "}
        </EmpolyerRoutes>
      ),
      children: [
        { path: "/admin", element: <PostJob /> },
        { path: "/alljobs", element: <AdminAllJobs /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {/* Login Modal */}
          {isModalOpen && (
            <LoginModal closeModal={closeModal} initialView={authView} />
          )}
          <Toaster />
          {/* Router */}
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
