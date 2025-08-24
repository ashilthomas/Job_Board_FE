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
  <section className="py-24 ">
  <div className="max-w-3xl mx-auto p-8 bg-white/10 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl my-10">
    {/* Job Image */}
    <img
      src={job.image}
      alt={job.title}
      className="w-full h-56 object-cover rounded-xl shadow-md"
    />

    {/* Title + Action */}
    <div className="flex items-center justify-between mt-6">
      <h1 className="text-3xl font-extrabold text-white">{job.title}</h1>
      <DrawerDemo id={job._id} />
    </div>

    {/* Description */}
    <p className="text-gray-300 mt-4 leading-relaxed">{job.description}</p>

    {/* Info Grid */}
    <div className="grid sm:grid-cols-2 gap-4 mt-6 text-gray-300">
      <p>
        <strong className="text-white">📍 Location:</strong> {job.location}
      </p>
      <p>
        <strong className="text-white">🎯 Experience:</strong> {job.experienceLevel}
      </p>
      <p>
        <strong className="text-white">💼 Type:</strong> {job.jobType}
      </p>
      <p>
        <strong className="text-white">📌 Status:</strong>{" "}
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            job.status === "Open"
              ? "bg-green-600/30 text-green-400"
              : "bg-red-600/30 text-red-400"
          }`}
        >
          {job.status}
        </span>
      </p>
    </div>

    {/* Skills */}
    <div className="mt-6">
      <strong className="text-white">🛠 Skills Required:</strong>
      <ul className="flex flex-wrap gap-2 mt-3">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <li
              key={index}
              className="px-3 py-1 text-sm bg-indigo-600/20 text-indigo-300 rounded-full"
            >
              {skill}
            </li>
          ))
        ) : (
          <li className="text-gray-400">No skills listed</li>
        )}
      </ul>
    </div>

    {/* Company Info */}
    <div className="mt-6 text-gray-300 space-y-2">
      <p>
        <strong className="text-white">🏢 Company:</strong>{" "}
        {job.postedBy?.companyName} ({job.postedBy?.companyDetails})
      </p>
      <p>
        <strong className="text-white">👤 Posted By:</strong> {job.postedBy?.name}
      </p>
    </div>

    {/* Date */}
    <p className="text-gray-400 mt-6 text-sm text-right italic">
      📅 Posted on {new Date(job.createdAt).toDateString()}
    </p>
  </div>
</section>

  );
}

export default JobDetails;
