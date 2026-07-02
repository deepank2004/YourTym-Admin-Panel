import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { useNavigate } from 'react-router-dom'
import { putApi } from '../../Repository/Api'
import endPoints from '../../Repository/apiConfig'


const Settings = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [minimumcartamount, setMinimumCartAmount] = useState("");


    const handleUpdate = async () => {
        const payload = {
            "minimumCartAmount": minimumcartamount,
        }

        await putApi(endPoints.updateminimumcartamount, payload, {
            setLoading: setLoading,
            successMsg: 'Minumum Cart Amount updated successfully!',
            errorMsg: 'Failed to update minumum cart amount!',
        });
    };


    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Settings</h6>
                    </div>
                </div>
                <div className='settings-container'>
                    <div className='settings-main'>
                        <div className='setting-main-main'>
                            <div className='settings-content'>
                                <div className='userprofile-content-inputes'>
                                    <label htmlFor="">Minimum Cart Amount</label>
                                    <input type="text" style={{ border: "1px solid red" }}
                                        value={minimumcartamount}
                                        onChange={(e) => setMinimumCartAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='contactsupport-btn'>
                            <div className='partnerprofile-btn'>
                                <button onClick={() => navigate(-1)}>Cancel</button>
                            </div>
                            <div className='addserivce-btn'>
                                <button
                                    disabled={loading}
                                    onClick={handleUpdate}>
                                    {loading ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(Settings)