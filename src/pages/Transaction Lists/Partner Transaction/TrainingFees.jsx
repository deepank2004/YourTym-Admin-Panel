import React, { useState } from 'react'
import HOC from '../../../components/HOC/HOC'
import { IoSearch } from "react-icons/io5";

import { MdMoreVert } from "react-icons/md";
import FilterDropdown from '../../../components/Filter Dropdown/FilterDropdown';
import { Link } from 'react-router-dom';


const TrainingFees = () => {
    const orders = [
        {
            id: "123456",
            name: "Megha Singh",
            plan: "6 months",
            date: "14/02/24",
            method: "Master card...x123",
            price: "₹2000",
            status: "Completed",
        },
        {
            id: "234567890",
            name: "Megha Singh",
            plan: "6 months",
            date: "14/02/24",
            method: "Master card...x123",
            price: "₹2000",
            status: "Pending",
        },
        {
            id: "345678901",
            name: "Umang Tyagi",
            plan: "6 months",
            date: "14/02/24",
            method: "Google pay",
            price: "₹2000",
            status: "Cancelled",
        },
        {
            id: "456789012",
            name: "Umang Tyagi",
            plan: "6 months",
            date: "14/02/24",
            method: "Google pay",
            price: "₹2000",
            status: "Completed",
        },
    ];
    const [userFilter, setUserFilter] = useState(null);

    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Transaction Lists</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='userlist4'>
                            <IoSearch />
                            <input type="search" placeholder='Search by name or ID' />
                        </div>
                        <FilterDropdown
                            filters={["Completed", "Cancelled", 'Pending']}
                            selectedFilter={userFilter}
                            onFilterSelect={setUserFilter}
                            resetLabel="Reset Filter"
                        />
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/transaction-lists/partner-transaction/subscription-transaction'} className='link'>
                        <div className='servicetnasction'>
                            <h6>Subscription Transaction</h6>
                        </div>
                    </Link>
                    <Link to={'/transaction-lists/partner-transaction/training-fees'} className='link'>
                        <div className='servicetnasctionactive'>
                            <h6>Training Fees</h6>
                        </div>
                    </Link>
                    <Link to={'/transaction-lists/partner-transaction/credit-balance'} className='link'>
                        <div className='servicetnasction'>
                            <h6>Credit Balance</h6>
                        </div>
                    </Link>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Payment Method</th>
                                    <th>Fees</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>#{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.date}</td>
                                        <td>{order.method}</td>
                                        <td>{order.price}</td>
                                        <td
                                            style={{
                                                color: order.status === 'Completed' ? '#3FB031'
                                                    : order.status === 'Pending'
                                                        ? '#E1B913'
                                                        : order.status === 'Cancelled'
                                                            ? '#B60B0B'
                                                            : '#0023D3',
                                            }}
                                        >
                                            {order.status}
                                        </td>
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

export default HOC(TrainingFees)