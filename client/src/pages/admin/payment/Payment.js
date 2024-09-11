import React, { useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/payment/payment.css";

function Payment() {
  const [viewOpen, setViewOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const handleViewClick = (course) => {
    setCurrentCourse(course);
    setViewOpen(true);
  };

  const handleCloseEditModal = () => {
    setViewOpen(false);
    setCurrentCourse(null);
  };

  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Payment</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student name</th>
              <th>Courses Name</th>
              <th>Total Courses</th>
              <th>Amount</th>
              <th>Pay Mode</th>
              <th>Transaction Id</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="id">1</td>
              <td>
                <h6>Christine Brooks</h6>
                <p>example@gmail.com</p>
              </td>
              <td>Security Service..</td>
              <td>2</td>
              <td>250.00</td>
              <td>Stripe</td>
              <td>#12542554</td>
              <td>
                <span
                  className="view"
                  onClick={() =>
                    handleViewClick("Security Service Training BootCamp")
                  }
                >
                  <i className="fa-regular fa-eye"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewOpen && currentCourse && (
        <div className="modal">
          <div
            className="modal-container"
            style={{ width: "60%", border: "1px solid #F0F0F0" }}
          >
            <form className="coupon-form">
              <div className="pay_modulhead">
                <div>
                  <h6>Christine Brooks</h6>
                  <p className="email">example@gmail.com</p>
                </div>
                <div>
                  <h5 className="head_text">Amount</h5>
                  <p className="email">250.00</p>
                </div>
                <div>
                  <h5 className="head_text">Transaction Id</h5>
                  <p className="email">#12345678</p>
                </div>
                <div>
                  <h5 className="head_text">Payment Mode</h5>
                  <p className="email">Stripe</p>
                </div>
                <div>
                  <h5 className="head_text">Purchase Date</h5>
                  <p className="email">27-08-2014</p>
                </div>{" "}
                <div>
                  <h5 className="head_text">Bill No (Id)</h5>
                  <p className="email">124</p>
                </div>
              </div>

              <table className="payment_view_table">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Validity</th>
                    <th>Amount</th>
                    <th>Tax</th>
                    <th>Tax Amt</th>
                    <th>Discount</th>
                    <th>Net Amt</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      Security Service Training BootCamp #1245 coupon code
                    </td>
                    <td>Life Time</td>
                    <td>250.00</td>
                    <td>5%</td>
                    <td>25.00</td>
                    <td>50.00</td>
                    <td>275.00</td>
                  </tr>

                  <tr>
                    <td>Security Service Training BootCamp </td>
                    <td>Life Time</td>
                    <td>250.00</td>
                    <td>5%</td>
                    <td>25.00</td>
                    <td>0.00</td>
                    <td>275.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="payment_2table">
                <table className="customer-info-table">
                  <tbody>
                    <tr>
                      <th>Mobile</th>
                      <td>9104190049</td>
                    </tr>
                    <tr>
                      <th>Cust Name</th>
                      <td>Aakib Valuda</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>601 B wing Momin Nagae</td>
                    </tr>
                    <tr>
                      <th>GSTIN</th>
                      <td>29AAACH7409R1ZX</td>
                    </tr>
                    <tr>
                      <th>PAN</th>
                      <td>29AAACH7409R1ZX</td>
                    </tr>
                  </tbody>
                </table>

                <table className="amount-details-table">
                  <tbody>
                    <tr>
                      <th>Sub Total</th>
                      <th>1000.00</th>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>100.00</td>
                    </tr>
                    <tr>
                      <th>Total Amount</th>
                      <th>900.00</th>
                    </tr>
                    <tr>
                      <td>Tax (Inc.)</td>
                      <td>0.00</td>
                    </tr>
                    <tr className="net-amount-row">
                      <th>Net Amount</th>
                      <th>920.00</th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="back-to-coupons"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Payment;
