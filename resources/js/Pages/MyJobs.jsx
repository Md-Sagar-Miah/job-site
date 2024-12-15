import Navbar from '@/Components/Navbar'
import React, { useState, useEffect } from 'react';
import UpdateJob from '@/Components/UpdateJob';
import { Link } from '@inertiajs/react';

const MyJobs = ({ auth }) => {
    const [jobs, setJobs] = useState([]);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobIsEditing, setJobIsEditing] = useState(false);



    // Fetch jobs for the logged-in user
    useEffect(() => {
        const fetchJobs = async () => {
            fetch(`/api/jobs/user/${auth.user.email}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setJobs(data);
                    setLoading(false);

                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        };

        fetchJobs();
    }, []);
    // Handle Delete job
    const handleDelete = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                const res = await fetch(`/api/jobs/${jobId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: auth.user.id }),
                });
                if (res.ok) {
                    setJobs(jobs.filter(job => job.id !== jobId));
                }

            } catch (error) {
                console.error("Error deleting job:", error);
            }
        }
    };

    // Handle Edit job
    const handleEdit = (jobId) => {
        setId(jobId);
        setJobIsEditing(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (<>
        <Navbar auth={auth} />
        {!jobIsEditing ? <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Your Posted Jobs</h2>
            {jobs.length === 0 ? (
                <p className="text-center text-gray-600">You haven't posted any jobs yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-separate border-spacing-2">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2 text-sm font-medium text-gray-700">#</th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700">Title</th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700">Description</th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-800">{job.id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{job.title}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{job.description.substring(0, 50)}...</td>
                                    <td className="px-4 py-2">
                                        <Link
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 text-sm me-2"
                                            href={route('jobapplications', { id: job.id })}
                                        >
                                            Applications
                                        </Link>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 text-sm"
                                            onClick={() => handleEdit(job.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 text-sm ml-2"
                                            onClick={() => handleDelete(job.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div> : <UpdateJob auth={auth} id={id} />}

    </>
    );
}

export default MyJobs
