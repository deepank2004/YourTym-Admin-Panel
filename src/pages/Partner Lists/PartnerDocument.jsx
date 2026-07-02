import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import PartnerProfile from './PartnerProfile';

import img2 from '../../assest/loading1.gif'

import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { useParams } from 'react-router-dom';

const PartnerDocument = () => {
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
            <PartnerProfile active={"Documents"} />
            <div className='userspayments'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Document List</h6>
                    </div>
                    {/* <div className='userlist5'>
                        <button>Update</button>
                    </div> */}
                </div>
                {loading ? (
                    <div className='normalloading'>
                        <img src={img2} alt="" />
                    </div>
                ) : !partnerData?.data ? (
                    <div className='normalloading'>
                        <p>No data available.</p>
                    </div>
                ) : (
                    <div className='patnerdocument-method-content'>
                        <div className='patnerdocument-method-div'>
                            <label htmlFor="">Pan card</label>
                            <div className='patnerdocument-method-document'>
                                <img src={partnerData?.data?.data?.panCard} alt={partnerData?.data?.data?.panCard ? "" : "No Image"} />
                            </div>
                        </div>
                        <div className='patnerdocument-method-div'>
                            <label htmlFor="">Addhar card Front</label>
                            <div className='patnerdocument-method-document'>
                                <img src={partnerData?.data?.data?.aadharCardFront} alt={partnerData?.data?.data?.aadharCardFront ? "" : "No Image"} />
                            </div>
                        </div>
                        <div className='patnerdocument-method-div'>
                            <label htmlFor="">Addhar card Back</label>
                            <div className='patnerdocument-method-document'>
                                <img src={partnerData?.data?.data?.aadharCardBack} alt={partnerData?.data?.data?.aadharCardBack ? "" : "No Image"} />
                            </div>
                        </div>
                        {/* <div className='patnerdocument-method-div'>
                            <label htmlFor="">Vaccination report</label>
                            <div className='patnerdocument-method-download'>
                                <div className='patnerdocument-download-div'>
                                    <div className='patnerdocument-download-vaccinated'>
                                        <h6>Dose 2: Vaccinated  <IoIosCheckmarkCircle /> </h6>
                                        <p>29-09-2021</p>
                                    </div>
                                    <div className='patnerdocument-download-vaccinated-span'>
                                        <span>Download</span>
                                    </div>
                                </div>
                            </div>
                            <div className='patnerdocument-method-download'>
                                <div className='patnerdocument-download-div'>
                                    <div className='patnerdocument-download-vaccinated'>
                                        <h6>Dose 1: Vaccinated  <IoIosCheckmarkCircle /> </h6>
                                        <p>29-09-2021</p>
                                    </div>
                                    <div className='patnerdocument-download-vaccinated-span'>
                                        <span>Download</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                )}
            </div>
        </>
    )
}

export default HOC(PartnerDocument)