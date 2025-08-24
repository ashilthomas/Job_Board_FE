import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "@/CoustomHooks/useFetch";
import instance from "@/Utils/Axios";
import Loader from "@/Components/Loader/Loader";
import { Section } from "lucide-react";
import ViewResume from "@/Components/ViewResume/ViewResume";

function SeekerApplied() {
  const { id } = useParams();
  const { data, loading, error, fetchData } = useFetch(
    `application/getApplicationForEmployer/${id}`
  );

  console.log(data);
  

  if (loading) return <Loader />;
  if (error) return <h2 className="text-red-500">Error fetching data.</h2>;

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      await instance.put(`application/updateStatus/${applicantId}`, {
        status: newStatus,
      });
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
  <section className="mb-5 border-b py-24">
    <div className="w-[750px] py-10 m-auto border mt-5 px-10  rounded-lg">
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
                    // <a
                    //   href={`http://localhost:4000/uploads/${applicant.resume}`}
                    //   target="_blank"
                    //   rel="noopener noreferrer"
                    //   className="text-blue-500 underline"
                    // >
                    //   View Resume
                    // </a>
                    <ViewResume resumeUrl={applicant.resume} />
                  )}
                  <div className="mt-3">
                  <select
  value={applicant.status}
  onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
  className={`
    border rounded px-2 py-1 w-[180px] 
    ${applicant.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
    ${applicant.status === "reviewed" ? "bg-blue-100 text-blue-700" : ""}
    ${applicant.status === "accepted" ? "bg-green-100 text-green-700" : ""}
    ${applicant.status === "rejected" ? "bg-red-100 text-red-700" : ""}
  `}
>
  <option value="pending">Pending</option>
  <option value="reviewed">Reviewed</option>
  <option value="accepted">Accepted</option>
  <option value="rejected">Rejected</option>
</select>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-gray-500 mt-2">No applicants yet.</h2>
          )}
        </>
      )}
    </div></section>
  );
}

export default SeekerApplied;

