import AppliedJobDetails from "@/Components/AppliedJobDetails";
import Navbar from "@/Components/Navbar";
import React, { useEffect, useState } from "react";


const AppliedJobsList = ({ auth }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showingJobDetails, setShowingJobDetails] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`/api/aplication/${auth.user.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch applications.");
                }
                const data = await response.json();
                setApplications(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (applications.length === 0) {
        return <div className="text-center text-gray-500">No applied jobs found.</div>;
    }

    return (
        <>
            <Navbar auth={auth} />
            {
                !showingJobDetails ? <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">My Applied Jobs</h1>
                    <div className="space-y-4">
                        {applications.map((application) => (
                            <div
                                key={application.id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-bold text-gray-800">
                                    {application.job.title}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Company: {application.job.company_name}
                                </p>
                                <p className="text-sm text-gray-500">Location: {application.job.location}</p>
                                <p className="text-gray-700 mt-2">
                                    Applied on: {new Date(application.created_at).toLocaleDateString()}
                                </p>
                                <button onClick={() => {
                                    setSelectedJob(application.job)
                                    setShowingJobDetails(true)
                                }
                                }
                                    className="text-indigo-500 hover:underline mt-4 block"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div> : <AppliedJobDetails job={selectedJob} setShowingJobDetails={setShowingJobDetails} />
            }

        </>
    );
};

export default AppliedJobsList;
