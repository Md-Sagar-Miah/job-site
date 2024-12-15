import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const Navbar = ({ auth }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage()

    return (
        <>
            {auth?.user ?
                <nav className="bg-orange-600 text-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href={route("welcome")} className="text-lg font-bold">
                                    JobSite
                                </Link>
                            </div>

                            {/* Links for Large Screens */}
                            <div className="hidden md:flex space-x-6">
                                <Link href={route("welcome")} className={`${url == "/" ? "text-white" : "text-black"} hover:text-orange-300`}>
                                    Home
                                </Link>
                                <Link href={route("create-job")} className={`${url == "/job/create" ? "text-white" : "text-black"} hover:text-orange-300`}>
                                    Create Job
                                </Link>
                                <Link href={route("application")} className={`${url == "/job/my/application" ? "text-white" : "text-black"} hover:text-orange-300`}>
                                    My Applications
                                </Link>
                                <Link href={route("my-job")} className={`${url == "/job/my/posts" ? "text-white" : "text-black"} hover:text-orange-300`}>
                                    My posted Jobs
                                </Link>
                                <Link href={route("dashboard")} className={`${url == "/dashboard" ? "text-white" : "text-black"} hover:text-orange-300`}>
                                    Dashboard
                                </Link>
                                <Link href={route("profile.edit")} className={`${url == "/profile" ? "text-white" : "text-black"} hover:text-orange-300`}>
                                    Profile
                                </Link>

                            </div>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="text-white hover:text-orange-300 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {isOpen ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16m-7 6h7"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden bg-orange-700">
                            <Link
                                href={route("welcome")}
                                className="block px-4 py-2 hover:bg-orange-800"
                            >
                                Home
                            </Link>
                            <Link
                                href={route("create-job")}
                                className="block px-4 py-2 hover:bg-orange-800"
                            >
                                Create Job
                            </Link>
                        </div>
                    )}
                </nav> :
                <div className=' me-6 mt-4'>
                    <Link
                        href={route('login')}
                        className="font-semibold bg-green-200 p-2 rounded-md hover:bg-green-300 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Log in
                    </Link>

                    <Link
                        href={route('register')}
                        className="ms-4 font-semibold bg-green-200 p-2 hover:bg-green-300 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Register
                    </Link>
                </div>
            }
        </>
    );

};

export default Navbar;
