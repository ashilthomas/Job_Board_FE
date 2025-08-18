import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import instance from '@/Utils/Axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/Components/ui/card';
import { Skeleton } from '@/Components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';

// Memoized Job Card component
const JobCard = memo(({ job }) => (
  <Card>
    <CardHeader>
      <h2 className="text-lg">{job.title}</h2>
      <div className="flex justify-between border-b pb-2 mt-3">
        <h3>img</h3>
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
));

function JobsPage() {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    location: ''
  });

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(inputValue), 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Fetch jobs
  const fetchJobs = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await instance.get('job/search', {
        params: {
          page,
          limit: 10,
          keyword: debouncedInput,
          jobType: filters.jobType || undefined,
          experienceLevel: filters.experienceLevel || undefined,
          location: filters.location || undefined
        },
      });

      const data = response.data;
      if (data.success) {
        setJobs(data.jobs);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        console.error(data.message);
        setJobs([]);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedInput, filters]);

  // Fetch jobs when filters, debounce input, or page changes
  useEffect(() => {
    fetchJobs(1);
  }, [debouncedInput, filters, fetchJobs]);

  const handleInputChange = useCallback((e) => setInputValue(e.target.value), []);
  const handlePageChange = useCallback((page) => fetchJobs(page), [fetchJobs]);
  const handleFilterChange = useCallback((key, value) => setFilters(prev => ({ ...prev, [key]: value })), []);
  const handleClearFilters = useCallback(() => {
    setFilters({ jobType: '', experienceLevel: '', location: '' });
    setInputValue('');
    fetchJobs(1);
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => jobs, [jobs]); // Already filtered via API

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-10 space-y-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  return (
    <div className="py-24 border-b">
      {/* Search */}
      <div className="p-3 border border-slate-500 rounded-full mb-5 w-full sm:w-[50%]">
        <form onSubmit={e => { e.preventDefault(); fetchJobs(1); }} className="flex">
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
            Search
          </Button>
        </form>
      </div>

      {/* Filters */}
      <div className="flex gap-3 w-full mb-5">
        <Select onValueChange={v => handleFilterChange('jobType', v)}>
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

        <Select onValueChange={v => handleFilterChange('experienceLevel', v)}>
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

        <Select onValueChange={v => handleFilterChange('location', v)}>
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

        <button
          type="button"
          className="border px-5 py-2 rounded-md bg-primary text-primary-foreground"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <p className="text-center mt-5">No jobs found matching your search criteria.</p>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {filteredJobs.map((job, i) => <JobCard key={i} job={job} />)}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-5">
            {Array.from({ length: totalPages }, (_, idx) => (
              <Button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                disabled={currentPage === idx + 1}
                className={`mx-1 ${currentPage === idx + 1 ? 'bg-purple-600' : 'bg-gray-300'}`}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default JobsPage;
