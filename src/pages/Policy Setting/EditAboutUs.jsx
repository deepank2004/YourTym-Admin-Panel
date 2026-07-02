import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, putApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const EditAboutUs = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState('');

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getAboutusbyid(id), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch terms & conditions!",
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data?.data) {
            setTitle(data?.data?.title);
            setDescription(data?.data?.desc);
        }
    }, [data]);

    const handleUpdate = async () => {
        const payload = {
            title: title,
            desc: description
        }

        await putApi(endPoints.updateaboutus(id), payload, {
            setLoading,
            successMsg: 'About Us updated successfully!',
            errorMsg: 'Failed to update about Us!',
        });
        navigate("/about-us");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit About Us</h6>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Enter title'
                            />
                        </div>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Description</label>
                            <ReactQuill value={description} onChange={setDescription} />
                        </div>

                        <div className='addprivacy-btn'>
                            <div className='partnerprofile-btn'>
                                <button onClick={() => navigate('/terms-and-conditions')}>Cancel</button>
                            </div>
                            <div className='addserivce-btn'>
                                <button onClick={handleUpdate} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(EditAboutUs)