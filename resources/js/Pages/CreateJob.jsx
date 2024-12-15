import Navbar from '@/Components/Navbar';
import { useState } from 'react';


const CreateJob = ({ auth }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        company_name: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');
        const { title, description, location, salary, company_name } = formData;
        const persedSalary = parseFloat(salary);
        const { email } = auth.user;

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.user.api_token}`,
                },
                body: JSON.stringify({ title, description, location, salary: persedSalary, company_name, email }),
            });
            if (response.ok) {
                setSuccessMessage('Job created successfully!');
                setFormData({
                    title: '',
                    description: '',
                    location: '',
                    salary: '',
                    company_name: '',
                });
            } else {
                const errorData = await response.json();
                setErrors(errorData.errors);
                console.log(errorData.errors);
            }

        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <>
            <Navbar auth={auth} />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Create a Job</h2>
                {successMessage && (
                    <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter job title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Job Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.description ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter job description"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.location ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter job location"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                            Salary
                        </label>
                        <input
                            type="number"
                            name="salary"
                            id="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.salary ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter salary"
                        />
                        {errors.salary && (
                            <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="company_name"
                            id="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.company_name ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter company name"
                        />
                        {errors.company_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Job
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateJob;

