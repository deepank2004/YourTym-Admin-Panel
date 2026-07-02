import React from 'react'

import { LuUsers } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { LuCalendarDays, LuIndianRupee } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useAdmin } from '../Admin Profile/AdminContext';

const TopDashboard = ({ Data }) => {


  const { adminProfile } = useAdmin();
  const userType = adminProfile?.data?.userType;
  const permissions = adminProfile?.data?.permission || [];


    const dashboardData = [
        {
            label: "Total Users",
            value: Data?.users,
            icon: <LuUsers color="#000000" size={25} />,
            link: '/userslists',
            permission: "Users Lists"
        },
        {
            label: "Total Partners",
            value: Data?.partner,
            icon: <PiUsersThree color="#000000" size={25} />,
            link: '/partnerlists',
            permission: "Partners Lists"
        },
        {
            label: "Total SubAdmin",
            value: Data?.subAdmin,
            icon: <PiUsersThree color="#000000" size={25} />,
            link: '/subadmin',
            permission: "Sub admin"
        },
        {
            label: "Total Bookings",
            value: Data?.orders,
            icon: <LuCalendarDays color="#000000" size={25} />,
            link: '/allbookings',
            permission: "Bookings"
        },
        {
            label: "Total Revenue",
            value: Data?.totalRevenue,
            icon: <LuIndianRupee color="#000000" size={25} />,
            link: '/transaction-lists/admin-transaction', 
            permission: "Revenue"  
        },
    ];

    const filteredData = userType === "ADMIN"
        ? dashboardData
        : dashboardData.filter(item => item.permission && permissions?.includes(item.permission));

    return (
        <>
            <div className="topdashboardcontainer">
                {filteredData.map((item, index) => (
                    <Link to={item.link || '#'} key={index} className='link'>
                        <div className="topdashboard1">
                            <div className="topdashboard2">{item.icon}</div>
                            <div className="topdashboard3">
                                <p>{item.label}</p>
                                <h6>{item.value}</h6>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default TopDashboard;
