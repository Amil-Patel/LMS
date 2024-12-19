import React, { useState, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { userRolesContext } from '../../admin/layout/RoleContext';
import { notifySuccess, notifyInfo } from '../../admin/layout/ToastMessage';
import Cookies from 'js-cookie';
const port = process.env.REACT_APP_URL;

const LoginForm = ({ toggleSignupForm, toggleLoginForm }) => {
    const { setStuUserId, setStuUserRole } = useContext(userRolesContext);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post(`${port}/studentlogin`, loginData)
            if (res.status === 200) {
                setStuUserRole(res.data.role);
                setStuUserId(res.data.id);
                console.log(res.data.role, res.data.id)
                Cookies.set('student-token', res.data.token, { expires: 10 });
                notifySuccess(res.data.message);
                toggleLoginForm();
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 404) {
                    notifyInfo(data.message); // "Email does not exist"
                } else if (status === 401) {
                    notifyInfo(data.message); // "Incorrect password"
                } else {
                    notifyInfo("An unexpected error occurred. Please try again.");
                }
            } else {
                console.log(error);
                notifyInfo("Unable to connect to the server. Please check your network.");
            }
        }
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={loginData.email}
                        className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="Enter your email"
                        autoComplete='email'
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={loginData.password}
                        className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>

            {/* Alternative Actions */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Don't have an account? <span className="text-blue-500 hover:underline cursor-pointer" onClick={toggleSignupForm}>Sign Up</span></p>
                <p className="text-sm text-gray-600"><a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a></p>
            </div>
        </div>
    );
};

export default LoginForm;
