import React, { useEffect, useState } from "react";
import Hoc from "../layout/Hoc";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../layout/Loading";
const port = process.env.REACT_APP_URL;

function Inquiry() {
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [currentInquiry, setCurrentInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentViewData, setCurrentViewData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [inquiryData, setInquiryData] = useState([]);

  const getInquiryData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingInquiry`);
      setInquiryData(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching inquiry data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInquiryData();
  }, []);

  const handleEditClick = (inquiry) => {
    setCurrentInquiry(inquiry);
    setSelectedStatus(inquiry.status || "pending");
    setEditOpen(true);
  };

  const handleViewClick = (inquiry) => {
    setCurrentViewData(inquiry);
    setViewOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditOpen(false);
    setCurrentInquiry(null);
  };

  const handleCloseViewModal = () => {
    setViewOpen(false);
    setCurrentViewData(null);
  };

  const handleEditSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!currentInquiry) return;

    try {
      const updatedData = { status: selectedStatus };
      await axiosInstance.put(`${port}/updateInquiryStatus/${currentInquiry.id}`, updatedData);
      getInquiryData();
      handleCloseEditModal();
      setLoading(false);
    } catch (error) {
      console.error("Error updating status", error);
      setLoading(false);
    }
  };

  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteToggleModal = (index) => {
    setDeleteOpen(!deleteOpen);
    setDeleteId(index);
  };

  const handledeleteClick = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(`${port}/deleteInquiry/${deleteId}`);
      getInquiryData();
      setDeleteOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting inquiry", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Inquiry</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-input" type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student name</th>
              <th>Contact info</th>
              <th>Country</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiryData.length > 0 ? (
              inquiryData.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>{inquiry.id}</td>
                  <td>
                    <h6>{inquiry.name}</h6>
                    <p>{inquiry.summery}</p>
                  </td>
                  <td>
                    <p>Email: <span className="lowercase">{inquiry.email}</span></p>
                    <p>Call: {inquiry.mobile_number}</p>
                  </td>
                  <td>{inquiry.country}</td>
                  <td className="inq_message">
                    <p>{inquiry.message.substring(0, 20)}...</p>
                  </td>
                  <td className="del_icon">
                    <span
                      className="view"
                      onClick={() => handleViewClick(inquiry)}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </span>
                    <span
                      className="edit"
                      onClick={() => handleEditClick(inquiry)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </span>
                    <span
                      className="edit"
                      onClick={() => deleteToggleModal(inquiry.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <p>No inquiry data available</p>
            )}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editOpen && currentInquiry && (
          <div className="modal">
            <div className="modal-container">
              <h5>Edit Status</h5>
              <form onSubmit={handleEditSubmit}>

                <div className="flex items-center">
                  <label className="text-base font-semibold">Status:</label>
                  <div className="px-2">
                    <input className="align-middle"
                      type="radio"
                      id="success"
                      name="status"
                      value="success"
                      checked={selectedStatus === "success"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                    <label htmlFor="success">Success</label>
                  </div>
                  <div className="px-1">
                    <input className="align-middle"
                      type="radio"
                      id="pending"
                      name="status"
                      value="pending"
                      checked={selectedStatus === "pending"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                    <label htmlFor="pending">Pending</label>
                  </div>
                  <div className="px-2">
                    <input className="align-middle"
                      type="radio"
                      id="rejected"
                      name="status"
                      value="rejected"
                      checked={selectedStatus === "rejected"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                    <label htmlFor="rejected">Rejected</label>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="submit" className="primary-btn">Save</button>
                  <button type="button" onClick={handleCloseEditModal} className="secondary-btn">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewOpen && currentViewData && (
          <div className="modal">
            <div className="modal-container">
              <h5>Inquiry Details</h5>
              <table>
                <tbody>
                  {Object.entries(currentViewData).map(([key, value]) => {
                    if (key === "is_registreted" || key === "updatedAt" || key === "createdAt") return null;
                    const displayKey = key === "summery" ? "ADDRESS" : key.replace(/_/g, " ").toUpperCase();
                    const isStatusField = key === "status";
                    const statusColor =
                      value === "success" ? "green" : value === "rejected" ? "red" : "black";
                    const isEmail = key === "email";
                    return (
                      <tr key={key}>
                        <td>
                          <strong>{displayKey}</strong>
                        </td>
                        <td style={{
                          ...isStatusField && { color: statusColor },
                          ...isEmail && { textTransform: "lowercase" }
                        }}>{value}</td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
              <button onClick={handleCloseViewModal} className="secondary-btn">Close</button>
            </div>
          </div>
        )}
        {/* delete modal */}
        {deleteOpen && (
          <div className="modal">
            <div className="modal-container">
              <h5>Delete Inquiry</h5>
              <p>Are you sure you want to delete this Inquiry?</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button className="primary-btn" onClick={handledeleteClick}>
                  Delete
                </button>
                <button onClick={deleteToggleModal} className="secondary-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Inquiry;
