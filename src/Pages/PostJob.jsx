import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "@/Components/Input/FormInput";
import { jobSchema } from "@/Utils/JobSchema";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import instance from "@/Utils/Axios";


function PostJob() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
    } = useForm({
        resolver: yupResolver(jobSchema),
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const skills = Array.isArray(data.skillsRequired)
                ? data.skillsRequired
                : data.skillsRequired.split(",").map((s) => s.trim());
            
            const salary = {
                min: data.minSalary,
                max: data.maxSalary,
            };

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("location", data.location);
            formData.append("salary", JSON.stringify(salary)); // Stringify salary
            formData.append("skillsRequired", JSON.stringify(skills)); // Stringify skills
            formData.append("experienceLevel", data.experienceLevel);
            formData.append("jobType", data.jobType);

            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]); // Append the image file
            }

            const response = await instance.post("job", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },withCredentials:true
            });

            console.log(response.data);
            alert("Job posted successfully!");
            reset(); // Reset the form
        } catch (error) {
            console.error("Error posting job:", error);
            alert("Failed to post job. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <seciton className="pt-[100px]">
        <div className="pt-[100px] pb-[100px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput name="title" label="Job Title" register={register} errors={errors} />
                <FormInput name="description" label="Job Description" register={register} errors={errors} type="textarea" />

                <div className="grid md:grid-cols-3 grid-cols-1 w-full gap-x-4">
                    <FormInput name="location" label="Job Location" register={register} errors={errors}    />
                    <FormInput name="minSalary" label="Minimum Salary" register={register} errors={errors} type="number"   />
                    <FormInput name="maxSalary" label="Maximum Salary" register={register} errors={errors} type="number"  />
                </div>

                <FormInput name="skillsRequired" label="Skills Required (comma-separated)" register={register} errors={errors} />

                <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                        Experience Level
                    </label>
                    <Select
                        value={getValues("experienceLevel") || ""}
                        onValueChange={(value) => setValue("experienceLevel", value, { shouldValidate: true })}
                    >
                        <SelectTrigger className="w-full border bg-inherit rounded-md p-2">
                            <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Entry">Entry</SelectItem>
                            <SelectItem value="Mid">Mid</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.experienceLevel && (
                        <p className="text-red-500 text-sm mt-1">{errors.experienceLevel.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                        Job Type
                    </label>
                    <Select
                        value={getValues("jobType") || ""}
                        onValueChange={(value) => setValue("jobType", value, { shouldValidate: true })}
                    >
                        <SelectTrigger className="w-full border bg-inherit rounded-md p-2">
                            <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>}
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Job Image
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className={`w-full border rounded-md p-2 ${errors.image ? "border-red-500" : "border-gray-400"}`}
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-purple-700"
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Post Job"}
                </button>
            </form>
        </div>
        </seciton>
    );
}

export default PostJob;
