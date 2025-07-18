import React, { useState } from "react";

const AddNewJobs = ({ setJobModal, onAddJob }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [status, setStatus] = useState("applied");
  // Remove statusDate state

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      jobTitle,
      companyName,
      applicationDate,
      status,
      statusHistory: [
        { status, date: applicationDate || new Date().toISOString() }
      ],
    };
    onAddJob(newJob);
    setJobTitle("");
    setCompanyName("");
    setApplicationDate("");
    setStatus("applied");
    setJobModal(false);
  };

  return (
    <div className="fixed inset-0 bg-blue/80 z-40">
  <div className="p-6 w-[80%] lg:w-[50%] shadow-md fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-blue-light rounded-lg">
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue">Add New Job</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="border border-blue rounded-md p-2 outline-none focus:ring-[1px] focus:ring-blue"
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border border-blue rounded-md p-2 outline-none focus:ring-[1px] focus:ring-blue"
          required
        />
        <input
          type="date"
          placeholder="Application Date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
          className="border border-blue rounded-md p-2 outline-none focus:ring-[1px] focus:ring-blue"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-blue rounded-md p-2 outline-none focus:ring-[1px] focus:ring-blue"
          required
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="bg-blue text-white rounded-md py-2 px-4"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setJobModal(false)}
            className="bg-white border border-blue text-blue rounded-md py-2 px-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default AddNewJobs;
