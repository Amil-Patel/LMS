import React, { useState } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { notifySuccess, notifyWarning } from '../../admin/layout/ToastMessage';

const port = process.env.REACT_APP_URL;
const SignupForm = ({ toggleLoginForm }) => {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role_id: "student"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation function
    const validate = () => {
        if (!userData.first_name.trim()) {
            notifyWarning("First name is required.");
            return false;
        }
        if (!userData.last_name.trim()) {
            notifyWarning("Last name is required.");
            return false;
        }
        if (!userData.email.trim()) {
            notifyWarning("Email is required.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            notifyWarning("Enter a valid email address.");
            return false;
        }
        if (!userData.password) {
            notifyWarning("Password is required.");
            return false;
        }
        if (userData.password.length < 8) {
            notifyWarning("Password must be at least 8 characters.");
            return false;
        }
        if (!/[A-Z]/.test(userData.password)) {
            notifyWarning("Password must contain at least one uppercase letter.");
            return false;
        }
        if (!/\d/.test(userData.password)) {
            notifyWarning("Password must contain at least one number.");
            return false;
        }
        return true; // All validations passed
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(port)
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const res = await axiosInstance.post(`${port}/addingStudentMaster`, userData);
            if (res.status === 200) {
                notifySuccess("Account created successfully. Please log in to continue.");
                toggleLoginForm();
            }
        } catch (error) {
            console.error("Error signing up:", error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Sign Up</h2>
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
                        autoComplete='username'
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
                        autoComplete='username'
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
                        autoComplete='email'
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
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
            </form>

            {/* Alternative Actions */}
            <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">already have an account? <span onClick={toggleLoginForm} className="text-blue-500 cursor-pointer hover:underline">Login</span></p>
            </div>
        </div>
    );
};

export default SignupForm;
