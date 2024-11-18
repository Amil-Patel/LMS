import React, { useState, useContext } from 'react';
import axiosInstance from "../utils/axiosInstance";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { userRolesContext } from '../../admin/layout/RoleContext';

const port = process.env.REACT_APP_URL;
const SignupForm = ({ toggleLoginForm, toggleSignupForm }) => {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role_id: "student"
    });
    const navigate = useNavigate();
    const { setUserRole, setUserId } = useContext(userRolesContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const res = axiosInstance.post(`${port}/addingStudentMaster`, userData);
            toggleSignupForm();
            if (res.status === 200) {
                setUserRole(res.data.role);  // Set role in context
                setUserId(res.data.id);  // Set user ID in context
                Cookies.set('token', res.data.token, { expires: 1 });
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-2">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-600">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name='first_name'
                        className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="Enter your First Name"
                        value={userData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-2">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-600">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name='last_name'
                        className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="Enter your Last Name"
                        value={userData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="Enter your Email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="Enter your password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Sign Up
                </button>
            </form>

            {/* Alternative Actions */}
            <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">already have an account? <span onClick={toggleLoginForm} className="text-blue-500 cursor-pointer hover:underline">Login</span></p>
                <p className="text-sm text-gray-600"><a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a></p>
            </div>
        </div>
    );
};

export default SignupForm;
