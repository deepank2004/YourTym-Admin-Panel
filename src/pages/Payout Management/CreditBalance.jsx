import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'

import FilterDropdown from '../../components/Filter Dropdown/FilterDropdown';
import { Link } from 'react-router-dom';


const PayoutManagement = () => {
    const orders = [
        {
            date: "24/12/24",
            time: "12:00pm",
            partnerID: "12345679",
            partnername: "Aarti Jaiswal",
            orderID: "12345678",
            earning: "₹1500",
            balance: "₹1500",
            deducted: "-₹250",
            refund: "---",
            lastrecharge: "12/02/24",
            penalties: "-₹50",
            status: "Pending",
        },
        {
            date: "24/12/24",
            time: "12:00pm",
            partnerID: "12345679",
            partnername: "Aarti Jaiswal",
            orderID: "12345678",
            earning: "₹1500",
            balance: "₹1500",
            deducted: "-₹250",
            refund: "---",
            lastrecharge: "12/02/24",
            penalties: "-₹50",
            status: "Completed",
        },
        {
            date: "24/12/24",
            time: "12:00pm",
            partnerID: "12345679",
            partnername: "Aarti Jaiswal",
            orderID: "12345678",
            earning: "₹1500",
            balance: "₹1500",
            deducted: "-₹250",
            refund: "---",
            lastrecharge: "12/02/24",
            penalties: "-₹50",
            status: "Pending",
        },
        {
            date: "24/12/24",
            time: "12:00pm",
            partnerID: "12345679",
            partnername: "Aarti Jaiswal",
            orderID: "12345678",
            earning: "₹1500",
            balance: "₹1500",
            deducted: "-₹250",
            refund: "---",
            lastrecharge: "12/02/24",
            penalties: "-₹50",
            status: "Failed",
        },
    ];
    const [userFilter, setUserFilter] = useState(null);

    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Payout Management</h6>
                    </div>
                    <div className='userlist3'>
                        <FilterDropdown
                            filters={["Success", "Failed", "Pending"]}
                            selectedFilter={userFilter}
                            onFilterSelect={setUserFilter}
                            resetLabel="Reset Filter"
                        />
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/payout-management/payoutlist'} className='link'>
                        <div className='servicetnasction'>
                            <h6>Payout List</h6>
                        </div>
                    </Link>
                    <Link to={'/payout-management/credit-balance'} className='link'>
                        <div className='servicetnasctionactive' >
                            <h6>Credit Balance</h6>
                        </div>
                    </Link>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Partner ID</th>
                                    <th>Partner Name</th>
                                    <th>Order ID</th>
                                    <th>Order Total</th>
                                    <th>Credit Balance</th>
                                    <th>Deducted</th>
                                    <th>Refund</th>
                                    <th>Penalities</th>
                                    <th>Earning</th>
                                    <th>Last Recharge</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className='datetime'>
                                                <h6>{order.date}</h6>
                                                <p>{order.time}</p>
                                            </div>
                                        </td>
                                        <td>{order.partnerID}</td>
                                        <td>{order.partnername}</td>
                                        <td>{order.orderID}</td>
                                        <td>{order.earning}</td>
                                        <td>{order.earning}</td>
                                        <td>{order.deducted}</td>
                                        <td>{order.refund}</td>
                                        <td>{order.penalties}</td>
                                        <td>{order.earning}</td>
                                        <td>{order.lastrecharge}</td>
                                        <td
                                            style={{
                                                color: order.status === 'Completed' ? '#3FB031'
                                                    : order.status === 'Pending'
                                                        ? '#E1B913'
                                                        : order.status === 'Failed'
                                                            ? '#B60B0B'
                                                            : '#0023D3',
                                            }}
                                        >
                                            {order.status}
                                        </td>
                                        <td>{order.refund}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(PayoutManagement)