import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'

import img from '../../assest/loading1.gif'

import PartnerProfile from './PartnerProfile';


import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { useParams } from 'react-router-dom';

const PartnerPerformance = () => {
    const { id } = useParams()
    const [partnerData, setPartnerData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setPartnerData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch partner data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    const data = [
        {
            jobscompleted: "29 of 40",
            validity: "15/9/24 to 12/9/24",
            progress: "Fulfilled",
            status: 'Active',
        },
        {
            jobscompleted: "29 of 40",
            validity: "15/9/24 to 12/9/24",
            progress: "Fulfilled",
            status: 'Active',
        },
        {
            jobscompleted: "29 of 40",
            validity: "15/9/24 to 12/9/24",
            progress: "Fulfilled",
            status: 'Closed',
        },
        {
            jobscompleted: "29 of 40",
            validity: "15/9/24 to 12/9/24",
            progress: "Fulfilled",
            status: 'Completed',
        },
    ];

    return (
        <>
            <PartnerProfile active={"Performance"} />
            <div className='userspayments'>
                {loading ? (
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                ) : !partnerData?.data ? (
                    <div className='normalloading'>
                        <p>No data available.</p>
                    </div>
                ) : (
                    <>
                        <div className='userspayments-method-content'>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Jobs Delivered</label>
                                <input type="text" value={partnerData?.data?.completedBookings}/>
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Jobs Cancelled</label>
                                <input type="text" value={partnerData?.data?.canceledBookings}/>
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Rating</label>
                                <input type="text" value={partnerData?.data?.averageRating}/>
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Response Rate</label>
                                <input type="text" value={partnerData?.data?.averageRating}/>
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Leaves</label>
                                <input type="text" value={partnerData?.data?.averageRating}/>
                            </div>
                        </div>
                        <div className='userlist2' style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                            <h6>Job Packs</h6>
                        </div>
                        <div className='userbookings-container'>
                            {data.map((i, index) => (
                                <div className='userbookings-main' key={index}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Jobs Completed</th>
                                                <th>Validity</th>
                                                <th>Status</th>
                                                <th>Progress</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i.jobscompleted}</td>
                                                <td>{i.validity}</td>
                                                <td>
                                                    {i.status}
                                                </td>
                                                <td
                                                    style={{
                                                        color: i.progress === 'Fulfilled' ? '#3FB031'
                                                            : i.progress === 'Rescheduled'
                                                                ? '#E1B913'
                                                                : i.progress === 'Criteria Failed'
                                                                    ? '#B60B0B'
                                                                    : '#0023D3',
                                                    }}
                                                >
                                                    {i.progress}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default HOC(PartnerPerformance)