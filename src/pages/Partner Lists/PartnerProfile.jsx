import React, { useCallback, useEffect, useState } from 'react'

import { LiaArrowLeftSolid } from "react-icons/lia";
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { useNavigate, useParams } from 'react-router-dom';
import Partnermultipleroutes from './Partnermultipleroutes';

import { formatDate } from '../../utils/utils'

import img from '../../assest/loading1.gif'


const PartnerProfile = ({ active }) => {
    const navigate = useNavigate()
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



    return (
        <>

            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate('/partnerlists')} />
                        <h6>Partner Profile</h6>
                    </div>
                    <div className='partnerprofile-btn'>
                        <button>Edit Services</button>
                    </div>
                </div>

                {loading ? (
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                ) : !partnerData?.data ? (
                    <div className='normalloading'>
                        <p>No data available.</p>
                    </div>
                ) : (
                    <div className='partnerprofile-main'>
                        <div className='userprofile-main' style={{marginBottom:"1rem"}}>
                            <div className='userprofile-profileimage'>
                                <img src={partnerData?.data?.data?.image} alt="" />
                            </div>
                            <div className='partnerprofile-main-date'>
                                <div className='partnerprofile-date'>
                                    <h6>Joined Date</h6>
                                    <p>{formatDate(partnerData?.data?.data?.createdAt)}</p>
                                </div>
                                <div className='partnerprofile-date'>
                                    <h6>DOB</h6>
                                    <p>{partnerData?.data?.data?.dob || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <div className='partnerprofile-content'>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Partner name</label>
                                <input
                                    type="text"
                                    value={
                                        partnerData?.data?.data?.fullName?.trim() ||
                                        `${partnerData?.data?.data?.firstName || ''} ${partnerData?.data?.data?.lastName || ''}`.trim() ||
                                        ''
                                    }
                                    readOnly
                                />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Employee ID</label>
                                <input type="text" value={partnerData?.data?.data?.userId} readOnly />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Email ID</label>
                                <input type="text" value={partnerData?.data?.data?.email || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Phone number</label>
                                <input type="text" value={partnerData?.data?.data?.phone || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Alternate Email ID</label>
                                <input type="text" value={partnerData?.data?.data?.alternateEmail || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Alternate Phone number</label>
                                <input type="text" value={partnerData?.data?.data?.alternatePhone || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Address</label>
                                <input type="text" value={partnerData?.data?.data?.address1 || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Membership</label>
                                <input type="text" value={partnerData?.data?.data?.subscriptionId?.name || "N/A"} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">City</label>
                                <input type="text" value={partnerData?.data?.data?.city?.name || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Category</label>
                                <input
                                    type="text"
                                    value={partnerData?.data?.data?.serviceCategoryId?.map(cat => cat.name).join(', ')}
                                    readOnly
                                />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Experience</label>
                                <input type="text" value={partnerData?.data?.data?.experience || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Age</label>
                                <input type="text" value={partnerData?.data?.data?.age || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Gender</label>
                                <input type="text" value={partnerData?.data?.data?.gender || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Service for</label>
                                <input type="text" value={partnerData?.data?.data?.serviceFor || 'N/A'} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Jobs Completed</label>
                                <input type="text" value={partnerData?.data?.bookingStats?.completedBookings} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Jobs Cancelled</label>
                                <input type="text" value={partnerData?.data?.bookingStats?.canceledBookings} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Rating</label>
                                <input type="text" value={partnerData?.data?.data?.averageRating} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Skil lSession Result</label>
                                <input type="text" value={partnerData?.data?.data?.skillSessionResult} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">Refferal Code</label>
                                <input type="text" value={partnerData?.data?.data?.refferalCode} />
                            </div>
                            <div className='userprofile-content-inputes'>
                                <label htmlFor="">T-Shirt Size</label>
                                <input type="text" value={partnerData?.data?.data?.size} />
                            </div>
                        </div>
                    </div>
                )}
                <Partnermultipleroutes active={active} data={partnerData} loading={loading} />
            </div>

        </>
    )
}

export default PartnerProfile