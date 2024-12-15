import React, { useState } from "react";

const JobApplicationForm = ({ auth, job, setShowForm }) => {

    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const applicationData = {
            user_id: parseInt(auth.user.id, 10),
            job_id: parseInt(job.id, 10),
            cover_letter: coverLetter,
        };

        console.log(applicationData)

        try {
            const response = await fetch("/api/aplication", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(applicationData),
            });

            if (response.ok) {
                setMessage("Application submitted successfully!");
                setCoverLetter("");
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Failed to submit application.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Apply for the Job "{job.title}" </h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="coverLetter">
                        Cover Letter
                    </label>
                    <textarea
                        id="coverLetter"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        required
                        rows="4"
                        className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full text-white font-bold py-2 px-4 rounded-lg ${loading ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Apply"}
                </button>
            </form>

            {message && (
                <p className={`mt-4 text-center ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default JobApplicationForm;
