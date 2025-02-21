import ViewResume from '@/Components/ViewResume/ViewResume';
import useFetch from '@/CoustomHooks/useFetch';
import React from 'react'

function MyJobs() {
    const { data, loading, error, refetch } = useFetch("application/myjobs");
     console.log(data);
     


  return (
    <div className='mb-5 border-b pb-5'>
        <h2 className='text-center text-5xl my-5'>Applied Jobs</h2>
        <ul>
            {
                data?.myJobs?.map((job,i)=>(
                    <li className='w-[600px] m-auto border px-10 py-5 my-5 border-slate-700 rounded-lg bg-[rgba(25,17,51,0.5)]'>
                    <div className='flex border-b pb-5 justify-between'>
                        <div>
    
                     
                        <img src="" alt="" />
                        <div>
                        <h2 className='text-2xl mb-1'>{job.job.title}</h2>
                        <h3>{job?.postedBy?.companyName}</h3>
                        </div>
                        </div>
                        <ViewResume resumeUrl={job?.resume}/>
                       
                    </div>
                    <div className='flex gap-10 justify-between mt-5'>
                        <div>
                            <span className='text-sm text-slate-400'>JobType</span>
                            <h2>{job.job.jobType}</h2>
                        </div>
                        <div>
                            <span className='text-sm text-slate-400'>Salary</span>
                            <h2>2year</h2>
                        </div>
                        <div>
                            <span className='text-sm text-slate-400'>Eperice</span>
                            <h2>{job.job.experienceLevel}</h2>
                        </div>
    
                        <div>
                            <span className='text-sm text-slate-400'>Status</span>
                            <h2>{job?.status}</h2>
                        </div>
    
                    </div>
                </li>

                ))
            }
         
        </ul>
    </div>
  )
}

export default MyJobs