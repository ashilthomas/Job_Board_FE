import React from "react";
import { useParams } from "react-router-dom";
import { DrawerDemo } from "@/Components/Drawer/Drawer";
import useFetch from "@/CoustomHooks/useFetch";
import Loader from "../Components/Loader/Loader"

function JobDetails() {
  const { id } = useParams();

  // Fetch job details by ID
  const { data, loading, error } = useFetch(`jobDetails/${id}`, "GET");

  if (loading) return <Loader/>;
  if (error) return <h2 className="text-center text-red-500 mt-10">{error}</h2>;

  // Make sure we have job data
  const job = data?.job || data; // fallback if backend doesn’t wrap inside "job"
  if (!job) return <h2 className="text-center mt-10">No job found</h2>;

  // Handle skills parsing safely
  let skills = [];
  if (Array.isArray(job.skillsRequired)) {
    try {
      // If first element is stringified JSON → parse
      if (typeof job.skillsRequired[0] === "string" && job.skillsRequired[0].startsWith("[")) {
        skills = JSON.parse(job.skillsRequired[0]);
      } else {
        skills = job.skillsRequired;
      }
    } catch (err) {
      console.error("Skills parse error:", err);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 border shadow-lg rounded-lg my-10">
      {/* Job Image */}
      <img
        src={job.image}
        alt={job.title}
        className="w-full h-48 object-cover rounded-lg"
      />

      {/* Title */}
      <h1 className="text-2xl font-bold mt-4">{job.title}</h1>

      {/* Drawer Action */}
      <DrawerDemo id={job._id} />

      {/* Description */}
      <p className="text-slate-300 mt-2">{job.description}</p>

      {/* Location */}
      <p className="text-slate-300 mt-2">
        <strong>Location:</strong> {job.location}
      </p>

      {/* Experience Level */}
      <p className="text-slate-300 mt-2">
        <strong>Experience Level:</strong> {job.experienceLevel}
      </p>

      {/* Job Type */}
      <p className="text-slate-300 mt-2">
        <strong>Job Type:</strong> {job.jobType}
      </p>

      {/* Skills */}
      <div className="mt-4">
        <strong>Skills Required:</strong>
        <ul className="list-disc list-inside text-slate-300 mt-2">
          {skills.length > 0 ? (
            skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills listed</li>
          )}
        </ul>
      </div>

      {/* Company Info */}
      <p className="text-slate-300 mt-4">
        <strong>Company:</strong> {job.postedBy?.companyName} (
        {job.postedBy?.companyDetails})
      </p>

      {/* Posted By */}
      <p className="text-slate-300 mt-2">
        <strong>Posted By:</strong> {job.postedBy?.name}
      </p>

      {/* Status */}
      <p className="text-slate-300 mt-2">
        <strong>Status:</strong> {job.status}
      </p>

      {/* Date */}
      <p className="text-slate-300 mt-4 text-sm text-right">
        Posted on {new Date(job.createdAt).toDateString()}
      </p>
    </div>
  );
}

export default JobDetails;
