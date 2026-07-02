import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';


const Changepassword = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Change password</h6>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        <div className='changepassoword-main'>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Current Password</label>
                                <input type="text" />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">New Password</label>
                                <input type="text" />
                            </div>
                        </div>

                        <div className='contactsupport-btn'>
                            <div className='partnerprofile-btn'>
                                <button onClick={() => navigate('/settings')}>Cancel</button>
                            </div>
                            <div className='addserivce-btn'>
                                <button onClick={() => navigate('/settings')}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Changepassword)