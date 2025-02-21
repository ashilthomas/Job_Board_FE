import React from "react";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import LogoCrsl from "@/Components/LogoCrsl/LogoCrsl";
import CountAnm from "@/Components/CountAnm/CountAnm";

function LandingPage() {
  const jobCategories = [
    {
      title: "Marketing & Communication",
      jobsAvailable: "58 Jobs Available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
    },
    {
      title: "Design & Development",
      jobsAvailable: "120 Jobs Available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
          />
        </svg>
      ),
    },
    {
      title: "Human Research & Development",
      jobsAvailable: "199 Jobs Available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Finance Management",
      jobsAvailable: "237 Jobs Available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      ),
    },
    {
      title: "Armforce Guide & Security",
      jobsAvailable: "120 Jobs Available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
    },
    {
      title: "Business & Consulting",
      jobsAvailable: "47 Jobs Available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
      ),
    },
    {
      title: "Customer Support Care",
      jobsAvailable: "20 Jobs Available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
    },
    {
      title: "Project Management",
      jobsAvailable: "87 Jobs Available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <main className="">
      {/* Hero */}
      <div className=" flex flex-col gap-20 h-[100vh] py-10 items-center">
        <div className="mt-10 ">
          <h2 className="text-7xl font-bold text-center mb-5">
            Get The <span className="text-purple-600">Right Job</span>
          </h2>
          <h2 className="text-7xl font-bold text-center mb-5">You Deserve</h2>
          <h6 className="text-lg font-normal text-center mb-5">
            1,80,570 jobs listed here! Your dream job is waiting.
          </h6>
        </div>

        <form className="grid grid-cols-1 border-purple-500 border sm:grid-cols-2 sm:gap-y-3 gap-y-3 md:grid-cols-4 md:gap-y-0 drop-shadow-2xl bg-black p-3 md:p-5 rounded-md md:rounded-full md:w-7/12 w-full">
          <Input
            placeholder="Keywords (e.g., Developer, Designer)"
            aria-label="Search keywords"
            className="input-placeholder w-full"
          />
          <Input
            placeholder="Location (e.g., New York)"
            aria-label="Search location"
            className="input-placeholder w-full md:border-l border-slate-400"
          />
          <Input
            placeholder="Categories (e.g., IT, Marketing)"
            aria-label="Search categories"
            className="input-placeholder w-full md:border-l border-slate-400"
          />
          <Button
            variant="purple"
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
          >
            Search Jobs
          </Button>
        </form>
      </div>

      {/* About */}
      <section className="about-section">
        <LogoCrsl />
        {/* <CountAnm/> */}
      </section>
      <section className="pt-24 pb-24">
        <div className="mb-9">
          <h2 className="text-center text-3xl font-bold">One Platform</h2>
          <h2 className="text-center text-3xl font-bold text-primary">
            Many Solutions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {jobCategories.map((val, i) => (
            <article className="border rounded-lg border-primary  p-6 flex justify-center items-center gap-4 cursor-pointer  bg-card">
              <span>{val.icon}</span>
              <div>
                <h2>{val.title}</h2>
                <h2 className="text-slate-400">{val.jobsAvailable}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="pt-24 pb-24">
        <div className="max-w-[1100px] flex flex-col md:flex-row   sm:gap-4  rounded-2xl m-auto bg-primary  ">
          <img
            className="h-96 "
            src="https://jobify-demos.astoundify.com/skin-2/wp-content/uploads/sites/5/2022/01/happy-good-looking-man-in-glasses-pointing-finger-left-1-croped.png"
            alt=""
          />
          <div className=" text-center md:text-start pb-5 px-4 md:w-[70%] mt-5">
            <h2 className="text-primary-foreground text-4xl font-bold mb-5">
              Get Matched The Most Valuable Jobs, Just Drop Your CV at Jobify
            </h2>

            <p className="text-slate-200 mb-5 ">
              In the subject line of your email, write your name, the
              description of the position and its reference number. If you did
              not find the vacancy on the employer’s website,
            </p>

            <Button
              variant="purple"
              className="bg-primary-foreground text-black px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Uploade Cv
            </Button>
          </div>
        </div>
      </section>
      <section className="pt-24 pb-24">
        <div className="flex flex-col md:flex-row  m-auto md:rounded-full bg-[rgba(25,17,51,0.5)] border-primary border py-10  justify-between px-10">
          <div>
            <h2 className="text-3xl font-bold ">
              Never Want to Miss Any{" "}
              <span className="text-primary">
                Job <br />
                News?
              </span>{" "}
            </h2>
          </div>
          <div>
            <div>
              <form
                action=" "
                className="flex flex-col md:flex-row gap-1 md:border   md:rounded-full py-2 px-2"
              >
                <Input
                  placeholder="Send Email"
                  aria-label="Search keywords"
                  className="input-placeholder w-full border mb-2 md:mb-0 md:border-none rounded-full"
                />
                <Button
                  variant="purple"
                  className="bg-purple-600 text-white px-4  rounded-full py-2 hover:bg-purple-700"
                >
                  Search Jobs
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
