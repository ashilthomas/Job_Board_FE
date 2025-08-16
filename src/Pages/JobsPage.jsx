import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';


import instance from '@/Utils/Axios';

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/Components/ui/card';
import { Skeleton } from '@/Components/ui/skeleton';
import {  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, } from '@/Components/ui/select';

// Memoized Job Card component to prevent unnecessary re-renders
const JobCard = memo(({ job }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg">{job.title}</h2>
        <div className="flex justify-between border-b pb-2 mt-3">
          <h3 className="">img</h3>
          <h3 className="text-slate-400 text-sm">{job.location}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{job.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link to={`/jobdetails/${job._id}`} className="w-full block">
          <Button
            variant="purple"
            className="bg-purple-600 text-white px-4 py-2 rounded-full w-full hover:bg-purple-700"
          >
            More Info
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

function JobsPage() {
  const [inputValue, setInputValue] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    location: ''
  });

  const handleClearFilters = useCallback(() => {
    setFilters({
      jobType: '',
      experienceLevel: '',
      location: ''
    });
    setInputValue(''); // Clear search input
    setCurrentPage(1); // Reset to first page
    fetchJobs(); // Refetch jobs without filters
  }, [fetchJobs]);
  

  // Define fetchJobs with useCallback to prevent unnecessary re-renders
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await instance.get('job/search', {
        params: {
          page: currentPage,
          limit: 10,
          keyword: inputValue,
        },
      });
      const data = response.data;
      if (data.success) {
        setJobs(data.jobs);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, inputValue]);

  // Fetch jobs from the API
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Handle input change for search with debounce
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500); // 500ms delay
    
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Handle input change for search
  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  // Handle search form submission
  const handleSearch = useCallback((event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchJobs();
  }, [fetchJobs]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Filter jobs based on selected filters using useMemo for performance
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      return (
        (filters.jobType === '' || job.jobType === filters.jobType) &&
        (filters.experienceLevel === '' || job.experienceLevel === filters.experienceLevel) &&
        (filters.location === '' || job.location === filters.location)
      );
    });
  }, [jobs, filters.jobType, filters.experienceLevel, filters.location]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center space-x-4 mt-10">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 border-b">
      <div className="p-3 border border-slate-500 rounded-full mb-5 w-full sm:w-[50%]">
        <form onSubmit={handleSearch} className="flex">
          <Input
            placeholder="Keyword"
            aria-label="Search categories"
            className="input-placeholder w-full"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="purple"
            className="bg-purple-600 text-white px-10 text-sm py-2 rounded-full hover:bg-purple-700"
          >
            Search Jobs
          </Button>
        </form>
      </div>

      {/* Filter Selectors */}
      <div className='flex gap-3 w-full'>
        <div className='flex-1'>
          <Select onValueChange={(value) => handleFilterChange('jobType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="JobType" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>JobType</SelectLabel>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex-1'>
          <Select onValueChange={(value) => handleFilterChange('experienceLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="ExperienceLevel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ExperienceLevel</SelectLabel>
                <SelectItem value="Entry">Entry</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex-1'>
          <Select onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                <SelectItem value="Kannur">Kannur</SelectItem>
                <SelectItem value="Kochi">Kochi</SelectItem>
                <SelectItem value="Kozikode">Kozikode</SelectItem>
                <SelectItem value="Banglore">Banglore</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <button className='border text-center px-5 py-2 rounded-md bg-primary text-primary-foreground' onClick={handleClearFilters}>Clear</button>
        </div>
      </div>

      {/* Display filtered jobs */}
      {filteredJobs.length === 0 ? (
        <div className="text-center mt-5">
          <p>No jobs found matching your search criteria.</p>
        </div>
      ) : (
        <>
          <div className="mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {filteredJobs.map((job, i) => (
              <JobCard key={i} job={job} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-5">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                className={`mx-1 ${currentPage === index + 1 ? 'bg-purple-600' : 'bg-gray-300'}`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default JobsPage;