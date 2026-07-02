import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../../components/HOC/HOC'
import { Link } from 'react-router-dom';
import endPoints from '../../../Repository/apiConfig';
import { getApi } from '../../../Repository/Api';
import img from '../../../assest/loading1.gif'
import { formatDate } from '../../../utils/utils';
import Pagination from '../../../components/Pagination/Pagination';


const SubscriptionTransaction = () => {

    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        limit: 10,
    });


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getAllTransactionsubscription(pagination.currentPage, pagination.limit), {
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
                        <h6>Transaction Lists</h6>
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/transaction-lists/partner-transaction/subscription-transaction'} className='link'>
                        <div className='servicetnasctionactive'>
                            <h6>Subscription Transaction</h6>
                        </div>
                    </Link>
                    <Link to={'/transaction-lists/partner-transaction/service-transaction'} className='link'>
                        <div className='servicetnasction'>
                            <h6>Service Transaction</h6>
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
                                    <th>Plan Name</th>
                                    <th>Date</th>
                                    <th>Payment Method</th>
                                    <th>Price</th>
                                    <th>Status</th>
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
                                    Data.data.map((order, index) => (
                                        <tr key={index}>
                                            <td>#{order?.transctionId}</td>
                                            <td>{order?.user?.fullName}</td>
                                            <td>{order.subscriptionId}</td>
                                            <td>{formatDate(order.date)}</td>
                                            <td>{order.paymentMode}</td>
                                            <td>₹ {order.amount}</td>
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

export default HOC(SubscriptionTransaction)