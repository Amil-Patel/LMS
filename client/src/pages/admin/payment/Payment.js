import React, { useContext, useEffect, useMemo, useState } from "react";
import Hoc from "../layout/Hoc";
import axiosInstance from '../../client/utils/axiosInstance';
import { userRolesContext } from "../layout/RoleContext";
import moment from "moment-timezone";
import "../../../assets/css/payment/payment.css";
import Loading from "../layout/Loading";
const port = process.env.REACT_APP_URL;

const Payment = () => {
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

    if (Array.isArray(course.orderDetails)) {
      const sub_total = course.orderDetails.reduce((courseSum, course) => {
        return courseSum + parseFloat(course.course_amount || 0);
      }, 0);
      setSubTotal(sub_total);

      const total_discount = course.orderDetails.reduce((discountSum, course) => {
        const discount = course?.course_amount * (course?.discount / 100);
        return discountSum + discount;
      }, 0);
      setTotalDiscount(total_discount);

      const inclusiveTax = course.orderDetails.reduce((taxSum, course) => {
        if (course.is_inclusive == 1) {
          const amountWithDiscount = course?.course_amount - (course?.course_amount * (course?.discount / 100));
          const tax_amount = amountWithDiscount * (parseFloat(course?.course_tax) / 100);
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
              <th style={{ width: '3%', paddingLeft: '15px' }}>ID</th>
              <th style={{ width: '17%' }}>Student name</th>
              <th style={{ width: '33%' }}>Courses Name</th>
              <th style={{ width: '12%' }}>Total Courses</th>
              <th style={{ width: '6%' }}>Amount</th>
              <th style={{ width: '10%' }}>Pay Mode</th>
              <th style={{ width: '14%' }}>Transaction Id</th>
              <th style={{ width: '5%' }}>View</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="id pl-4">{item.id}</td>
                <td>
                  <h6>{item?.studentName?.first_name} {item?.studentName?.last_name}</h6>
                  <p className="lowercase">{item?.studentName?.email}</p>
                </td>
                <td>
                  {item?.orderDetails?.map((course, index) => (
                    <span key={index}>{course.course_title}{index < item.orderDetails.length - 1 && ', '}</span>
                  ))}
                </td>
                <td>{item?.orderDetails?.length}</td>
                <td>{setting.position == "left" ? setting.symbol : ""}{item?.amount}{setting.position == "right" ? setting.symbol : ""}</td>
                <td>{item?.payment_mode}</td>
                <td>{item.transiction_id ? item.transiction_id : "-"}</td>
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
                    <p className="email lowercase">{currentCourse?.studentName?.email}</p>
                  </div>
                  <div>
                    <h5 className="head_text">Amount</h5>
                    <p className="email">{setting.position == "left" ? setting.symbol : ""}{parseFloat(Number(currentCourse?.amount || 0) + Number(inclusiveTax || 0)).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}</p>
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
                    <h5 className="head_text">Bill No:(ID)</h5>
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
                      <th>Inclusive</th>
                      <th>Exclusive</th>
                      <th>Discount</th>
                      <th>Net Amt</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      currentCourse?.orderDetails?.map((item, index) => {
                        const discount = item?.course_amount * (item?.discount / 100);
                        const withDiscountPrice = item.course_amount - discount;
                        const tax_amount = withDiscountPrice * (item?.course_tax / 100);
                        const net_amount = item?.course_amount - tax_amount - item?.discount;
                        const isInclusive = item?.is_inclusive == 1 ? "Yes" : "-";
                        const isExcusive = item?.is_exclusive == 1 ? "Yes" : "-";
                        return (
                          <tr key={index + 1}>
                            <td>{item?.course_title}</td>
                            <td>{item?.expiring_time == 'limited_time' ? 'Limited Time' : 'Life Time'}</td>
                            <td>{setting.position == "left" ? setting.symbol : ""}{item?.course_amount}{setting.position == "right" ? setting.symbol : ""}</td>
                            <td>{(parseFloat(item?.course_tax)) ? parseFloat(item?.course_tax) : 0}%</td>
                            <td>
                              {setting.position == "left" ? setting.symbol : ""}{parseFloat(tax_amount).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
                            </td>
                            <td>{isInclusive}</td>
                            <td>{isExcusive}</td>
                            <td>
                              {setting.position == "left" ? setting.symbol : ""}{parseFloat(discount ? discount : 0).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
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
                        <td>{currentCourse.bill_mobile ? currentCourse.bill_mobile : "-"}</td>
                      </tr>
                      <tr>
                        <th>Cust Name</th>
                        <td>{currentCourse.bill_name ? currentCourse.bill_name : "-"}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{currentCourse.bill_address ? currentCourse.bill_address : "-"}</td>
                      </tr>
                      <tr>
                        <th>GSTIN</th>
                        <td>{currentCourse.bill_gst ? currentCourse.bill_gst : "-"}</td>
                      </tr>
                      <tr>
                        <th>PAN</th>
                        <td>{currentCourse.bill_pan ? currentCourse.bill_pan : "-"}</td>
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
