import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AdminLayout from "./Layouts/AdminLayout";
import LandingPage from "./Pages/LandingPage";
import JobsPage from "./Pages/JobsPage";
import MyJobs from "./Pages/MyJobs";
import PostJob from "./Pages/PostJob";
import PostJobVerify from "./Pages/PostJobVerify";
import RecommendedJobs from "./Pages/RecommendedJobs";
import SeekerApplied from "./Pages/SeekerApplied";
import JobDetails from "./Pages/JobDetails";
import AdminAllJobs from "./Pages/AdminAllJobs";
import UserRoute from "./Utils/protectedRoutes/UserRoutes";
import EmpolyerRoutes from "./Utils/protectedRoutes/EmpolyerRoutes";

const appRouter = (openModal) =>
  createBrowserRouter([
    {
      element: <MainLayout openLogin={openModal} openSignup={openModal} />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
    {
      element: (
        <UserRoute>
          <MainLayout />
        </UserRoute>
      ),
      children: [
        { path: "/myjob", element: <MyJobs /> },
        { path: "/employer", element: <PostJobVerify /> },
        { path: "/recommended", element: <RecommendedJobs /> },
        { path: "/seekerapplyedjobs/:id", element: <SeekerApplied /> },
        { path: "/jobdetails/:id", element: <JobDetails /> },
        { path: "/jobs", element: <JobsPage /> },
      ],
    },
    {
      element: (
        <EmpolyerRoutes>
          <AdminLayout />
        </EmpolyerRoutes>
      ),
      children: [
        { path: "/admin", element: <PostJob /> },
        { path: "/alljobs", element: <AdminAllJobs /> },
      ],
    },
  ]);

export default appRouter;
