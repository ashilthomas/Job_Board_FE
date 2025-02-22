import useFetch from '@/CoustomHooks/useFetch';
import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/Components/ui/card';

function RecommendedJobs() {
  const { data, loading, error, refetch } = useFetch('recommend');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
      {data.map((item,i) => (
               <Card key={i}>
               <CardHeader>
                 <h2 className="text-lg">{item.job.title}</h2>
                 <div className="flex justify-between border-b pb-2 mt-3">
                   <h3 className="">img</h3>
                   <h3 className="text-slate-400 text-sm">{item.job.location}</h3>
                 </div>
               </CardHeader>
               <CardContent>
                 <CardDescription>{item.job.description}</CardDescription>
               </CardContent>
               <CardFooter>
                 <Link to={`/jobdetails/${item.job._id}`} className="w-full block">
                   <Button
                     variant="purple"
                     className="bg-purple-600 text-white px-4 py-2 rounded-full w-full hover:bg-purple-700"
                   >
                     More Info
                   </Button>
                 </Link>
               </CardFooter>
             </Card>
        // <div key={item.job._id} className="job-card">
        //   <h2>{item.job.title}</h2>
        //   <p>{item.job.description}</p>
        //   <p>Location: {item.job.location}</p>
        //   <p>Experience Level: {item.job.experienceLevel}</p>
        //   <p>Job Type: {item.job.jobType}</p>
        //   <p>Match Score: {item.matchScore}%</p>
        //   <p>Skills Required:</p>
        //   <ul>
        //     {item.job.skillsRequired.map((skill, index) => (
        //       <li key={index}>{skill}</li>
        //     ))}
        //   </ul>
        // </div>
      ))}
    </div>
  );
}

export default RecommendedJobs;
