import React from "react";

const AppliedJobDetails = ({ job, setShowingJobDetails }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Posted on: {new Date(job.created_at).toLocaleDateString()}
      </p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Details</h2>
        <p className="text-gray-700 leading-6 mb-4">{job.description}</p>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Company</h3>
        <p className="text-gray-700">{job.company_name}</p>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Salary</h3>
        <p className="text-gray-700 mb-4">${job.salary}</p>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Location</h3>
        <p className="text-gray-700">{job.location}</p>
        <div className="flex justify-end">
          <button
            onClick={() => setShowingJobDetails(false)}
            className="text-red-500 hover:bg-red-600 hover:text-white border-2 border-red-600 p-2 rounded-md text-xl font-bold mt-6"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobDetails;
