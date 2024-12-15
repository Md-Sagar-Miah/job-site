import React, { useState } from 'react';
import Navbar from './Navbar';
import JobApplicationForm from './JobApplicationForm';

const JobDetail = ({ job, setIsApplying, auth }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <Navbar auth={auth} />
            {!showForm ? (
                <div className="max-w-4xl mx-auto p-10 bg-gray-50 shadow-lg rounded-lg my-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{job.title}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Company</h2>
                            <p className="text-gray-600">{job.company_name}</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Location</h2>
                            <p className="text-gray-600">{job.location}</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Salary</h2>
                            <p className="text-gray-600">${job.salary}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow-md mb-10">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed">{job.description}</p>
                    </div>

                    <div className="flex justify-center space-x-6">
                        <button
                            onClick={() => setIsApplying(false)}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            ) : (
                <JobApplicationForm auth={auth} job={job} setShowForm={setShowForm} />
            )}
        </>
    );
};

export default JobDetail;
