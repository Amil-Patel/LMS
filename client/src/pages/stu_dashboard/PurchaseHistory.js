import React from 'react'
import { ImTicket } from "react-icons/im";
import Sidebar from './layout/Sidebar'
import Navbar from '../client/layout/Navbar'
import Breadcrumb from '../client/course/Breadcrumb'

const PurchaseHistory = () => {
    return (
        <>
            <Navbar />
            <Breadcrumb />
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
                                <tr>
                                    <td className='py-3'>1</td>
                                    <td>Security Service. and Training </td>
                                    <td>2</td>
                                    <td>250.00</td>
                                    <td>Stripe</td>
                                    <td>#12542554</td>
                                    <td>27-09-2024</td>
                                    <td className='text-lg'><ImTicket /></td>
                                </tr>
                                <tr>
                                    <td className='py-3'>1</td>
                                    <td>Security Service. and Training </td>
                                    <td>2</td>
                                    <td>250.00</td>
                                    <td>Stripe</td>
                                    <td>#12542554</td>
                                    <td>27-09-2024</td>
                                    <td className='text-lg'><ImTicket /></td>
                                </tr>
                                <tr>
                                    <td className='py-3'>1</td>
                                    <td>Security Service. and Training </td>
                                    <td>2</td>
                                    <td>250.00</td>
                                    <td>Stripe</td>
                                    <td>#12542554</td>
                                    <td>27-09-2024</td>
                                    <td className='text-lg'><ImTicket /></td>
                                </tr>
                                <tr>
                                    <td className='py-3'>1</td>
                                    <td>Security Service. and Training </td>
                                    <td>2</td>
                                    <td>250.00</td>
                                    <td>Stripe</td>
                                    <td>#12542554</td>
                                    <td>27-09-2024</td>
                                    <td className='text-lg'><ImTicket /></td>
                                </tr>
                                <tr>
                                    <td className='py-3'>1</td>
                                    <td>Security Service. and Training </td>
                                    <td>2</td>
                                    <td>250.00</td>
                                    <td>Stripe</td>
                                    <td>#12542554</td>
                                    <td>27-09-2024</td>
                                    <td className='text-lg'><ImTicket /></td>
                                </tr>
                                <tr>
                                    <td className='py-3'>1</td>
                                    <td>Security Service. and Training </td>
                                    <td>2</td>
                                    <td>250.00</td>
                                    <td>Stripe</td>
                                    <td>#12542554</td>
                                    <td>27-09-2024</td>
                                    <td className='text-lg'><ImTicket /></td>
                                </tr>
                                <tr>
                                    <td className='py-3'>1</td>
                                    <td>Security Service. and Training </td>
                                    <td>2</td>
                                    <td>250.00</td>
                                    <td>Stripe</td>
                                    <td>#12542554</td>
                                    <td>27-09-2024</td>
                                    <td className='text-lg'><ImTicket /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PurchaseHistory
