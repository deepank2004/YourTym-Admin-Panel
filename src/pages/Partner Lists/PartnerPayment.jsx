import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import img from '../../assest/loading1.gif'


import PartnerProfile from './PartnerProfile';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { useParams } from 'react-router-dom';


const PartnerPayment = () => {
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
            <PartnerProfile active={"Payment"} />
            <div className='userspayments'>
                <div className='userlist2'>
                    <h6>Bank details</h6>
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
                    <div className='userspayments-method-content'>
                        <div className='userprofile-content-inputes'>
                            <label htmlFor="">Bank name</label>
                            <input type="text" value={partnerData?.data?.data?.bank} />
                        </div>
                        <div className='userprofile-content-inputes'>
                            <label htmlFor="">Account Number</label>
                            <input type="text" value={partnerData?.data?.data?.accountNumber}/>
                        </div>
                        <div className='userprofile-content-inputes'>
                            <label htmlFor="">IFSC Code</label>
                            <input type="text" value={partnerData?.data?.data?.ifscCode}/>
                        </div>
                        <div className='userprofile-content-inputes'>
                            <label htmlFor="">UPI ID</label>
                            <input type="text" value={partnerData?.data?.data?.upiID}/>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default HOC(PartnerPayment)