import JobDetail from '@/Components/JobDetail';
import Navbar from '@/Components/Navbar';
import { Link, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState({});
    const [isApplying, setIsApplying] = useState(false);

    useEffect(() => {
        const getJobs = async () => {
            fetch('/api/jobs')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setJobs(data);

                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }

        getJobs();

    }, [])

    const handleEachJobDetails = (id) => {
        fetch(`/api/jobs/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJob(data[0]);
                setIsApplying(true);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <>
            {
                !isApplying ? <>
                    <Head title="Welcome" />
                    <div className="relative  sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                        <div className={`sm:fixed sm:top-0 sm:right-0 w-full text-end ${auth.user ? "" : "text-end"}`}>
                            <Navbar auth={auth} />
                        </div>

                        <div className="max-w-7xl mx-auto p-6 lg:p-8">
                            <div className="container mx-auto p-4">
                                <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 px-4 py-2">Title</th>
                                            <th className="border border-gray-300 px-4 py-2">Description</th>
                                            <th className="border border-gray-300 px-4 py-2">Location</th>
                                            <th className="border border-gray-300 px-4 py-2">Salary</th>
                                            <th className="border border-gray-300 px-4 py-2">Company</th>
                                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs.map((job) => (
                                            <tr key={job.id} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2">{job.title}</td>
                                                <td className="border border-gray-300 px-4 py-2">{job.description.substring(0, 50)}...</td>
                                                <td className="border border-gray-300 px-4 py-2">{job.location}</td>
                                                <td className="border border-gray-300 px-4 py-2">${job.salary}</td>
                                                <td className="border border-gray-300 px-4 py-2">{job.company_name}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                                                        onClick={() => handleEachJobDetails(job.id)}
                                                    >
                                                        Details
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
                </> : <>
                    <JobDetail job={job} setIsApplying={setIsApplying} auth={auth} />

                </>
            }
        </>
    );
}
