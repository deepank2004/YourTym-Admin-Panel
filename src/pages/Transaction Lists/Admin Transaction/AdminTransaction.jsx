import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../../components/HOC/HOC'

import endPoints from '../../../Repository/apiConfig';
import { getApi } from '../../../Repository/Api';
import { formatDate, formatTimeWithAmPm } from '../../../utils/utils';
import img from '../../../assest/loading1.gif'
import Pagination from '../../../components/Pagination/Pagination';


const AdminTransaction = () => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        limit: 10,
    });

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallpayoutTranscation(pagination.currentPage, pagination.limit), {
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
                        <h6>Admin Service Transactions</h6>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Admin Name</th>
                                    <th>Order ID</th>
                                    <th>Order Total</th>
                                    <th>Partner Earning</th>
                                    <th>Admin Earning</th>
                                    <th>Order Status</th>
                                    <th>Payment Status</th>
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
                                                <td>#{i?.orderId?.orderId || 'N/A'}</td>
                                                <td>₹{i?.orderId?.paidAmount}</td>
                                                <td>₹{i?.orderId?.partnerEarnings}</td>
                                                <td>₹{i?.orderId?.adminEarnings}</td>
                                                <td
                                                    style={{
                                                        color: i?.orderId?.serviceStatus === 'Complete' ? '#3FB031' : '#E1B913'
                                                    }}
                                                >
                                                    {i?.orderId?.serviceStatus}
                                                </td>
                                                <td
                                                    style={{
                                                        color: i?.orderId?.paymentStatus === 'Paid' ? '#3FB031' : '#E1B913'
                                                    }}
                                                >
                                                    {i?.orderId?.paymentStatus}
                                                </td>
                                            </tr>
                                        ))
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

export default HOC(AdminTransaction)