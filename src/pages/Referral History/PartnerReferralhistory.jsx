import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'

import { MdMoreVert } from "react-icons/md";
import FilterDropdown from '../../components/Filter Dropdown/FilterDropdown';
import { Link } from 'react-router-dom';
import { DetailsReferral, DetailsReferralPending, DetailsReferralFailed } from '../../components/Modals/Modals';


const PartnerReferralhistory = () => {
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)


    const orders = [
        {
            id: "123456",
            name: "Wade Warren",
            refereeName: "Joe din",
            usertype: "Partner",
            referralcode: "zz08y3",
            date: "02/11/24",
            reward: "₹150",
            status: "Completed",
        },
        {
            id: "234567890",
            name: "Wade Warren",
            refereeName: "Joe din",
            usertype: "Partner",
            referralcode: "zz08y3",
            date: "02/11/24",
            reward: "₹150",
            status: "Pending",
        },
        {
            id: "345678901",
            name: "Wade Warren",
            refereeName: "Joe din",
            usertype: "Partner",
            referralcode: "zz08y3",
            date: "02/11/24",
            reward: "---",
            status: "Pending",
        },
        {
            id: "456789012",
            name: "Wade Warren",
            refereeName: "Joe din",
            usertype: "Partner",
            referralcode: "zz08y3",
            date: "02/11/24",
            reward: "---",
            status: "Failed",
        },
    ];
    const [userFilter, setUserFilter] = useState(null);

    return (
        <>
            <DetailsReferral
                show={show}
                handleClose={() => setShow(false)}
            />
            <DetailsReferralPending
                show={show1}
                handleClose={() => setShow1(false)}
            />
            <DetailsReferralFailed
                show={show2}
                handleClose={() => setShow2(false)}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Referral History</h6>
                    </div>
                    <div className='userlist3'>
                        <FilterDropdown
                            filters={["Completed", "Pending", "Failed"]}
                            selectedFilter={userFilter}
                            onFilterSelect={setUserFilter}
                            resetLabel="Reset Filter"
                        />
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/referral-history/user'} className='link'>
                        <div className='servicetnasction'>
                            <h6>User</h6>
                        </div>
                    </Link>
                    <Link to={'/referral-history/partner'} className='link'>
                        <div className='servicetnasctionactive' >
                            <h6>Partner</h6>
                        </div>
                    </Link>

                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Referrer Name</th>
                                    <th>Referee Name</th>
                                    <th>User Type</th>
                                    <th>Referral Code</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Reward</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.name}</td>
                                        <td>{order.refereeName}</td>
                                        <td>{order.usertype}</td>
                                        <td>{order.referralcode}</td>
                                        <td>{order.date}</td>
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
                                        <td>{order.reward}</td>
                                        <td>
                                            <MdMoreVert
                                                color="#000000"
                                                size={20}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => order.status === 'Completed' ? setShow(true)
                                                    : order.status === 'Pending' ? setShow1(true)
                                                        : setShow2(true)
                                                }
                                            />
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

export default HOC(PartnerReferralhistory)