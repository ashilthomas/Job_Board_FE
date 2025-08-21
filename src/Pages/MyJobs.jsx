import Loader from '@/Components/Loader/Loader';
import ViewResume from '@/Components/ViewResume/ViewResume';
import useFetch from '@/CoustomHooks/useFetch';
import React from 'react'

function MyJobs() {
    const { data, loading, error } = useFetch("application/myjobs");

    if (loading) return <Loader/>; // Show loader
    if (error) return <p className="text-red-500">Error: {error}</p>; // Show error

    return (
        <div className="mb-5 border-b pb-5">
            <h2 className="text-center text-5xl my-5">Applied Jobs</h2>

            {data?.success ? (
                // ✅ If jobs exist, map them
                <ul>
                    {data.myJobs.map((job, i) => (
                        <li
                            key={i}
                            className="w-[600px] m-auto border px-10 py-5 my-5 border-slate-700 rounded-lg bg-[rgba(25,17,51,0.5)]"
                        >
                            <div className="flex border-b pb-5 justify-between">
                                <div>
                                    <h2 className="text-2xl mb-1">{job.job.title}</h2>
                                    <h3>{job.job.postedBy.companyName}</h3>
                                </div>
                            </div>
                            <div className="flex gap-10 justify-between mt-5">
                                <div>
                                    <span className="text-sm text-slate-400">JobType</span>
                                    <h2>{job.job.jobType}</h2>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-400">Experience</span>
                                    <h2>{job.job.experienceLevel}</h2>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-400">Status</span>
                                    <h2>{job.status}</h2>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                // ❌ If no jobs, show message from backend
                <p className="text-center text-2xl text-white mt-10">
                    {data?.message || "No job applied"}
                </p>
            )}
        </div>
    );
}

export default MyJobs