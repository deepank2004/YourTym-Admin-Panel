import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'

import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { formatDate, formatTimeWithAmPm } from '../../utils/utils';
import img from '../../assest/loading1.gif'
import { PayoutModal } from '../../components/Modals/Modals';
import Pagination from '../../components/Pagination/Pagination';


const PayoutManagement = () => {
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


    // Modal Openers
    const openAddModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };



    return (
        <>
            <PayoutModal
                show={showModal}
                onHide={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Payout Management</h6>
                    </div>
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
                                    <th>Earning</th>
                                    <th>Payment Method</th>
                                    <th>Status</th>
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
                                        ?.filter((i) => i?.user?.userType === "PARTNER")
                                        .map((i, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className='datetime'>
                                                        <h6>{formatDate(i.date)}</h6>
                                                        <p>{formatTimeWithAmPm(i.date)}</p>
                                                    </div>
                                                </td>
                                                <td>#{i?.user?.userId}</td>
                                                <td>{i?.user?.fullName}</td>
                                                <td>#{i?.orderId?.orderId || 'N/A'}</td>
                                                <td>₹{i.amount}</td>
                                                <td>{i.paymentMode}</td>
                                                <td
                                                    style={{
                                                        color: i?.isPayoutAmountSend ? '#3FB031' : '#E1B913'
                                                    }}
                                                >
                                                    {i?.isPayoutAmountSend ? 'Paid' : "Pending"}
                                                </td>
                                                <td style={{ display: 'flex', alignItems: "center", justifyContent: 'center', gap: "5px" }}>
                                                    <div className='userlist5'>
                                                        <button onClick={() => openAddModal(i)} style={{ padding: "0.5rem" }}>Edit</button>
                                                    </div>
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

export default HOC(PayoutManagement)