import React, { useRef, useState } from 'react';
import HOC from '../../components/HOC/HOC';
import { toast } from 'react-toastify';
import img from '../../assest/user.webp';
import { useNavigate } from 'react-router-dom';
import { putApi } from '../../Repository/Api';  // Import postApi for the new API
import endPoints from '../../Repository/apiConfig';
import { useAdmin } from './AdminContext';
import img1 from '../../assest/loading1.gif';

const AdminProfile = () => {
    const { adminProfile, loading, refreshAdminData } = useAdmin();
    const navigate = useNavigate();
    const [loading1, setLoading1] = useState(false);
    const [firstName, setFirstName] = useState(adminProfile?.data?.firstName || "");
    const [lastName, setLastName] = useState(adminProfile?.data?.lastName || "");
    const [email, setEmail] = useState(adminProfile?.data?.email || "");
    const [phone, setPhone] = useState(adminProfile?.data?.phone || "");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null); 
    const [imagePreview, setImagePreview] = useState(adminProfile?.data?.image || null);

    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const uploadProfilePicture = async () => {
        if (!image) return null;

        const formData = new FormData();
        formData.append('image', image);

        await putApi(endPoints.updateadminprofileimg(adminProfile?.data?._id), formData, {
            setLoading: setLoading1,
            // successMsg: 'Admin Profile updated successfully!',
            // errorMsg: 'Failed to update admin profile!',
        });
    };

    const handleUpdate = async () => {
        setLoading1(true);

        let newImageUrl = image ? await uploadProfilePicture() : imagePreview;

        const payload = {
            "fullName": `${firstName} ${lastName}`,
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "email": email,
            "image": newImageUrl // Update with new image URL if changed
        };

        if (password) {
            payload.password = password;
        }

        await putApi(endPoints.updateadminprofile, payload, {
            setLoading: setLoading1,
            successMsg: 'Admin Profile updated successfully!',
            errorMsg: 'Failed to update admin profile!',
        });

        refreshAdminData();
        setLoading1(false);
    };

      const userType = adminProfile?.data?.userType;

    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Admin Profile</h6>
                    </div>
                </div>
                <div className='settings-container'>
                    {loading ? (
                        <div className='normalloading'>
                            <img src={img1} alt="Loading..." />
                        </div>
                    ) : (
                        <div className='settings-main'>
                            <div className='setting-main-main'>
                                <div className='settings-image'>
                                    <div className='userprofile-profileimage'>
                                        <img src={imagePreview || img} alt="Profile" />
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            hidden
                                        />
                                    </div>

                                    <div className='setting-upload-img'>
                                        {imagePreview ? (
                                            <span onClick={handleClearImage}>{userType === 'ADMIN' && "Clear"}</span>
                                        ) : (
                                            <span onClick={handleUploadClick}>{userType === 'ADMIN' && "Upload photo"}</span>
                                        )}
                                    </div>
                                </div>

                                <div className='settings-content'>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">First Name</label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            disabled={userType === 'SUB-ADMIN'}  
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Last Name</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            disabled={userType === 'SUB-ADMIN'}  
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Email</label>
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={userType === 'SUB-ADMIN'}  
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Phone</label>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            disabled={userType === 'SUB-ADMIN'}  
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                        disabled={loading1}
                                        onClick={handleUpdate}>
                                        {loading1 ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HOC(AdminProfile);
