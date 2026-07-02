import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';

import img from '../../assest/loading1.gif'

const ViewBanner = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [bannerData, setBannerData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getbannerbyid(id), {
            setResponse: setBannerData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch Banner data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>View Banner</h6>
                    </div>
                </div>

                {loading ?
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                    :
                    bannerData?.data?.length === 0 ?
                        <div className='normalloading'>
                            <p>No data available.</p>
                        </div>
                        :
                        <>
                            <div className='addservice-container'>
                                <div className='addservice-right'>
                                    <div className='addservice-right-div'>
                                        <label htmlFor="">View Banner</label>
                                        <div className='addservice-right-image'>
                                            <div className="image-preview-container">
                                                <img src={bannerData?.data?.image} alt="Preview" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='addservice-left'>
                                    <div className='addservice-left-div'>
                                        <label htmlFor="">Banner Title</label>
                                        <input type="text"
                                            value={bannerData?.data?.title || "N/A"}
                                        />
                                    </div>
                                    <div className='addsubcategory-left-div'>
                                        <div className='addservice-left-div'>
                                            <label htmlFor="">Banner Type</label>
                                            <input type="text"
                                                value={bannerData?.data?.type || "N/A"}
                                            />
                                        </div>
                                        <div className='addservice-left-div'>
                                            <label htmlFor="">Banner Position</label>
                                            <input type="text"
                                                value={bannerData?.data?.position || "N/A"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='addbanner-container'>
                                <div className='addsubcategory-left-div'>
                                    <div className='addservice-left-div'>
                                        <label htmlFor="">Banner Status</label>
                                        <input type="text"
                                            value={bannerData?.data?.status ? "Active" : "Deactive" || "N/A"}
                                        />
                                    </div>
                                    <div className='addservice-left-div'>
                                        <label htmlFor="">Banner Description</label>
                                        <textarea 
                                            value={bannerData?.data?.desc || "N/A"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default HOC(ViewBanner)