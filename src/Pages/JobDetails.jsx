import { DrawerDemo } from '@/Components/Drawer/Drawer'

import useFetch from '@/CoustomHooks/useFetch';
import React from 'react'
import { useParams } from 'react-router-dom';

function JobDetails() {
    const { id } = useParams();

    
    const { data, loading, error, refetch } = useFetch(`job/${id}`, "POST");

    
    if(loading){
        return <h2>Loading...</h2>
    }

    
    
    
  return (
    <div className="max-w-3xl mx-auto p-6  border shadow-lg rounded-lg my-10">
    <img src={data?.job.image} alt={data?.job.title} className="w-full h-48 object-cover rounded-lg" />
    <h1 className="text-2xl font-bold mt-4">{data.job.title}</h1>
   
  
    <DrawerDemo id={data?.job?._id}/>
    <p className="text-slate-300 mt-2">{data?.job?.description}</p>
    <p className="text-slate-300 mt-2">
      <strong>Location:</strong> {data?.job.location}
    </p>
    <p className="text-slate-300 mt-2">
      <strong>Experience Level:</strong> {data?.job?.experienceLevel}
    </p>
    <p className="text-slate-300 mt-2">
      <strong>Job Type:</strong> {data?.job?.jobType}
    </p>
    <div className="mt-4">
      <strong>Skills Required:</strong>
      <ul className="list-disc list-inside text-slate-300 mt-2">
    {data?.job.skillsRequired.map((skill, index) => (
      <li key={index}>{skill}</li>
    ))}
  </ul>
    </div>
    <p className="text-slate-300 mt-4">
      <strong>Company:</strong> {data?.job.postedBy.companyName} ({data?.job.postedBy.companyDetails})
    </p>
    <p className="text-slate-300 mt-2">
      <strong>Posted By:</strong> {data?.job.postedBy.name}
    </p>
    <p className="text-slate-300 mt-2">
      <strong>Status:</strong> {data?.job.status}
    </p>
    <p className="text-slate-300 mt-4 text-sm text-right">Posted on {new Date(data?.job.createdAt).toDateString()}</p>
  
  </div>
  )
}

export default JobDetails