import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../../components/HOC/HOC'
import { getApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';



const ViewService = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({})


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getservicebyid(id), {
            setResponse: (response) => {
                setData(response?.data || {});
            },
            // setLoading,
            errorMsg: 'Failed to fetch data!',
        });
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
                        <h6>View Service Details</h6>
                    </div>
                    <div className='addcategory-btn'>
                        <div className='partnerprofile-btn'>
                            <button onClick={() => navigate('/service-management/all-subcategory')}>Cancel</button>
                        </div>
                        {/* <div className='addserivce-btn'>
                            <button onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                        </div> */}
                    </div>
                </div>
                <div className='addservice-main'>
                    <div className='addsubcategory-left-div-div' style={{ marginTop: "1rem" }}>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Service Name</label>
                            <input
                                type="text"
                                id="serviceName"
                                value={data?.title}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Main Category Name</label>
                            <input
                                type="text"
                                id="serviceName"
                                value={data?.mainCategoryId?.name}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Category Name</label>
                            <input
                                type="text"
                                id="serviceName"
                                value={data?.categoryId?.name}
                            />
                        </div><div className='addservice-left-div'>
                            <label htmlFor="">Sub Category Name</label>
                            <input
                                type="text"
                                id="serviceName"
                                value={data?.subCategoryId?.name}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Total Minutes</label>
                            <input
                                type="text"
                                id="serviceName"
                                value={data?.timeInMin}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Rating</label>
                            <input
                                type="text"
                                id="serviceName"
                                value={data?.rating}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Sell Count</label>
                            <input
                                type="text"
                                value={data?.sellCount}
                                id="serviceName"
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Status</label>
                            <input
                                type="text"
                                value={data?.status ? "Active" : "InActive"}
                                id="serviceName"
                            />
                        </div>
                    </div>
                    <div className="addservice-left-div">
                        <label htmlFor="">Description</label>
                    </div>
                    <div className='description-content' style={{marginBottom:"1rem"}}>
                        {/* Render the HTML content */}
                        <div
                            dangerouslySetInnerHTML={{ __html: data.description }}
                            className="styled-description"
                        />
                    </div>
                    <div className="addservice-left-div"    >
                        <label htmlFor="">Location-wise Price Details</label>
                    </div>
                    <div className="addsubcategory-left-div-div" style={{ marginTop: "1rem" }}>
                        {data?.location?.map((item, index) => (
                            <div key={item._id} className="addservice-left-div" style={{ marginBottom: "1rem" }}>
                                {/* City Name */}
                                <div style={{ marginBottom: "0.5rem" }}>
                                    <label htmlFor={`cityName-${index}`}>City Name</label>
                                    <input
                                        type="text"
                                        id={`cityName-${index}`}
                                        value={item?.city?.name}
                                        readOnly
                                    />
                                </div>

                                {/* Sector Name */}
                                <div style={{ marginBottom: "0.5rem" }}>
                                    <label htmlFor={`sectorName-${index}`}>Sector Name</label>
                                    <input
                                        type="text"
                                        id={`sectorName-${index}`}
                                        value={item?.sector?.name}
                                        readOnly
                                    />
                                </div>

                                {/* Original Price */}
                                <div style={{ marginBottom: "0.5rem" }}>
                                    <label htmlFor={`originalPrice-${index}`}>Original Price</label>
                                    <input
                                        type="number"
                                        id={`originalPrice-${index}`}
                                        value={item?.originalPrice}
                                        readOnly
                                    />
                                </div>

                                {/* Discount */}
                                <div style={{ marginBottom: "0.5rem" }}>
                                    <label htmlFor={`discount-${index}`}>Discount (%)</label>
                                    <input
                                        type="number"
                                        id={`discount-${index}`}
                                        value={item?.discount}
                                        readOnly
                                    />
                                </div>

                                {/* Discounted Price */}
                                <div style={{ marginBottom: "0.5rem" }}>
                                    <label htmlFor={`discountPrice-${index}`}>Discounted Price</label>
                                    <input
                                        type="number"
                                        id={`discountPrice-${index}`}
                                        value={item?.discountPrice}
                                        readOnly
                                    />
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className='addsubcategory-left-div-div' style={{ marginTop: "1rem" }}>
                        {data?.images?.map((i, index) => (
                            <div className='addservice-left-div' key={index}>
                                <label htmlFor="">Image {index + 1}</label>
                                <div className="image-preview-service">
                                    <img src={i.img} alt="Preview" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(ViewService)