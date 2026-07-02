import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';

import { Link, useNavigate } from 'react-router-dom';


import img from '../../assest/loading1.gif'


const Offers = () => {
    const navigate = useNavigate()

    const [offerData, setOfferData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallOffer, {
            setResponse: setOfferData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Add 5 hours and 30 minutes to convert UTC to IST
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return formattedDate;
    };


    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Offers & Coupons</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='userlist5'>
                            <button onClick={() => navigate('/offers_coupons/offers/add-offer')}>Add offer</button>
                        </div>
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/offers_coupons/offers'} className='link'>
                        <div className='servicetnasctionactive'>
                            <h6>Offers</h6>
                        </div>
                    </Link>
                    <Link to={'/offers_coupons/coupons'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Coupons</h6>
                        </div>
                    </Link>

                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Offer Code</th>
                                    <th>Offer Title</th>
                                    <th>Discount Value</th>
                                    <th>User Name</th>
                                    <th>Services</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ?
                                    <tr>
                                        <td colSpan="8" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                    :
                                    offerData?.status === 404 ?
                                        <tr>
                                            <td colSpan="8" className='tableloading'>
                                                <p>{offerData?.message}</p>
                                            </td>
                                        </tr>
                                        :
                                        offerData?.service?.length === 0 ?
                                            <tr>
                                                <td colSpan="8" className='tableloading'>
                                                    <p>No data available.</p>
                                                </td>
                                            </tr>
                                            :
                                            offerData?.service?.map((order, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {order?.title}
                                                    </td>
                                                    <td>
                                                        {order?.couponCode}
                                                    </td>
                                                    <td>{order?.amount}</td>
                                                    <td>{order?.userId?.fullName || 'N/A'}</td>
                                                    <td>{order?.serviceId?.title || 'N/A'}</td>
                                                    <td>{formatDate(order.activationDate)}</td>
                                                    <td>{formatDate(order.expirationDate)}</td>
                                                    <td
                                                        style={{
                                                            color: order.status ? '#3FB031' :'#B60B0B'
                                                        }}
                                                    >
                                                        {order.status ? "Active" : "Inactive"}
                                                    </td>
                                                   
                                                </tr>
                                            ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(Offers)