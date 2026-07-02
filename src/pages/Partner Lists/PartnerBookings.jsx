import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import PartnerProfile from './PartnerProfile';
import { useParams } from 'react-router-dom';
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import img from '../../assest/loading1.gif';
import { formatDate } from '../../utils/utils';


const PartnerBookings = () => {
    const { id } = useParams();
    const [userbookingData, setUserBookingData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getpartnerbookingbyid(id), {
            setResponse: setUserBookingData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    return (
        <>
            <PartnerProfile active={"Bookings"} />
            <div className='userspayments'>
                <div className='userbookings-container'>
                    {loading ? (
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                    ) :
                        !Array.isArray(userbookingData?.data) || userbookingData?.data?.length === 0 ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            userbookingData?.data?.map((i, index) => (
                                <div className='userbookings-main' key={index}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                <th>Service</th>
                                                <th>Category</th>
                                                <th>Date</th>
                                                <th>Duration</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i?.orderId}</td>
                                                <td>{i?.userId?.fullName}</td>
                                                <td>{i?.services?.[0]?.serviceId?.title}</td>
                                                <td>{i?.services?.[0]?.serviceId?.categoryId?.name}</td>
                                                <td>{formatDate(i?.Date)}</td>
                                                <td>{i?.services?.[0]?.serviceId?.totalTime}</td>
                                                <td>₹{i.totalAmount}</td>
                                                <td className={i.status === 'Complete' ? 'status-complete' : 'status-assigned'}>
                                                    {i.status}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        )}
                </div>
            </div>
        </>
    )
}

export default HOC(PartnerBookings)