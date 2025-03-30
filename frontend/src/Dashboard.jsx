import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
   
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-6 bg-white shadow-md rounded-lg text-center">
            <button onClick={handleLogout} className="absolute top-5 right-5 bg-red-500 text-white p-2 rounded">
                Logout
            </button>

            <h1 className="text-3xl font-bold text-blue-600">Welcome!</h1>
            <p className="mt-2 text-gray-700">You are now logged in to your dashboard.</p>

            <div className="mt-4 p-4 bg-blue-100 rounded-lg w-3/4">
                <p className="text-gray-600">Here, you can access your account details, manage settings, and view analytics.</p>
            </div>

            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                Explore Dashboard
            </button>
        </div>
    );
};

export default Dashboard;
