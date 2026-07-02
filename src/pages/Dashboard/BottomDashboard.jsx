import React, { useCallback, useEffect, useState } from 'react'

import { IoIosArrowForward } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { formatDate } from '../../utils/utils';


const BottomDashboard = ({ data }) => {
    const navigate = useNavigate()



    return (
        <>
            <div className='bottomdashboard'>
                <div className='bottomdashboard1'>
                    <h6>Recent Bookings</h6>
                    <div className='bottomdashboard2' onClick={() => navigate('/allbookings')}>
                        <p>See all bookings</p>
                        <IoIosArrowForward />
                    </div>
                </div>
                <div className='bottomdashboard3'>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Name</th>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Duration</th>
                                <th>Assigned to</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!data?.data || data?.data.length === 0) ? (
                                <tr>
                                    <td colSpan="10" className='tableloading'>
                                        <p>No data available.</p>
                                    </td>
                                </tr>
                            ) :
                            data?.data?.map((order, index) => (
                                    <tr key={index}>
                                        <td>#{order?.orderId}</td>
                                        <td>
                                            {order?.userId?.fullName?.trim()
                                                || (order?.userId?.firstName && order?.userId?.lastName
                                                    ? `${order?.userId?.firstName} ${order?.userId?.lastName}`
                                                    : 'N/A')}
                                        </td>
                                        <td>{order.services?.[0]?.serviceId?.title}</td>
                                        <td>{order.services?.[0]?.serviceId?.categoryId?.name}</td>
                                        <td>{formatDate(order.Date)}</td>
                                        <td>{order.services?.[0]?.serviceId?.totalTime}</td>
                                        <td>
                                            {order.partnerId?.fullName?.trim()
                                                || (order.partnerId?.firstName && order.partnerId?.lastName
                                                    ? `${order.partnerId?.firstName} ${order.partnerId?.lastName}`
                                                    : 'N/A')}
                                        </td>
                                        <td>{order.totalAmount}RS</td>
                                        <td
                                            style={{
                                                color: order.orderStatus === 'Confirmed' ? '#3FB031'
                                                    : order.orderStatus === 'Unconfirmed'
                                                        ? '#E1B913'
                                                        : order.orderStatus === 'Cancel'
                                                            ? '#B60B0B'
                                                            : '#0023D3',
                                            }}
                                        >
                                            {order.orderStatus}
                                        </td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="none" className="table-icon" >
                                                    <MdMoreVert color='#000000' size={25} />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className='dropdownmenu-custimize'>
                                                    <Dropdown.Item className='userdrop1'>
                                                        <Link to={`/allbookings/booking-details/${order._id}`} className='link'>
                                                            <div className='userdrop'>
                                                                <MdOutlineRemoveRedEye color='#000000' size={20} />
                                                                <p>View Details</p>
                                                            </div>
                                                        </Link>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default BottomDashboard