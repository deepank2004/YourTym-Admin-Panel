import React, { useRef, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { createPayload } from '../../utils/utils';
import { postApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { toast } from 'react-toastify';


const AddnewSubAdmin = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async () => {
        if (!firstName || !lastName || !phone || !email || !password || !image) {
            toast.error("All fields are required!");
            return;
        }

        const fields = {
            fullName: `${firstName} ${lastName}`,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
            image: image,
            userType: "SUB-ADMIN",
        };

        const formData = createPayload(fields);

        await postApi(endPoints.addsubadmin, formData, {
            setLoading,
            successMsg: "Sub Admin added successfully!",
            errorMsg: "Failed to add sub admin!",
        });

        navigate("/subadmin");
    };




    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Add new</h6>
                    </div>
                    <div className='addcategory-btn'>
                        <div className='partnerprofile-btn'>
                            <button onClick={() => navigate('/subadmin')}>Cancel</button>
                        </div>
                        <div className='addserivce-btn'>
                            <button
                                disabled={loading}
                                onClick={handleSubmit} >
                                {loading ? "Adding..." : "Add"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className='addservice-container'>
                    <div className='addservice-right'>
                        <div className='addservice-right-div'>
                            <label htmlFor="">Upload Profile Image</label>
                            <div className='addservice-right-image'>
                                {imagePreview
                                    ?
                                    <>
                                        <div className="image-preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleClearImage}>Clear</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <FiUpload color='#979797' size={25} />
                                        <p>Upload CSV File or image</p>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleUploadClick}>Upload</button>
                                        </div>
                                    </>
                                }
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                    <div className='addservice-left'>
                        <div className='addsubcategory-left-div'>
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
                            <div className='addservice-left-div'>
                                <label htmlFor="">Email ID</label>
                                <input type="email" placeholder='Enter email ID'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Phone Number</label>
                                <input type="number" placeholder='Enter Number'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Password</label>
                                <input type="text" placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddnewSubAdmin)