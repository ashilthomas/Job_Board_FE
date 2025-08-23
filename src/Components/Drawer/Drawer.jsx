"use client";
import React, { useState } from "react";
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

// ✅ Validation Schema
const schema = yup.object().shape({
  resume: yup
    .mixed()
    .test("required", "Please upload your resume", (value) => value && value.length > 0)
    .test("fileSize", "File size must be less than 2MB", (value) =>
      value && value[0] ? value[0].size <= 2 * 1024 * 1024 : false
    )
    .test("fileFormat", "Only PDF or DOCX allowed", (value) =>
      value && value[0]
        ? ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
            value[0].type
          )
        : false
    ),
});

export function DrawerDemo({ id }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", data.resume[0]);

    try {
      // ⚠️ Check your backend route — I’m assuming plural `/applications`
      const response = await instance.post(`/application/apply/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: response.data.success ? "Application Submitted!" : "Application Failed",
        description:
          response.data.message ||
          (response.data.success
            ? "Your job application was successful."
            : "Something went wrong."),
        variant: response.data.success ? "default" : "destructive",
      });

      if (response.data.success) reset({ resume: null });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Network error: Failed to apply for the job.",
        variant: "destructive",
      });
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer >
      <DrawerTrigger asChild>
        <Button
          className="mt-6 bg-primary text-primary-foreground py-3 rounded-full px-10 hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Apply"}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Your CV/Resume</DrawerTitle>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
            <div className="border px-4 py-4 rounded-lg">
              <input
                type="file"
                accept=".pdf,.docx"
                {...register("resume")}
                className="block w-full"
                aria-label="Upload Resume"
              />
              {errors.resume && (
                <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
              )}
            </div>

            <DrawerFooter className="mt-4 flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Submit"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
