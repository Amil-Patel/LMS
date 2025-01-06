import React, { useContext, useEffect, useMemo, useState } from "react";
import Hoc from "../layout/Hoc";
import axiosInstance from '../../client/utils/axiosInstance';
import { userRolesContext } from "../layout/RoleContext";
import moment from "moment-timezone";
import "../../../assets/css/payment/payment.css";
import Loading from "../layout/Loading";
const port = process.env.REACT_APP_URL;

function Payment() {
  const { setting } = useContext(userRolesContext);
  const [viewOpen, setViewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const handleViewClick = (course) => {
    const time = moment.unix(course.createdAt).tz(setting.timezone).format("DD-MM-YYYY");
    setCurrentCourse((prev) => ({
      ...prev,
      ...course,
      createdAt: time
    }));

    if (Array.isArray(course.courseNames)) {
      const sub_total = course.courseNames.reduce((courseSum, course) => {
        return courseSum + (course.course_price || 0);
      }, 0);

      setSubTotal(sub_total);

      const total_discount = course.courseNames.reduce((discountSum, course) => {
        const discount = course?.course_price * (course?.course_discount / 100);
        return discountSum + discount;
      }, 0);

      setTotalDiscount(total_discount);

      const inclusiveTax = course.courseNames.reduce((taxSum, course) => {
        if (course.is_inclusive == 1) {
          const amountWithDiscount = course?.course_price - (course?.course_price * (course?.course_discount / 100));
          const tax_amount = amountWithDiscount * (course?.tax_rate / 100);
          taxSum += tax_amount;
        }
        return taxSum;
      }, 0);

      setInclusiveTax(inclusiveTax);
    } else {
      console.error("`course.courseNames` is not an array:", course.courseNames);
    }

    setViewOpen(true);
  };


  const handleCloseEditModal = () => {
    setViewOpen(false);
    setCurrentCourse(null);
  };
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [inclusiveTax, setInclusiveTax] = useState(0);
  //get payment data
  const [paymentData, setPaymentData] = useState([]);
  const getPaymentData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingPaymentData`);
      setPaymentData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  const filteredData = useMemo(() => {
    return paymentData.filter((item) => {
      const courseNames = item?.courseNames?.map((course) => course.course_title);
      return item.studentName.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.studentName.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.amount).toLowerCase().includes(searchQuery.toLowerCase()) ||
        courseNames.some((courseName) => courseName.toLowerCase().includes(searchQuery.toLowerCase()));
    })
  })


  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Payment</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-input" type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="id">{item.id}</td>
                <td>
                  <h6>{item?.studentName?.first_name} {item?.studentName?.last_name}</h6>
                  <p>{item?.studentName?.email}</p>
                </td>
                <td>
                  {item?.courseNames?.map((course, index) => (
                    <span key={index}>{course.course_title}{index < item.courseNames.length - 1 && ', '}</span>
                  ))}
                </td>
                <td>{item?.courseNames?.length}</td>
                <td>{setting.position == "left" ? setting.symbol : ""}{item?.amount}{setting.position == "right" ? setting.symbol : ""}</td>
                <td>{item?.payment_mode}</td>
                <td>{item?.transiction_id}</td>
                <td>
                  <span
                    className="view"
                    onClick={() => handleViewClick(item)}
                  >
                    <i className="fa-regular fa-eye"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                    <h6>{currentCourse?.studentName?.first_name} {currentCourse?.studentName?.last_name}</h6>
                    <p className="email">{currentCourse?.studentName?.email}</p>
                  </div>
                  <div>
                    <h5 className="head_text">Amount</h5>
                    <p className="email">{setting.position == "left" ? setting.symbol : ""}{currentCourse?.amount}{setting.position == "right" ? setting.symbol : ""}</p>
                  </div>
                  <div>
                    <h5 className="head_text">Transaction Id</h5>
                    <p className="email">{currentCourse?.transiction_id}</p>
                  </div>
                  <div>
                    <h5 className="head_text">Payment Mode</h5>
                    <p className="email">{currentCourse?.payment_mode}</p>
                  </div>
                  <div>
                    <h5 className="head_text">Purchase Date</h5>
                    <p className="email">{currentCourse?.createdAt}</p>
                  </div>{" "}
                  <div>
                    <h5 className="head_text">Bill No (Id)</h5>
                    <p className="email">{currentCourse?.id}</p>
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
                    {
                      currentCourse?.courseNames?.map((item) => {
                        const discount = item?.course_price * (item?.course_discount / 100);
                        const withDiscountPrice = item.course_price - discount
                        const tax_amount = withDiscountPrice * (item?.tax_rate / 100);
                        const net_amount = item?.course_price - tax_amount - item?.course_discount;
                        return (
                          <tr>
                            <td>{item?.course_title}</td>
                            <td>{item?.expiring_time == 'limited_time' ? 'Limited Time' : 'Life Time'}</td>
                            <td>{setting.position == "left" ? setting.symbol : ""}{item?.course_price}{setting.position == "right" ? setting.symbol : ""}</td>
                            <td>{(item?.tax_rate) ? item?.tax_rate : 0}%</td>
                            <td>
                              {setting.position == "left" ? setting.symbol : ""}{parseFloat(tax_amount).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
                            </td>
                            <td>
                              {setting.position == "left" ? setting.symbol : ""}{discount ? discount : 0}{setting.position == "right" ? setting.symbol : ""}
                            </td>
                            <td>
                              {setting.position == "left" ? setting.symbol : ""}{parseFloat(net_amount).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>

                <div className="payment_2table">
                  <table className="customer-info-table">
                    <tbody>
                      <tr>
                        <th>Mobile</th>
                        <td>{currentCourse?.bill_mobile}</td>
                      </tr>
                      <tr>
                        <th>Cust Name</th>
                        <td>{currentCourse?.bill_name}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{currentCourse?.bill_address}</td>
                      </tr>
                      <tr>
                        <th>GSTIN</th>
                        <td>{currentCourse?.bill_gst}</td>
                      </tr>
                      <tr>
                        <th>PAN</th>
                        <td>{currentCourse?.bill_pan}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="amount-details-table">
                    <tbody>
                      <tr>
                        <th>Sub Total</th>
                        <th>
                          {setting.position == "left" ? setting.symbol : ""}{parseFloat(subTotal).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
                        </th>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <td>
                          {setting.position == "left" ? setting.symbol : ""}{parseFloat(totalDiscount).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
                        </td>
                      </tr>
                      <tr>
                        <th>Total Amount</th>
                        <th>
                          {setting.position == "left" ? setting.symbol : ""}{parseFloat(subTotal - totalDiscount).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}</th>
                      </tr>
                      <tr>
                        <td>Tax (Inc.)</td>
                        <td>
                          {setting.position == "left" ? setting.symbol : ""}{parseFloat(inclusiveTax).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
                        </td>
                      </tr>
                      <tr className="net-amount-row">
                        <th>Net Amount</th>
                        <th>
                          {setting.position == "left" ? setting.symbol : ""}{parseFloat((subTotal - totalDiscount) + inclusiveTax).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="secondary-btn module-btn"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>


    </>
  );
}

export default Payment;
