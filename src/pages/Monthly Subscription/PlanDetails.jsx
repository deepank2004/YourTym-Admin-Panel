import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';

import { MdMoreVert } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaArrowLeftSolid } from "react-icons/lia";


const PlanDetails = () => {
    const navigate = useNavigate()
    const orders = [
        {
            subscriptionid: "123445678",
            partnername: "Joe Will",
            email: "Abc@gmail.com",
            phoneno: "1234668879",
            startdate: "12/02/24",
            renewaldate: "12/02/24",
            paymentinfo: "Paid",
            status: "Active",
        },
        {
            subscriptionid: "123445678",
            partnername: "Joe Will",
            email: "Abc@gmail.com",
            phoneno: "1234668879",
            startdate: "12/02/24",
            renewaldate: "12/02/24",
            paymentinfo: "Paid",
            status: "Pending",
        },
        {
            subscriptionid: "123445678",
            partnername: "Joe Will",
            email: "Abc@gmail.com",
            phoneno: "1234668879",
            startdate: "12/02/24",
            renewaldate: "12/02/24",
            paymentinfo: "Paid",
            status: "Expired",
        },
        {
            subscriptionid: "123445678",
            partnername: "Joe Will",
            email: "Abc@gmail.com",
            phoneno: "1234668879",
            startdate: "12/02/24",
            renewaldate: "12/02/24",
            paymentinfo: "---",
            status: "Cancelled",
        },
    ];
    return (
        <>
            <div className='userlistcontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Basic Plan</h6>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subscription ID</th>
                                    <th>Partner name</th>
                                    <th>Email</th>
                                    <th>Phone no.</th>
                                    <th>Start Date</th>
                                    <th>Renewal date</th>
                                    <th>Payment info</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.subscriptionid}</td>
                                        <td>{order.partnername}</td>
                                        <td>{order.email}</td>
                                        <td>{order.phoneno}</td>
                                        <td>{order.startdate}</td>
                                        <td>{order.renewaldate}</td>
                                        <td
                                            style={{
                                                color: order.paymentinfo === 'Paid' ? '#3FB031'
                                                    : order.paymentinfo === 'Pending'
                                                        ? '#E1B913'
                                                        : order.paymentinfo === 'Cancelled'
                                                            ? '#B60B0B'
                                                            : '#000000',
                                            }}
                                        >
                                            {order.paymentinfo}
                                        </td>
                                        <td
                                            style={{
                                                color: order.status === 'Active' ? '#3FB031'
                                                    : order.status === 'Pending'
                                                        ? '#E1B913'
                                                        : order.status === 'Cancelled'
                                                            ? '#B60B0B'
                                                            : '#FF7109',
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

export default HOC(PlanDetails)