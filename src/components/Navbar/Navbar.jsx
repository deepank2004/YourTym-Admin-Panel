import React, { useState } from 'react'
import './Navbar.css'

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import { useAdmin } from '../../pages/Admin Profile/AdminContext';
import { IoMdLogOut } from "react-icons/io";


import img from '../../assest/user.webp'
import { LogoutConfirmation } from '../Modals/Modals';

const Navbar = ({ toggleSidebar, text }) => {
    const navigate = useNavigate()
    const { adminProfile, loading } = useAdmin();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    const handleLogout = () => {
        setLogoutLoading(true);
        setTimeout(() => {
            sessionStorage.removeItem('token');
            setLogoutLoading(false);
            setShowLogoutModal(false);
            navigate("/");
            toast.success("Logged out successfully!");
        }, 1000);
    };

    return (
        <>
            <LogoutConfirmation
                show={showLogoutModal}
                onHide={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                loading={logoutLoading}
            />
            <div className='navbarcontainer'>
                {/* <div className='navbarleft'>
                    <div className='navbarleftsearch'>
                        <IoSearch color='#000000' size={20} />
                        <input type="search" placeholder='Type for search' />
                    </div>
                    <div className='navbarleftsearchicon'>
                        <IoSearch color='#FEFEFE' size={20} />
                    </div>
                </div> */}
                <div className='navbarleft'>
                    <h2>Admin Panel</h2>
                    <span>Welcome, Admin!</span>
                </div>
                <div className='navbarright'>
                    {/* <div className='navbarsetting' onClick={()=>navigate('/settings')}>
                        <IoSettingsOutline color='#000000' size={25} />
                    </div> */}
                    <div className='navbarleftsearchicon' onClick={() => setShowLogoutModal(true)}>
                        <IoMdLogOut color='#FEFEFE' size={20} />
                        <p>Logout</p>
                    </div>
                    <div className='navbarlines'>

                    </div>
                    {loading ? (
                        <div className='normalloading'>
                            <p>Loading....</p>
                        </div>
                    ) : (
                        <div className='navbarprofile' onClick={() => navigate('/admin-profile')}>
                            <div className='navprofile'>
                                <img src={adminProfile?.data?.image || img} alt="" />
                            </div>
                            <div className='navbarprofilename'>
                                <h6>{adminProfile?.data?.fullName || "N/A"}</h6>
                                <span>{adminProfile?.data?.email || "N/A"}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar