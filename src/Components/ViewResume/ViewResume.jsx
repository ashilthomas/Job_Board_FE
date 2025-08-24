
import React from 'react'

function ViewResume({resumeUrl}) {
  console.log(resumeUrl);
  
    if (!resumeUrl) return <p className="text-red-500">No resume uploaded.</p>;

    return (
      <a
   
    href={`https://job-board-be-21s5.onrender.com/uploads/${resumeUrl}`} 
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View Resume
      </a>
    );
}

export default ViewResume



   // href={`https://job-board-be-21s5.onrender.com/uploads/${resumeUrl}`}