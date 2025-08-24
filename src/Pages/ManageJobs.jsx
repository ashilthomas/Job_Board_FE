import React from "react";
import useFetch from "@/CoustomHooks/useFetch";
import { useSelector } from "react-redux";
import instance from "@/Utils/Axios";
import { Link } from "react-router-dom";
import Loader from "@/Components/Loader/Loader";

function ManageJobs() {
  const { role } = useSelector((state) => state.user);

  const apiEndpoint = role === "employer" ? "employerJob" : "job";

  console.log(apiEndpoint);
  
  const { data, loading, error, fetchData } = useFetch(apiEndpoint);

  console.log(data);
  

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await instance.put(`updatejobStatus/${jobId}`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await instance.delete(`deleteJob/${jobId}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <h2 className="text-red-500">Error loading jobs.</h2>;

  return (
  <div className="py-24 px-6  min-h-screen">
  {data?.jobs?.length === 0 ? (
    <h2 className="text-center text-gray-500 mt-10 text-lg">
      No jobs found.
    </h2>
  ) : (
    <div className="grid gap-6">
      {data.Jobs?.map((job) => (
        <div
          key={job._id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200"
        >
          {/* Title clickable */}
          <Link to={`/seekerapplyedjobs/${job._id}`}>
            <h2 className="text-2xl font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer">
              {job.title}
            </h2>
          </Link>

          {/* Job details */}
          <div className="flex flex-wrap gap-4 border-b border-gray-200 py-4 mt-2 text-gray-600">
            <span className="flex items-center gap-2 text-sm">
              📍 {job.location}
            </span>
            <span className="flex items-center gap-2 text-sm">
              💼 {job.jobType}
            </span>
            <span
              className={`flex items-center gap-2 text-sm font-medium ${
                job.status === "Open" ? "text-green-600" : "text-red-500"
              }`}
            >
              {job.status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-4">
        <select
  defaultValue={job.status}
  onChange={(e) => handleStatusChange(job._id, e.target.value)}
  className="
    appearance-none
    w-40
    px-4 py-2
    text-sm font-medium
    rounded-full
    border border-gray-300
    bg-black
    shadow-sm
    cursor-pointer
    transition
    hover:border-indigo-400
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
  "
>
  <option value="Open" className="text-green-600 font-semibold">
    ✅ Open
  </option>
  <option value="Closed" className="text-red-500 font-semibold">
    ❌ Closed
  </option>
</select>


            <button
              onClick={() => handleDelete(job._id)}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}

export default ManageJobs;
