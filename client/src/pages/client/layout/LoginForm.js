import React from 'react';

const LoginForm = ({ toggleSignupForm }) => {

    return (
        <div>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
            <form>
                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
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
