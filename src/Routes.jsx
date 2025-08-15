import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Lazy load layouts
const MainLayout = lazy(() => import("./Layouts/MainLayout"));
const AdminLayout = lazy(() => import("./Layouts/AdminLayout"));

// Lazy load pages
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const JobsPage = lazy(() => import("./Pages/JobsPage"));
const MyJobs = lazy(() => import("./Pages/MyJobs"));
const PostJob = lazy(() => import("./Pages/PostJob"));
const PostJobVerify = lazy(() => import("./Pages/PostJobVerify"));
const RecommendedJobs = lazy(() => import("./Pages/RecommendedJobs"));
const SeekerApplied = lazy(() => import("./Pages/SeekerApplied"));
const JobDetails = lazy(() => import("./Pages/JobDetails"));
const AdminAllJobs = lazy(() => import("./Pages/AdminAllJobs"));

// Protected routes
import UserRoute from "./Utils/protectedRoutes/UserRoutes";
import EmpolyerRoutes from "./Utils/protectedRoutes/EmpolyerRoutes";

// Fallback Loader
const Loader = () => <div className="p-6 text-center">Loading...</div>;

const appRouter = (openModal) =>
  createBrowserRouter([
    {
      element: (
        <React.Suspense fallback={<Loader />}>
          <MainLayout openLogin={openModal} openSignup={openModal} />
        </React.Suspense>
      ),
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
    {
      element: (
        <UserRoute>
          <React.Suspense fallback={<Loader />}>
            <MainLayout />
          </React.Suspense>
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
          <React.Suspense fallback={<Loader />}>
            <AdminLayout />
          </React.Suspense>
        </EmpolyerRoutes>
      ),
      children: [
        { path: "/admin", element: <PostJob /> },
        { path: "/alljobs", element: <AdminAllJobs /> },
      ],
    },
  ]);

export default appRouter;
