"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function DropDownBtn({logOut}) {
    const {  role } = useSelector((state) => state.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to={"/myjob"}>
        <DropdownMenuItem>Profile</DropdownMenuItem></Link>
        <Link to={"/admin"}>
        <DropdownMenuItem>Admin</DropdownMenuItem></Link>

        <span onClick={logOut}>

   
        <DropdownMenuItem   >Logout</DropdownMenuItem>     </span>
        {role === 'admin' || role === 'employer' ? (
        <Link to="/admin">
          <DropdownMenuItem>Post Job</DropdownMenuItem>
        </Link>
      ) : role === 'job_seeker' ? (
        <Link to="/employer">
          <DropdownMenuItem>Post Job</DropdownMenuItem>
        </Link>
      ) : null}
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
