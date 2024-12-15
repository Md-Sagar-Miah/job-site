import React, { useState, useEffect } from "react";
import ApplicationDropdown from "@/Components/ApplicationDropdown";
import Navbar from "@/Components/Navbar";

const JobApplication = ({ auth }) => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = new URLSearchParams(window.location.search);
    const job_id = parseInt(params.get("id"));
    const user_id = auth?.user?.id;

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/jobs/user/${user_id}/${job_id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch job details.");
                }
                const data = await response.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [job_id, user_id]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!job) {
        return <p className="text-center text-gray-500">No job data available.</p>;
    }

    return (
        <>
            <Navbar auth={auth} />
            <div className="max-w-5xl mx-auto p-8 bg-gray-100 shadow-md rounded-lg my-8">
                {/* Job Details */}
                <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-3xl font-bold mb-4 text-blue-600">{job.title}</h2>
                    <p className="text-gray-700 mb-6">{job.description}</p>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-800">{job.location}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Salary</p>
                            <p className="font-medium text-gray-800">${job.salary}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Company Name</p>
                            <p className="font-medium text-gray-800">{job.company_name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Posted By </p>
                            <p className="font-medium text-gray-800">{auth.user.name}</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">Posted On</p>
                    <p className="font-medium text-gray-800">
                        {new Date(job.created_at).toLocaleDateString()}
                    </p>
                </div>

                {/* Applications */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Applications</h3>

                    {job.applications.length === 0 ? (
                        <p className="text-gray-500">No applications yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {job.applications.map((application) => (
                                <ApplicationDropdown
                                    key={application.id}
                                    application={application}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};



export default JobApplication;
