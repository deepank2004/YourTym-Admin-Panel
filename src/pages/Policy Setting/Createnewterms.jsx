import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { postApi } from '../../Repository/Api';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Createnewterms = () => {
    const navigate = useNavigate()
    const [privacy, SetPrivacy] = useState('');
    const [loading, setLoading] = useState('');


    const handleUpdate = async () => {
        const payload = {
            "terms": privacy
        }

        await postApi(endPoints.addterms, payload, {
            setLoading,
            successMsg: 'Terms & Conditions added successfully!',
            errorMsg: 'Failed to add terms & conditions!',
        });
        navigate("/terms-and-conditions");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Create new terms</h6>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        {/* <div className='addprivacy-inputes'>
                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='Enter Title' />
                        </div> */}
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Description</label>
                            <ReactQuill value={privacy} onChange={SetPrivacy} />
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

export default HOC(Createnewterms)