import React, { useContext, useEffect, useState } from 'react'
import { ImTicket } from "react-icons/im";
import Sidebar from './layout/Sidebar'
import Navbar from '../client/layout/Navbar';
import axiosInstance from '../client/utils/axiosInstance';
import { userRolesContext } from "../admin/layout/RoleContext";
import moment from "moment-timezone";
import Loading from "../admin/layout/Loading";
const port = process.env.REACT_APP_URL;

const PurchaseHistory = () => {
    const [loading, setLoading] = useState(true);
    const { setting, stuUserId } = useContext(userRolesContext);
    //get payment data
    const [paymentData, setPaymentData] = useState([]);
    const getPaymentData = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`${port}/gettingPaymentDataForStudent/${stuUserId}`);
            setPaymentData(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const [subTotal, setSubTotal] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [inclusiveTax, setInclusiveTax] = useState(0);
    const [viewOpen, setViewOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const handleCloseEditModal = () => {
        setViewOpen(false);
        setCurrentCourse(null);
    };
    const handleViewClick = (course) => {
        const time = moment.unix(course.createdAt).tz(setting.timezone).format("DD-MM-YYYY");
        setCurrentCourse((prev) => ({
            ...prev,
            ...course,
            createdAt: time
        }));

        if (Array.isArray(course.orderDetails)) {
            const sub_total = course.orderDetails.reduce((courseSum, course) => {
                return courseSum + (course.course_amount || 0);
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

    useEffect(() => {
        getPaymentData();
    }, [stuUserId]);

    return (
        <>
            <Navbar />
            {loading && <Loading />}
            <div className='main_stu_dashboard'>
                <Sidebar />
                <div className='content pl-4'>
                    <h1 className='pb-2'>Purchase History</h1>
                    <div className='purchase_history_content overflow-x-auto'>
                        <table className='w-max xl:w-full'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Course Name</th>
                                    <th>Total Courses</th>
                                    <th>Amount</th>
                                    <th>Pay Mode</th>
                                    <th>Transaction ID</th>
                                    <th>Date</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paymentData.length > 0 ? (
                                        paymentData.map((item, index) => {
                                            const time = moment.unix(item?.createdAt).tz(setting.timezone).format("DD-MM-YYYY");
                                            return (
                                                <tr key={index}>
                                                    <td className='py-3'>{index + 1}</td>
                                                    <td>
                                                        {item?.orderDetails?.map((course, index) => (
                                                            <span key={index}>{course.course_title}{index < item.orderDetails.length - 1 && ', '}</span>
                                                        ))}
                                                    </td>
                                                    <td>{item?.orderDetails?.length}</td>
                                                    <td>{setting.position == "left" ? setting.symbol : ""}{item?.amount}{setting.position == "right" ? setting.symbol : ""}</td>
                                                    <td>{item?.payment_mode}</td>
                                                    <td>#12542554</td>
                                                    <td>{time}</td>
                                                    <td className='text-lg cursor-pointer' onClick={() => handleViewClick(item)}><ImTicket /></td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <p>No Purchase history Fount</p>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
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
                                        <h6>{currentCourse?.studentName?.first_name} {currentCourse?.studentName?.last_name}</h6>
                                        <p className="email lowercase">{currentCourse?.studentName?.email}</p>
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
                                            <th>Discount</th>
                                            <th>Net Amt</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            currentCourse?.orderDetails?.map((item) => {
                                                const discount = item?.course_amount * (item?.discount / 100);
                                                const withDiscountPrice = item.course_amount - discount;
                                                const tax_amount = withDiscountPrice * (item?.course_tax / 100);
                                                const net_amount = item?.course_amount - tax_amount - item?.discount;
                                                return (
                                                    <tr>
                                                        <td>{item?.course_title}</td>
                                                        <td>{item?.expiring_time == 'limited_time' ? 'Limited Time' : 'Life Time'}</td>
                                                        <td>{setting.position == "left" ? setting.symbol : ""}{item?.course_amount}{setting.position == "right" ? setting.symbol : ""}</td>
                                                        <td>{(parseFloat(item?.course_tax)) ? parseFloat(item?.course_tax) : 0}%</td>
                                                        <td>
                                                            {setting.position == "left" ? setting.symbol : ""}{parseFloat(tax_amount).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}
                                                        </td>
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
    )
}

export default PurchaseHistory
