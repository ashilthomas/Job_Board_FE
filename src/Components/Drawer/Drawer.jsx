"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import instance from "@/Utils/Axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

// Validation Schema
const schema = yup.object().shape({
  resume: yup
    .mixed()
    .required("You must upload a file")
    .test(
      "fileSize",
      "File size too large (Max: 2MB)",
      (value) => value && value[0]?.size <= 2 * 1024 * 1024
    )
    .test(
      "fileFormat",
      "Unsupported format (Only PDF & DOCX)",
      (value) =>
        value &&
        ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
          value[0]?.type
        )
    ),
});

export function DrawerDemo({ id }) {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("resume", data.resume[0]);

    try {
      const response = await instance.post(`application/apply/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast({
        title: response.data.success ? "Application Submitted!" : "Application Failed",
        description: response.data.message || (response.data.success ? "Your job application was successful." : "Something went wrong."),
        variant: response.data.success ? "default" : "destructive",
      });

      if (response.data.success) reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to apply for the job.",
        variant: "destructive",
      });
      console.error("Upload error:", error);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="mt-6 bg-primary text-primary-foreground py-3 rounded-full px-10 hover:bg-purple-700">
          Apply
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Your CV/Resume</DrawerTitle>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
            <div className="border px-4 py-4 rounded-lg">
              <input type="file" {...register("resume")} className="block w-full" />
              {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>}
            </div>

            <DrawerFooter className="mt-4">
              <Button type="submit">Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
