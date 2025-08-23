
import React from "react";
import { useParams } from "react-router-dom";
 // Import Axios instance
import {  Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "@/Components/ui/select";
import useFetch from "@/CoustomHooks/useFetch";
import instance from "@/Utils/Axios";
import Loader from "@/Components/Loader/Loader";


function SeekerApplied() {
  const { id } = useParams();
  const { data, loading, error, fetchData } = useFetch(
    `application/getApplicationForEmployer/${id}`
  );

  if (loading) return <Loader/>;
  if (error) return <h2 className="text-red-500">Error fetching data.</h2>;

  console.log(data);
  

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      await instance.put(`application/updateStatus/${applicantId}`, {
        status: newStatus,
      });

      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="w-[750px]  m-auto border mt-5 px-10 py-5 rounded-lg">
      {data && (
        <>
          <div className="border-b pb-5">
            <h2 className="text-xl font-semibold">{data.job.title}</h2>
          </div>
          {data.applicants.length > 0 ? (
            data.applicants.map((applicant, index) => (
              <div
                key={index}
                className="flex justify-between pt-5 border-b pb-4"
              >
                <div>
                  <h2 className="text-lg font-medium">{applicant.name}</h2>
                  <h2 className="text-gray-600">{applicant.email}</h2>
                </div>
                <div>
                  {applicant.resume && (
                    <a
                      href={`http://localhost:4000/uploads/${applicant.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Resume
                    </a>
                  )}
                  <div className="mt-3">

              
                  <Select
                    onValueChange={(value) =>
                      handleStatusChange(applicant.id, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={applicant.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-gray-500 mt-2">No applicants yet.</h2>
          )}
        </>
      )}
    </div>
  );
}

export default SeekerApplied;
