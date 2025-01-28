import React, { useState } from 'react';
import axiosInstance from '../../admin/utils/axiosInstance';
import { notifySuccess } from '../../admin/layout/ToastMessage';
const port = process.env.REACT_APP_URL

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        mobile_number: '',
        country: '',
        address: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`${port}/addingInquiry`, formState);
            notifySuccess("Message sent successfully");
            setFormState({
                name: '',
                email: '',
                mobile_number: '',
                country: '',
                address: '',
                message: '',
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <div className='client_section'>
                <div className="min-h-screen flex items-center justify-center padding-main">
                    <div className="container border-none max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
                            <p className="text-gray-600">
                                We'd love to hear from you. Please fill out the form below or use our contact information to reach out.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Contact Form */}
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formState.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-blue-500"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formState.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-blue-500"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="mobile_number"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Contact Number
                                        </label>
                                        <input
                                            id="mobile_number"
                                            name="mobile_number"
                                            type="mobile_number"
                                            value={formState.mobile_number}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-blue-500"
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            value={formState.country}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value="">Select Country</option>
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="uk">United Kingdom</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Address
                                        </label>
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            value={formState.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-blue-500"
                                            placeholder="What is this regarding?"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formState.message}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-blue-500"
                                            placeholder="Your message here..."
                                            rows={4}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white py-2 px-4 rounded-lg"
                                        style={{ backgroundColor: "#4880FF" }}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div className="bg-white shadow-lg rounded-lg p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                        Contact Information
                                    </h2>
                                    <ul className="space-y-4">
                                        <li className="flex items-center">
                                            <span className="text-white flex items-center justify-center rounded-full mr-4" style={{ width: "40px", height: "40px", backgroundColor: "#4880FF" }}>
                                                <i className="fa-solid fa-location-dot"></i>
                                            </span>
                                            <span>123 Learning Street, Education City, 123 45</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-white flex items-center justify-center rounded-full mr-4" style={{ width: "40px", height: "40px", backgroundColor: "#4880FF" }}>
                                                <i className="fa-solid fa-phone"></i>
                                            </span>
                                            <span>
                                                <a href="tel:+17058080907">+17058080907</a>
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-white flex items-center justify-center rounded-full mr-4" style={{ width: "40px", height: "40px", backgroundColor: "#4880FF" }}>
                                                <i className="fa-solid fa-envelope"></i>
                                            </span>
                                            <span>
                                                <a className='lowercase' href="mailto:info@comfortsecurity.ca">
                                                    info@comfortsecurity.ca</a>
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white shadow-lg rounded-lg p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                        Our Location
                                    </h2>
                                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-500">Map Placeholder</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
