"use client";

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

export const DropDownBtn = React.memo(function DropDownBtn({ logOut }) {
  const { role } = useSelector((state) => state.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="User Menu">
          <User className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* Common: profile */}
        <Link to="/myjob">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>

        {/* Admin routes */}
        {role === "admin" && (
          <>
            <Link to="/admin">
              <DropdownMenuItem>Post Job</DropdownMenuItem>
            </Link>
            <Link to="/alljobs">
              <DropdownMenuItem>Manage Jobs</DropdownMenuItem>
            </Link>
          </>
        )}

        {/* Employer routes */}
        {role === "employer" && (
          <>
            <Link to="/employer/addjob">
              <DropdownMenuItem>Add Job</DropdownMenuItem>
            </Link>
            <Link to="/employer/managejobs">
              <DropdownMenuItem>Manage Jobs</DropdownMenuItem>
            </Link>
          </>
        )}

        {/* Job seeker: upgrade path */}
        {role === "job_seeker" && (
          <Link to="/employer/verify">
            <DropdownMenuItem>Become an Employer</DropdownMenuItem>
          </Link>
        )}

        {/* Logout + Settings */}
        <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
