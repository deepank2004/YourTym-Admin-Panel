import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import Dropdown from 'react-bootstrap/Dropdown';


import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import img from '../../assest/loading1.gif'
import { formatDate, formatTimeWithAmPm } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';

const AdminWallet = () => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        limit: 10,
    });


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getAllWalletTransaction(pagination.currentPage, pagination.limit), {
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
    }, [Data]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);




    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Wallet</h6>
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/user/wallet'} className='link'>
                        <div className='servicetnasction'>
                            <h6>User Wallet</h6>
                        </div>
                    </Link>
                    <Link to={'/partner/wallet'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Partner Wallet</h6>
                        </div>
                    </Link>
                    <Link to={'/admin/wallet'} className='link'>
                        <div className='servicetnasctionactive' >
                            <h6>Admin Wallet</h6>
                        </div>
                    </Link>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Admin Name</th>
                                    <th>Admin ID</th>
                                    <th>Transaction Amount</th>
                                    <th>Wallet Balance</th>
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
                                    Data?.data?.filter((i) => i?.user?.userType === "ADMIN").length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className='tableloading'>
                                                <p>No data available for Admin.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        Data?.data
                                            ?.filter((i) => i?.user?.userType === "ADMIN")
                                            .map((i, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className='datetime'>
                                                            <h6>{formatDate(i.date)}</h6>
                                                            <p>{formatTimeWithAmPm(i.date)}</p>
                                                        </div>
                                                    </td>
                                                    <td>{i?.user?.fullName}</td>
                                                    <td>#{i.user?.userId}</td>
                                                    <td>₹{i?.amount}</td>
                                                    <td>₹{i?.user?.wallet}</td>
                                                </tr>
                                            ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalDocs={pagination.totalDocs}
                onPageChange={(newPage) =>
                    setPagination((prev) => ({ ...prev, currentPage: newPage }))
                }
            />
        </>
    )
}

export default HOC(AdminWallet)