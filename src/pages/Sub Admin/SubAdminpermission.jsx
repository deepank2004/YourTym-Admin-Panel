import React, { useCallback, useEffect, useState } from 'react';
import HOC from '../../components/HOC/HOC';
import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, postApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

const SubAdminPermission = () => {
    const dummydata = [
        { name: "Dashboard" },
        { name: "Users Lists" },
        { name: "Partners Lists" },
        { name: "Bookings" },
        { name: "Transaction Lists" },
        { name: "Services Management" },
        { name: "Packages" },
        { name: "Slot" },
        { name: "Booked Sessions" },
        { name: "Payout Management" },
        { name: "Wallet" },
        { name: "Monthly Subscription" },
        { name: "Referral History" },
        { name: "Banners" },
        { name: "Offers & Coupons" },
        { name: "Push Notification" },
        { name: "Location" },
        { name: "Charges" },
        { name: "Training Videos" },
        { name: "Testimonials" },
        { name: "All Leaves" },
        { name: "Insurance Plans" },
        { name: "Consent Forms" },
        { name: "Traning Report" },
        { name: "Policy Setting" },
        { name: "Live Chat" },
        { name: "Help & Support" },
        { name: "Sub admin" }
    ];


    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [permissions, setPermissions] = useState([]); // Ensure it's an empty array initially
    const [loading, setLoading] = useState(false);

    // Fetch user data
    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setPermissions(data?.data?.data?.permission || []); // Ensure default value is an array
    }, [data]);

    // Toggle permission
    const handlePermissionChange = (name) => {
        setPermissions((prev = []) =>
            prev.includes(name) ? prev.filter((perm) => perm !== name) : [...prev, name]
        );
    };

    const handleSubmit = async () => {
        const fields = {
            userId: id,
            permission: permissions,
        };

        await postApi(endPoints.addsubadminpermission, fields, {
            setLoading,
            successMsg: "Sub admin permissions added successfully!",
            errorMsg: "Failed to add sub admin permissions!",
        });

        navigate("/subadmin");
    };

    return (
        <div className='userprofilecontainer'>
            <div className='partnerprofile-container'>
                <div className='userprofile-header'>
                    <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                    <h6>Add Permission for Sub Admin</h6>
                </div>
                <div className='addcategory-btn'>
                    <div className='partnerprofile-btn'>
                        <button onClick={() => navigate('/subadmin')}>Cancel</button>
                    </div>
                    <div className='addserivce-btn'>
                        <button disabled={loading} onClick={handleSubmit}>
                            {loading ? "Adding..." : "Add"}
                        </button>
                    </div>
                </div>
            </div>

            <div className='addnewadmin-container'>
                <h6>Permissions</h6>
                <div className='addnewadmin-main'>
                    {dummydata.map((item, index) => (
                        <div className='addnewadmin-div' key={index}>
                            <span>{item.name}</span>
                            <div className='userlist7'>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={permissions?.includes(item.name) || false} // Ensure no error
                                        onChange={() => handlePermissionChange(item.name)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HOC(SubAdminPermission);
