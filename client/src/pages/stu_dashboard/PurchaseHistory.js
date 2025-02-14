import React, { useContext, useEffect, useState } from 'react'
import { ImTicket } from "react-icons/im";
import Sidebar from './layout/Sidebar'
import Navbar from '../client/layout/Navbar';
import axiosInstance from '../client/utils/axiosInstance';
import { userRolesContext } from "../admin/layout/RoleContext";
import moment from "moment-timezone";
import '../../assets/css/payment/payment.css'
import Loading from "../admin/layout/Loading";
import PurchaseHistoryBreadcrumb from './PurchaseHistoryBreadcrumb';
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
        const intAmount = parseFloat(course.course_amount)
        return courseSum + (intAmount || 0);
      }, 0);

      setSubTotal(sub_total);

      const total_discount = course.orderDetails.reduce((discountSum, item) => {
        const discount = item?.course_amount * (item?.discount / 100);
        const coupopnDiscont = parseFloat(item?.coupon_discount_amount || 0).toFixed(2);
        const totalDiscount = parseFloat(discount || 0) + parseFloat(coupopnDiscont);
        return discountSum + totalDiscount;
      }, 0);

      setTotalDiscount(total_discount);

      const inclusiveTax = course.orderDetails.reduce((taxSum, item) => {
        if (item.is_inclusive == 1) {
          const discount = item?.course_amount * (item?.discount / 100);
          const withDiscountPrice = item.course_amount - discount;
          const tax_amount = withDiscountPrice * (item?.course_tax / 100);
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
  useEffect(() => {
    document.title = "Comfort Security | Purchase History"; // Set the page title dynamically
  }, []);
  return (
    <>
      <Navbar />
      <PurchaseHistoryBreadcrumb />
      <div className='client_section'>
        {loading && <Loading />}
        <div className='main_stu_dashboard'>
          <Sidebar />
          <div className='content pl-4'>
            <h1 className='pb-2'>Purchase History</h1>
            <div className='purchase_history_content '>
              <table className='w-[942px]'>
                <thead className='bg-[#F7F7FA]'>
                  <tr>
                    <th style={{ width: '5%', paddingLeft: '10px' }}>ID</th>
                    <th style={{ width: '35%' }}>Course Name</th>
                    <th style={{ width: '12%' }}>Total Courses</th>
                    <th style={{ width: '8%' }}>Amount</th>
                    <th style={{ width: '10%' }}>Pay Mode</th>
                    <th style={{ width: '13%' }}>Transaction ID</th>
                    <th style={{ width: '12%' }}>Date</th>
                    <th style={{ width: '5%' }}>View</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    paymentData.length > 0 ? (
                      paymentData.map((item, index) => {
                        const time = moment.unix(item?.createdAt).tz(setting.timezone).format("DD-MM-YYYY");

                        return (
                          <tr key={index}>
                            <td className='py-3 pl-3'>{index + 1}</td>
                            <td>
                              {item?.orderDetails?.map((course, index) => {
                                const truncatedTitle =
                                  course.course_title.length > 40
                                    ? `${course.course_title.slice(0, 40)} ...`
                                    : course.course_title;

                                return (
                                  <span key={index}>
                                    {truncatedTitle}
                                    {index < item.orderDetails.length - 1 && ', '}
                                  </span>
                                );
                              })}
                            </td>
                            <td>{item?.orderDetails?.length}</td>
                            <td>
                              {setting.position === "left" ? setting.symbol : ""}
                              {item?.amount}
                              {setting.position === "right" ? setting.symbol : ""}
                            </td>
                            <td>{item?.payment_mode}</td>
                            <td>#12542554</td>
                            <td>{time}</td>
                            <td className='text-lg cursor-pointer' onClick={() => handleViewClick(item)}>
                              <ImTicket />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className='text-center'>No Purchase History Found</td>
                      </tr>
                    )
                  }

                </tbody>
              </table>
            </div>
          </div>
          {/* View Modal */}
          {viewOpen && currentCourse && (
            <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="modal-container bg-white rounded-lg shadow-lg max-w-4xl w-full sm:w-11/12 p-6">
                <form className="coupon-form">
                  <div className="pay_modulehead grid grid-cols-1 md:grid-cols-2 mb-6">
                    <div>
                      <h6 className="text-lg font-semibold">
                        {currentCourse?.studentName?.first_name} {currentCourse?.studentName?.last_name}
                      </h6>
                      <p className="text-sm text-gray-600 lowercase">
                        {currentCourse?.studentName?.email}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-800">Amount</h5>
                      <p className="text-sm text-gray-600">
                        {setting.position === "left" ? setting.symbol : ""}
                        {currentCourse?.amount}
                        {setting.position === "right" ? setting.symbol : ""}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-800">Transaction Id</h5>
                      <p className="text-sm text-gray-600">{currentCourse?.transiction_id}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-800">Payment Mode</h5>
                      <p className="text-sm text-gray-600">{currentCourse?.payment_mode}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-800">Purchase Date</h5>
                      <p className="text-sm text-gray-600">{currentCourse?.createdAt}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-800">Bill No:(ID)</h5>
                      <p className="text-sm text-gray-600">{currentCourse?.id}</p>
                    </div>
                  </div>
                  <div className='payment_view-table_main_div'>
                    <table className="payment_view_table block w-[848px] text-left text-sm mb-6 border border-gray-300">
                      <thead className="payment_view_table_model_header ">
                        <tr>
                          <th style={{ width: '45%' }} className="py-2">Course Name</th>
                          <th style={{ width: '10%' }} className="py-2">Validity</th>
                          <th style={{ width: '9%' }} className="py-2">Amount</th>
                          <th style={{ width: '8%' }} className="py-2">Discount</th>
                          <th style={{ width: '8%' }} className="py-2">Tax</th>
                          <th style={{ width: '10%' }} className="py-2">Tax Amt</th>
                          <th style={{ width: '10%' }} className="py-2">Net Amt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCourse?.orderDetails?.map((item, index) => {
                          const discount = item?.course_amount * (item?.discount / 100);
                          const coupopnDiscont = parseFloat(item?.coupon_discount_amount || 0).toFixed(2);
                          const totalDiscount = parseFloat(discount || 0) + parseFloat(coupopnDiscont);
                          const withDiscountPrice = item.course_amount - discount;
                          const tax_amount = withDiscountPrice * (item?.course_tax / 100);
                          const net_amount = (item?.course_amount - totalDiscount) + tax_amount;

                          return (
                            <tr key={index} className="border border-gray-200">
                              <td className="px-4 py-2">{item?.course_title}</td>
                              <td className="px-4 py-2">
                                {item?.expiring_time === "limited_time" ? "Limited Time" : "Life Time"}
                              </td>
                              <td className="px-4 py-2">
                                {setting.position === "left" ? setting.symbol : ""}
                                {item?.course_amount}
                                {setting.position === "right" ? setting.symbol : ""}
                              </td>
                              <td className="px-4 py-2">
                                {setting.position === "left" ? setting.symbol : ""}
                                {totalDiscount}
                                {setting.position === "right" ? setting.symbol : ""}
                              </td>
                              <td className="px-4 py-2">{parseFloat(item?.course_tax) || 0}%</td>
                              <td className="px-4 py-2">
                                {setting.position === "left" ? setting.symbol : ""}
                                {parseFloat(tax_amount).toFixed(2)}
                                {setting.position === "right" ? setting.symbol : ""}
                              </td>
                              <td className="px-4 py-2">
                                {setting.position === "left" ? setting.symbol : ""}
                                {parseFloat(net_amount).toFixed(2)}
                                {setting.position === "right" ? setting.symbol : ""}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="payment_2table grid grid-cols-1 md:grid-cols-2 gap-6">
                    <table className="customer-info-table w-full text-sm border border-gray-300">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-gray-800">Mobile</th>
                          <td className="px-4 py-2 text-gray-600">{currentCourse?.bill_mobile}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-gray-800">Cust Name</th>
                          <td className="px-4 py-2 text-gray-600">{currentCourse?.bill_name}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-gray-800">Address</th>
                          <td className="px-4 py-2 text-gray-600">{currentCourse?.bill_address}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-gray-800">GSTIN</th>
                          <td className="px-4 py-2 text-gray-600">{currentCourse?.bill_gst}</td>
                        </tr>
                        <tr>
                          <th className="px-4 py-2 text-gray-800">PAN</th>
                          <td className="px-4 py-2 text-gray-600">{currentCourse?.bill_pan}</td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="amount-detail-table w-full text-sm border border-gray-300">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-gray-800">Sub Total</th>
                          <th className="px-4 py-2 text-gray-600">
                            {setting.position === "left" ? setting.symbol : ""}
                            {parseFloat(subTotal).toFixed(2)}
                            {setting.position === "right" ? setting.symbol : ""}
                          </th>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 text-gray-800">Discount</td>
                          <td className="px-4 py-2 text-gray-600">
                            {setting.position === "left" ? setting.symbol : ""}
                            {parseFloat(totalDiscount).toFixed(2)}
                            {setting.position === "right" ? setting.symbol : ""}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-gray-800">Total Amount</th>
                          <th className="px-4 py-2 text-gray-600">
                            {setting.position === "left" ? setting.symbol : ""}
                            {parseFloat(subTotal - totalDiscount).toFixed(2)}
                            {setting.position === "right" ? setting.symbol : ""}
                          </th>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 text-gray-800">Tax (Inc.)</td>
                          <td className="px-4 py-2 text-gray-600">
                            {setting.position === "left" ? setting.symbol : ""}
                            {parseFloat(inclusiveTax).toFixed(2)}
                            {setting.position === "right" ? setting.symbol : ""}
                          </td>
                        </tr>
                        <tr className="net-amount-row">
                          <th className="px-4 py-2 text-gray-800">Net Amount</th>
                          <th className="px-4 py-2 text-gray-600">
                            {setting.position === "left" ? setting.symbol : ""}
                            {parseFloat(subTotal - totalDiscount + inclusiveTax).toFixed(2)}
                            {setting.position === "right" ? setting.symbol : ""}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCloseEditModal}
                      className="primary-btn module-btn px-6 py-2 mt-5"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>

          )}
        </div>
      </div>
    </>
  )
}

export default PurchaseHistory
