import React from 'react';
// Custom CSS for animation (see below)

const LogoSlider = () => {
  return (
    <div className="overflow-hidden  pb-5">
      <div className="flex items-center space-x-8 animate-scroll">
        {/* First set of logos */}
       
        <img
             
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4bcfe75cce5f76709_goolgle.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf487cce3fbb1cacef7_sap.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf428843986d3d0690a_university.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf46273bdbcb3bf283c_upwork.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4c3ca1c705cba6842_jp%20morgan.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4abc5f1c409a20c9e_techstar.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
          
           
        <img
             
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4bcfe75cce5f76709_goolgle.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf487cce3fbb1cacef7_sap.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf428843986d3d0690a_university.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf46273bdbcb3bf283c_upwork.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4c3ca1c705cba6842_jp%20morgan.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4abc5f1c409a20c9e_techstar.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
          
           
        {/* Duplicate set of logos for seamless scrolling */}
        {/* {Array(10)
          .fill()
          .map((_, i) => (
            <img
              key={`logo-2-${i}`}
              src="http://res.cloudinary.com/dayadp2ft/image/upload/v1736313686/lxm96bauegjlykcpfyl4.png"
              alt="Company Logo"
              className="h-20 opacity-80 transition-opacity duration-300 hover:opacity-100"
            />
          ))} */}
           <img
             
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4bcfe75cce5f76709_goolgle.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf487cce3fbb1cacef7_sap.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf428843986d3d0690a_university.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf46273bdbcb3bf283c_upwork.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4c3ca1c705cba6842_jp%20morgan.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4abc5f1c409a20c9e_techstar.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
          
           <img
             
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4bcfe75cce5f76709_goolgle.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf487cce3fbb1cacef7_sap.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf428843986d3d0690a_university.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf46273bdbcb3bf283c_upwork.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4c3ca1c705cba6842_jp%20morgan.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
           <img
            
             src="https://cdn.prod.website-files.com/65cb81c1d7b5c84b09d0b178/65fcbcf4abc5f1c409a20c9e_techstar.svg"
             alt="Company Logo"
             className="h-8 opacity-80 transition-opacity duration-300 hover:opacity-100"
           />
          
      </div>
    </div>
  );
};

export default LogoSlider;
