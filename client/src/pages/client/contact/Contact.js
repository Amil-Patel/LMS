import React, { useState } from 'react';
import '../../../assets/css/client/contact.css'

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formState);
        // Reset form after submission
        setFormState({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <>
            <div className='client_section'>
                <div className="min-h-screen flex items-center justify-center py-12 px-4">
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
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-black"
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
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-black"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Subject
                                        </label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            value={formState.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-black"
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
                                            className="w-full px-4 py-2 border rounded-sm focus:ring-1 focus:ring-black"
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
                                                <a href="mailto:info@comfortsecurity.ca">info@comfortsecurity.ca</a>
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
