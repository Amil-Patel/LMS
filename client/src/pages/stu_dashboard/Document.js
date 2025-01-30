import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../client/layout/Navbar'
import Sidebar from './layout/Sidebar'
import DocumentBreadcrumb from './DocumentBreadcrumb';
import axiosInstance from '../client/utils/axiosInstance';
import { userRolesContext } from '../admin/layout/RoleContext';
import { notifyError, notifySuccess } from '../admin/layout/ToastMessage';
const port = process.env.REACT_APP_URL
const Document = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const { stuUserId } = useContext(userRolesContext);
    const getEnrolledCourses = async () => {
        if (!stuUserId) {
            return;
        }
        try {
            const response = await axiosInstance.get(`${port}/gettingEnrollWithStuId/${stuUserId}`);
            setEnrolledCourses(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }

    //get document data
    const [documentData, setDocumentData] = useState([]);
    const getDocumentData = async () => {
        if (!stuUserId) {
            return;
        }
        try {
            const response = await axiosInstance.get(`${port}/gettingUserDocumentWithStuId/${stuUserId}`);
            setDocumentData(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const [addUserDocument, setAddUserDocument] = useState({
        student_id: stuUserId,
        course_id: "",
        attachment: "",
        status: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddUserDocument((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validExtensions = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // MIME types for .pdf and .docx
            if (validExtensions.includes(file.type)) {
                setAddUserDocument((prev) => ({
                    ...prev,
                    attachment: file,
                }));
            } else {
                notifyError("Only .pdf or .docx files are allowed.");
            }
        }
    };

    const saveUSerDocument = async (e) => {
        e.preventDefault();
        if (!addUserDocument.course_id) {
            notifyError("Please select a course.");
            return;
        }
        if (!addUserDocument.attachment) {
            notifyError("Please upload a file.");
            return;
        }
        const formData = new FormData();
        formData.append("student_id", stuUserId);
        formData.append("course_id", addUserDocument.course_id);
        formData.append("attachment", addUserDocument.attachment);
        formData.append("status", addUserDocument.status);
        try {
            const response = await axiosInstance.post(`${port}/addingUserDocument`, formData);
            notifySuccess("Document uploaded successfully");
            getDocumentData();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEnrolledCourses();
        getDocumentData()
    }, [stuUserId]);
    return (
        <>
            <Navbar />
            <DocumentBreadcrumb />
            <div className='client_section'>
                <div className='main_stu_dashboard'>
                    <Sidebar />
                    <div className="main static bg-[white] ml-[30px] p-0" style={{ scrollbarWidth: "none" }} >
                        <div className="course-form-container pt-0" style={{boxShadow:"none"}}>
                            <div className='profile_header_title flex items-center bg-white justify-between'>
                                <h1 className='student_dashboard_profile_header_title'>Documents</h1>
                            </div>
                            <form className='student_profile_form' onSubmit={saveUSerDocument}>
                                {/* first / middle / last  name */}
                                <div className="flex-row name gap-4 mb-0">
                                    <div className="w-full sm:w-3/5 form-group mb-0">
                                        <label htmlFor="course_select">
                                            Select Course<span className="required">*</span>
                                        </label>
                                        <select className="col12input" id="course_select" name="course_id" onChange={handleChange}>
                                            <option value="">Select Course</option>
                                            {enrolledCourses.map((course) => (
                                                <option key={course.course_id} value={course.course_id}>{course.course_master_enrollment.course_title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-0">
                                        <label htmlFor="attachment">
                                            Attachment<span className="required">*</span>
                                        </label>
                                        <input
                                            id="attachment"
                                            type="file"
                                            name="attachment"
                                            placeholder="Enter File Name"
                                            onChange={handleFileChange}
                                            className="col12input"
                                        />
                                    </div>
                                    <button type="submit" className="primary-btn module-btn">Save</button>
                                </div>
                            </form>
                            <div className="table-responsive overflow-y-scroll  " style={{scrollbarWidth:"none"}}>
                            <table className="table table-striped table-hover mt-8">
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Course Name</th>
                                            <th>Attachment</th>
                                            <th>Status</th>
                                            <th>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documentData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.course_id}</td>
                                                <td>
                                                    <a href={`../upload/${item.attachment}`} target="_blank" rel="noopener noreferrer">
                                                        View
                                                    </a>
                                                </td>
                                                <td>{item.status}</td>
                                                <td>{item.message}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Document
