import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Usermultipleroutes from './Usermultipleroutes';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';

import { LiaArrowLeftSolid } from "react-icons/lia";


import img from '../../assest/loading1.gif'


const UserProfile = ({ active }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setUserData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    return (
        <>

            <div className='userprofilecontainer'>
                <div className='userprofile-header'>
                    <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate('/userslists')} />
                    <h6>User Profile</h6>
                </div>
                {loading ? (
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                ) : !userData?.data ? (
                    <div className='normalloading'>
                        <p>No data available.</p>
                    </div>
                ) : (
                    <div className='userprofile-main'>
                        <div className='userprofile-profileimage'>
                            <img src={userData?.data?.data?.image} alt="" />
                        </div>
                        <div className="userprofile-content">
                            {[
                                { label: "User name", value: userData?.data?.data?.fullName },
                                { label: "User ID", value: userData?.data?.data?.userId },
                                { label: "Email ID", value: userData?.data?.data?.email },
                                { label: "Phone number", value: userData?.data?.data?.phone },
                                { label: "Gender", value: userData?.data?.data?.gender },
                            ].map((field, index) => (
                                <div className="userprofile-content-inputes" key={index}>
                                    <label>{field.label}</label>
                                    <input type="text" value={field.value} readOnly />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <Usermultipleroutes active={active} />
            </div>

        </>
    )
}

export default UserProfile