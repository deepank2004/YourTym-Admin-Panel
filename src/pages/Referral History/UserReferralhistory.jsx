import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { Link } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import img from '../../assest/loading1.gif'
import { formatDate, formatTimeWithAmPm } from '../../utils/utils';
import Modal from "react-bootstrap/Modal";
import { IoEye } from 'react-icons/io5';


const UserReferralhistory = () => {
    const [selectedUser, setSelectedUser] = useState(null);


    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        limit: 10,
    });


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getAllReferralTransaction(pagination.currentPage, pagination.limit), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.currentPage, pagination.limit]);

    useEffect(() => {
        if (Data?.pagination) {
            setPagination((prev) => ({
                ...prev,
                totalPages: Data?.pagination?.totalPages,
                totalDocs: Data?.pagination?.totalItems,
            }));
        }
    }, [Data])

    useEffect(() => {
        fetchData();
    }, [fetchData]);




    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Referral History</h6>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Referrer Name</th>
                                    <th>Referee Name</th>
                                    <th>User Type</th>
                                    <th>Referral Code</th>
                                    <th>Status</th>
                                    <th>Reward</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="9" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                ) : !Array.isArray(Data?.data) || Data?.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className='tableloading'>
                                            <p>No data available.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    Data?.data
                                        ?.filter((i) => i?.user?.joinUser?.length > 0)
                                        .map((i, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className='datetime'>
                                                        <h6>{formatDate(i.date)}</h6>
                                                        <p>{formatTimeWithAmPm(i.date)}</p>
                                                    </div>
                                                </td>
                                                <td>{i?.user?.fullName}</td>
                                                <td>
                                                    {i?.user?.joinUser?.slice(0, 1).map((user) => (
                                                        <span key={user?._id}>
                                                            {user?.fullName}
                                                        </span>
                                                    ))}

                                                    {i?.user?.joinUser?.length > 0 && (
                                                        <li
                                                            style={{ color: "blue", cursor: "pointer" }}
                                                            onClick={() => setSelectedUser(i)}
                                                        >
                                                            View More
                                                        </li>
                                                    )}
                                                </td>
                                                <td>{i?.user?.userType}</td>
                                                <td>#{i?.user?.refferalCode}</td>
                                                <td
                                                    style={{
                                                        color: i?.Status === 'success' ? '#3FB031' : '#E1B913'
                                                    }}
                                                >
                                                    {i?.Status}
                                                </td>
                                                <td>₹{i?.amount || '---'}</td>
                                                <td className='div-icons'>
                                                    <Link to={`/userslists/user-profile/bookings/${i?.user?._id}`}>
                                                        <IoEye />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                            {selectedUser && (
                                <Modal show={!!selectedUser} size="lg" onHide={() => setSelectedUser(null)} centered>
                                    <Modal.Header closeButton className='adminprofileupdate'>
                                        <Modal.Title id="contained-modal-title-vcenter">All Users ({selectedUser?.user?.joinUser?.length})</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='viewuserlist'>
                                        <div className='bottomdashboard3'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>User ID</th>
                                                        <th>Name</th>
                                                        <th>Email ID</th>
                                                        <th>Phone No.</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedUser?.user?.joinUser?.length === 0 ?
                                                        <tr>
                                                            <td colSpan="10" className='tableloading'>
                                                                <p>No data available.</p>
                                                            </td>
                                                        </tr>
                                                        :
                                                        selectedUser?.user?.joinUser?.map((user, index) => (
                                                            <tr key={index}>
                                                                <td>#{user?.userId}</td>
                                                                <td>
                                                                    {user?.fullName?.trim()
                                                                        || (user?.firstName && user?.lastName
                                                                            ? `${user?.firstName} ${user?.lastName}`
                                                                            : 'N/A')}
                                                                </td>
                                                                <td>{user?.email || 'N/A'}</td>
                                                                <td>{user?.phone || 'N/A'}</td>
                                                                <td className='div-icons'>
                                                                    <Link to={`/userslists/user-profile/bookings/${user?._id}`}>
                                                                        <IoEye />
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            )}
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(UserReferralhistory)