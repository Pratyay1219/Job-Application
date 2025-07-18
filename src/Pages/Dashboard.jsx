import { useState, useEffect } from "react";
import { Doughnut, Pie, Line } from "react-chartjs-2";
import { LuUserCircle2, LuSearch } from "react-icons/lu";
import { FaLongArrowAltRight, FaRegLightbulb } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import DashboardCard from "../Components/DashboardCard";
import "chart.js/auto";
import Timeline from "../Components/Timeline";
import React from "react";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [chartType, setChartType] = useState("pie");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    // JWT check
    if (!localStorage.getItem("jwt")) {
      window.location.href = "/login";
      return;
    }
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedData =
      JSON.parse(localStorage.getItem("applicationData")) || [];
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    setJobs(storedJobs);
    setApplicationData(storedData);
    setUserName(storedUser.name || "");
    setUserEmail(storedUser.email || "");
  }, []);

  const jobStatusCount = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(jobStatusCount),
    datasets: [
      {
        label: "Job Applications",
        data: Object.values(jobStatusCount),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  const data = {
    labels: applicationData.map((item) => item.status),
    datasets: [
      {
        label: "Applications",
        data: applicationData.map((item) => item.count),
        backgroundColor: ["#36A2EB", "#FFCE56", "#00842B", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  };

  const resources = [
    {
      title: "Resume and cover letter template",
      viewUrl: "https://zety.com/cover-letter-templates",
    },
    {
      title: "Interview preparation guide",
      viewUrl:
        "https://www.themuse.com/advice/the-ultimate-interview-guide-30-prep-tips-for-job-interview-success",
    },
    {
      title: "Job search strategies",
      viewUrl: "https://www.careerflow.ai/blog/job-search-guide",
    },
    {
      title: "Networking tips",
      viewUrl: "https://hbr.org/2023/03/a-beginners-guide-to-networking",
    },
    { title: "Career development plan", viewUrl: "" },
    { title: "Salary negotiation tactics", viewUrl: "" },
  ];

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Calculate counts from jobs array
  const totalApplications = applicationData.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const totalRejected =
    applicationData.find((item) => item.status === "Rejected")?.count || 0;
  const totalInterviews =
    applicationData.find((item) => item.status === "Interview")?.count || 0;
  const totalOffers =
    applicationData.find((item) => item.status === "Offer")?.count || 0;

  const statusOrder = ["applied", "interview", "offered", "rejected"];
  const statusLabels = {
    applied: "Applied",
    interview: "Interview",
    offered: "Offered",
    rejected: "Rejected",
  };

  // Prepare data for line chart
  const getTimelineData = () => {
    let jobsToShow = jobs;
    if (selectedJobId && selectedJobId !== "all") {
      jobsToShow = jobs.filter(j => j.id === Number(selectedJobId));
    }
    // Flatten all statusHistory entries with job info
    let allEntries = jobsToShow.flatMap(job =>
      (job.statusHistory || []).map(entry => ({
        ...entry,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
      }))
    );
    // Sort by date
    allEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
    return allEntries;
  };

  const timelineData = getTimelineData();
  const lineChartData = {
    labels: timelineData.map(e => new Date(e.date).toLocaleDateString()),
    datasets: statusOrder.map(status => ({
      label: statusLabels[status],
      data: timelineData.map(e => (e.status === status ? statusOrder.indexOf(status) + 1 : null)),
      borderColor:
        status === "applied"
          ? "#36A2EB"
          : status === "interview"
          ? "#FFCE56"
          : status === "offered"
          ? "#00842B"
          : status === "rejected"
          ? "#FF6384"
          : "#888",
      backgroundColor:
        status === "applied"
          ? "#36A2EB"
          : status === "interview"
          ? "#FFCE56"
          : status === "offered"
          ? "#00842B"
          : status === "rejected"
          ? "#FF6384"
          : "#888",
      spanGaps: true,
      showLine: true,
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.2,
    })),
  };
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Job Status Timeline" },
    },
    scales: {
      y: {
        min: 0,
        max: statusOrder.length + 1,
        ticks: {
          callback: (value) => statusLabels[statusOrder[value - 1]] || "",
          stepSize: 1,
        },
        title: { display: true, text: "Status" },
      },
      x: {
        title: { display: true, text: "Date" },
      },
    },
  };

  return (
    <div className="bg-blue-light min-h-screen">
      <div className="mb-5 flex flex-wrap justify-between items-center">
        <h1 className="font-bold text-blue text-xl lg:text-2xl">
          {getGreeting()} {userName || "User"},
        </h1>
        <div className="gap-2 items-center border-l-2 border-blue pl-4 hidden lg:flex">
          <div>
            <p className="text-[12px] text-blue">{userName || "User"}</p>
            <p className="text-[12px] text-blue">{userEmail || "you@beautiful.com"}</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg mb-4">
        <div>
          <h2 className="text-xl text-blue">Getting Started</h2>
          <div className="w-44 bg-blue/20 rounded-full h-1.5 mt-1.5">
            <div className="bg-blue h-1.5 rounded-full w-20"></div>
          </div>
          <p className="mt-1 text-[12px] text-blue">45% done</p>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            <DashboardCard
              to="/dashboard/profile"
              icon={LuUserCircle2}
              title="Complete your profile"
              description="Add more details"
            />
            <DashboardCard
              to="/dashboard/job"
              icon={LuSearch}
              title="Search for Jobs"
              description="Find jobs that match your skills"
            />
            <DashboardCard
              to="/dashboard/applications"
              icon={BsBriefcase}
              title="Update application status"
              description="Keep your job applications up to date"
            />
            <DashboardCard
              to="/dashboard"
              icon={FaRegLightbulb}
              title="Prepare for Interview"
              description="Browse our interview resources to help you prepare"
            />
          </div>

          {/* Make chart and resources full width */}
          <div className="p-4 relative bg-white shadow rounded w-full mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-blue">Applications Tracking</h3>
            </div>
            <div className="w-full">
              {/* Timeline Line Chart for job status changes */}
              <div className="mb-4">
                <label className="mr-2 font-semibold text-blue">Show timeline for:</label>
                <select
                  className="p-2 border rounded text-blue border-blue-light"
                  value={selectedJobId || "all"}
                  onChange={e => setSelectedJobId(e.target.value)}
                >
                  <option value="all">All Jobs</option>
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.jobTitle} @ {job.companyName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Add space between dropdown and Applications Tracking heading */}
              <div className="mb-4"></div>
              <Line data={lineChartData} options={lineChartOptions} />
              <div className="mt-2 text-sm text-blue">
                Total Applications:{" "}
                {selectedJobId && selectedJobId !== "all"
                  ? jobs.filter(j => j.id === Number(selectedJobId)).length
                  : jobs.length}
              </div>
              {/* Resources section full width under chart */}
              <div className="mt-8">
                <h3 className="mb-2 text-blue">Resources</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 cursor-pointer border-l-4 border-blue pl-3 pr-2 rounded shadow-sm bg-blue-light"
                    >
                      <p className="text-blue">{resource.title}</p>
                      <a
                        href={resource.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 bg-white rounded-full border border-blue-light p-1.5 pl-4 hover:bg-blue hover:text-white hover:shadow-md group"
                      >
                        <p className="hidden md:flex">View</p>
                        <div className="group-hover:bg-blue-light group-hover:rounded-full group-hover:p-1.5 bg-white p-1.5">
                          <FaLongArrowAltRight />
                        </div>
                      </a>
                      <a
                        href={resource.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:hidden p-1.5 hover:bg-blue rounded-full hover:text-white border border-blue-light"
                      >
                        <FaLongArrowAltRight />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
