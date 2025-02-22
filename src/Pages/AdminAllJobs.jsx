import React from "react";
import useFetch from "@/CoustomHooks/useFetch";
import { useSelector } from "react-redux";

import instance from "@/Utils/Axios";
import {   Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "@/Components/ui/select";

function AdminAllJobs() {
  const { role } = useSelector((state) => state.user);
  const apiEndpoint = role === "employer" ? "employerJob" : "job";
  const { data, loading, error, fetchData } = useFetch(apiEndpoint);
  

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await instance.put(`updatejobStatus/${jobId}`, { status: newStatus });
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await instance.delete(`deleteJob/${jobId}`);
      await fetchData(); 

     
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="text-red-500">Error loading jobs.</h2>;

  return (
    <div className="p-5">
      {data?.empJobs?.length === 0 ? (
        <h2 className="text-center text-gray-500 mt-10">No jobs found.</h2>
      ) : (
        data?.empJobs?.map((job) => (
          <div key={job._id} className="border border-slate-700 rounded-sm m-10">
            <h2 className="px-10 pt-5 text-2xl flex items-center gap-2">
              {job.title}
            </h2>
            <div className="flex justify-between border-b border-slate-700 px-10 py-5">
              <h2 className="text-base flex items-center gap-1">{job.location}</h2>
              <h2 className="text-base flex items-center gap-1">{job.jobType}</h2>
              <h2 className="text-base flex items-center">{job.status}</h2>
            </div>
            <div className="flex justify-between px-10 py-4">
              <span className="text-right">
                <Select onValueChange={(value) => handleStatusChange(job._id, value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </span>
              <span
                onClick={() => handleDelete(job._id)}
                className="text-right border border-slate-700 px-10 cursor-pointer py-2 bg-[rgba(25,17,51,0.5)] rounded-sm"
              >
                Delete
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminAllJobs;
