"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
 
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import instance from "@/Utils/Axios";

import { useToast } from "@/hooks/use-toast";

// Yup Validation Schema
const schema = yup.object().shape({
  resume: yup
    .mixed()
    .test("fileRequired", "You must upload a file", (value) => value && value.length > 0)
    .test("fileSize", "File size too large (Max: 2MB)", (value) => {
      return value && value[0] && value[0].size <= 2 * 1024 * 1024;
    })
    .test("fileFormat", "Unsupported format (Only PDF & DOCX)", (value) => {
      return (
        value &&
        value[0] &&
        ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value[0].type)
      );
    }),
});

export function DrawerDemo({id}) {
    const { toast } = useToast()
 
    
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("resume", data.resume[0]); // Ensure resume is attached
  
    try {
        const response = await instance.post(
            `application/apply/${id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true, 
            }
          );
          
  
      if (response.data.success) {
        toast({
          title: "Application Submitted!",
          description: response.data.message || "Your job application was successful.",
          variant: "default", // or "success" if your toast system supports variants
        });
        reset(); // Reset form on success
      } else {
        toast({
          title: "Application Failed",
          description: response.data.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to apply for the job.",
        variant: "destructive",
      });
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

          {/* Form */}
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
