import React, { useState } from 'react'

const ApplicationDropdown = ({ application }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border bg-white rounded-lg shadow-md overflow-hidden">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex justify-between items-center p-4 bg-blue-100 hover:bg-blue-200 transition"
            >
                <div>
                    <p className="text-lg font-medium text-blue-700">{application.user.name}</p>
                    <p className="text-sm text-gray-500">{application.user.email}</p>
                </div>
                <button
                    className="text-blue-700 font-bold text-lg"
                    aria-label="Toggle application details"
                >
                    {isOpen ? "-" : "+"}
                </button>
            </div>
            {isOpen && (
                <div className="p-4">
                    <p className="text-sm text-gray-500">Cover Letter</p>
                    <p className="text-gray-700 mb-4">{application.cover_letter}</p>

                    <p className="text-sm text-gray-500">Applied On</p>
                    <p className="font-medium text-gray-800">
                        {new Date(application.created_at).toLocaleDateString()}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ApplicationDropdown
