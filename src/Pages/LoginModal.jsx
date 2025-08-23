"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useToast } from "@/hooks/use-toast";
import instance from "@/Utils/Axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/userData";
import { Button } from "@/Components/ui/button";

// ✅ Validation schemas using Yup
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const signupSchema = yup.object().shape({
  name: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function LoginModel({ closeModal, initialView = "login" }) {

  
  const [view, setView] = useState(initialView);

  
  const { toast } = useToast();
  const dispatch = useDispatch()



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(view === "login" ? loginSchema : signupSchema),
  });

  useEffect(() => {
    reset(); // Clear form fields when switching views
  }, [view, reset]);

  // ✅ Toggle between login and signup
  const toggleView = () => {
    setView((prev) => (prev === "login" ? "signup" : "login"));
    reset(); // Reset form when switching views
  };



  // ✅ Handle form submission using Axios
  const onSubmit = async (data) => {
    try {
      const endpoint = view === "login" ? "auth/login" : "auth/register"; // Change endpoint dynamically

      const response = await instance.post(endpoint, data,{withCredentials:true});
      console.log(response.data);
      

    if(response.data.success){
      dispatch(setUser(response.data))
    }
      toast({
        title: "Success!",
        description: response.data.message || `You are now ${view === "login" ? "logged in" : "signed up"}.`,
      });

      closeModal(); // Close modal on success
    } catch (error) {
      console.log(error);
      

      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center  bg-background bg-opacity-70">
      <div className="bg-card rounded-lg shadow-md p-6 w-full max-w-md relative border  max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="border-b border-border mb-3">
          <button
            onClick={closeModal}
            className="absolute top-3 right-5 border-2 border-muted px-2 rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
          {/* Header */}
          <h2 className="text-xl text-card-foreground font-semibold mb-4">
            {view === "login" ? "Login" : "Sign Up"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username (only for Signup) */}
          {view === "signup" && (
            <div className="mb-4">
              <label className="block text-sm text-foreground font-medium mb-1">Username</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your username"
                className="block w-full border border-border rounded-md p-2 text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-foreground font-medium mb-1">Email *</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="block w-full border border-border rounded-md p-2 text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm text-foreground font-medium mb-1">Password *</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="block w-full border border-border rounded-md p-2 text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : view === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>

        {/* Toggle View */}
        <div className="mt-4 text-sm text-muted-foreground text-center">
          {view === "login" ? (
            <p>
              Don’t have an account?{" "}
              <button onClick={toggleView} className="text-primary hover:underline">
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={toggleView} className="text-primary hover:underline">
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModel;
