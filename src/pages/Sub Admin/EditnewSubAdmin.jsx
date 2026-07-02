import React, { useCallback, useEffect, useRef, useState } from 'react'

import { LiaArrowLeftSolid } from "react-icons/lia";

import { useNavigate, useParams } from 'react-router-dom';
import HOC from '../../components/HOC/HOC';
import endPoints from '../../Repository/apiConfig';
import { getApi, putApi } from '../../Repository/Api';

import img1 from '../../assest/loading1.gif'
import { toast } from 'react-toastify';

import img2 from '../../assest/user.webp'


const EditnewSubAdmin = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null);


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
    }

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
        if (data?.data) {
            setFirstName(data?.data?.data?.firstName);
            setLastName(data?.data?.data?.lastName);
            setEmail(data?.data?.data?.email);
            setPhone(data?.data?.data?.phone);
            setImagePreview(data?.data?.data?.image);
            setImage(data?.data?.data?.image);
        }
    }, [data]);



    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Add 5 hours and 30 minutes to convert UTC to IST
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return formattedDate;
    };


    const handleSubmit = async () => {
        setLoading(true);

        try {
            const fields = {
                fullName: `${firstName} ${lastName}`,
                firstName,
                lastName,
                phone,
                email,
                userType: "SUB-ADMIN",
            };

            if (password) {
                fields.password = password;
                fields.confirmPassword = confirmpassword;
            }

            if (image && image !== data?.data?.image) {
                const formData = new FormData();
                formData.append("image", image);

                await putApi(endPoints.updatesubadminimage(id), formData, {
                    setLoading,
                });
            }

            await putApi(endPoints.updatesubadmin(id), fields, {
                setLoading,
                successMsg: "Sub Admin updated successfully!",
                errorMsg: "Failed to update sub admin!",
            });

            navigate("/subadmin");
        } catch (error) {
            toast.error("An error occurred while updating.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <>

            <div className='userprofilecontainer'>
                {loading ?
                    <div className='normalloading'>
                        <img src={img1} alt="" />
                    </div>
                    :
                    <>
                        <div className='partnerprofile-container'>
                            <div className='userprofile-header'>
                                <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                                <h6>Edit Details</h6>
                            </div>
                            <div className='addcategory-btn'>
                                <div className='partnerprofile-btn'>
                                    <button onClick={() => navigate('/subadmin')}>Cancel</button>
                                </div>
                                <div className='addserivce-btn'>
                                    <button
                                        disabled={loading}
                                        onClick={handleSubmit} >
                                        {loading ? "Updating..." : "Update"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='userprofile-main'>
                            <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', gap: "1rem" }}>
                                <div className='userprofile-profileimage'>
                                    <img src={imagePreview || img2} alt="user image" />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        hidden
                                    />
                                </div>
                                {imagePreview
                                    ?
                                    <div className='addserivce-btn'>
                                        <button onClick={handleClearImage}>Clear</button>
                                    </div>
                                    :
                                    <div className='addserivce-btn'>
                                        <button onClick={handleUploadClick}>Upload</button>
                                    </div>
                                }
                            </div>

                            <div className='userprofile-content'>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">First Name</label>
                                    <input type="text" placeholder='Enter first name'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" placeholder='Enter last name'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className='userprofile-content-inputes'>
                                    <label htmlFor="">Email ID</label>
                                    <input type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='userprofile-content-inputes'>
                                    <label htmlFor="">Phone Number</label>
                                    <input type="number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className='userprofile-content-inputes'>
                                    <label htmlFor="">Password</label>
                                    <input type="text"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='userprofile-content-inputes'>
                                    <label htmlFor="">Confirm Password</label>
                                    <input type="text"
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className='userprofile-content-inputes'>
                                    <label htmlFor="">Registered Date</label>
                                    <input disabled type="text" value={formatDate(data?.data?.data?.createdAt)} />
                                </div>
                                <div className='userprofile-content-inputes'>
                                    <label htmlFor="">Sub Admin ID</label>
                                    <input type="text" disabled value={data?.data?.data?.userId} />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>

        </>
    )
}

export default HOC(EditnewSubAdmin)