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
import Loader  from "./Components/Loader/Loader";
// const ManageJobs = lazy(() => import("./Pages/ManageJobs"));
import ManageJobs from "./Pages/ManageJobs";

// Protected route
import ProtectedRoute from "./Utils/protectedRoutes/ProtectedRoute";


// Fallback Loader


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
        <ProtectedRoute checkEndpoint="checkUser">
          <React.Suspense fallback={<Loader />}>
            <MainLayout />
          </React.Suspense>
        </ProtectedRoute>
      ),
      children: [
        { path: "/myjob", element: <MyJobs /> },
        { path: "/recommended", element: <RecommendedJobs /> },
        { path: "/seekerapplyedjobs/:id", element: <SeekerApplied /> },
        { path: "/jobdetails/:id", element: <JobDetails /> },
        { path: "/jobs", element: <JobsPage /> },
        // { path: "/employer/managejobs", element: <PostJobVerify /> },
        { path: "/employer/verify", element: <PostJobVerify /> }
      ],
    },
    {
      element: (
        <ProtectedRoute checkEndpoint="checkEmployer">
          <React.Suspense fallback={<Loader />}>
            <MainLayout />
          </React.Suspense>
        </ProtectedRoute>
      ),
      children: [
        { path: "/employer/addjob", element: <PostJob /> },
        { path: "/employer/managejobs", element: <ManageJobs/> },
        ,
      ],
    },
    {
      element: (
        <ProtectedRoute checkEndpoint="checkAdmin">
          <React.Suspense fallback={<Loader />}>
            <AdminLayout />
          </React.Suspense>
        </ProtectedRoute>
      ),
      children: [
        { path: "/admin", element: <PostJob /> },
        { path: "/alljobs", element: <ManageJobs /> },
     
      ],
    },
  ]);

export default appRouter;
