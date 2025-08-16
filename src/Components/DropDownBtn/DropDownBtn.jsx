"use client";

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "lucide-react"; // Cleaner icon

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

export const DropDownBtn = React.memo(function DropDownBtn({ logOut }) {
  const { role } = useSelector((state) => state.user);

  const postJobPath =
    role === "admin" || role === "employer"
      ? "/admin"
      : role === "job_seeker"
      ? "/employer"
      : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="User Menu">
          <User className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <Link to="/myjob">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>

        {(role === "admin" || role === "employer") && (
          <Link to="/admin">
            <DropdownMenuItem>Admin</DropdownMenuItem>
          </Link>
        )}

        {postJobPath && (
          <Link to={postJobPath}>
            <DropdownMenuItem>Post Job</DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
