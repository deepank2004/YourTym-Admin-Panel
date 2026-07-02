import React, { useCallback, useEffect, useRef, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { getApi, postApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { toast } from 'react-toastify';
import { createPayload } from '../../utils/utils';


const AddOffers = () => {
    const navigate = useNavigate()
    const [servicesId, setServicesId] = useState('');
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [startdate, setSatartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(0)


    const [serviceOptions, setServiceOptions] = useState([]);
    const [UserOptions, setUserOptions] = useState([]);


    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    const fetchServices = async () => {
        await getApi(endPoints.getAllservice, {
            setResponse: setServiceOptions,
            setLoading,
            // errorMsg: "Failed to fetch services!",
        });
    };


    const fetchUser = useCallback(async () => {
        await getApi(endPoints.getallUser(1, limit), {
            setResponse: (response) => {
                setLimit(response?.pagination?.totalDocs)
                setUserOptions(response)
            },
            setLoading,
            errorMsg: 'Failed to fetch user!'
        });
    }, [limit]);



    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

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

        const fields = {
            title: title,
            serviceId: servicesId,
            image: image,
            desc: description,
            userId: userId,
            amount: amount,
            expirationDate: endDate,
            activationDate: startdate,
        };

        const formData = createPayload(fields);

        await postApi(endPoints.addOffer, formData, {
            setLoading,
            successMsg: "Offer added successfully!",
            errorMsg: "Failed to add offer!",
        });
        navigate("/offers_coupons/offers");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Add Offers</h6>
                    </div>
                    <div className='addserivce-btn'>
                        <button
                            disabled={loading}
                            onClick={handleSubmit} >
                            {loading ? "Adding..." : "Add"}
                        </button>
                    </div>
                </div>

                <div className='addservice-container'>
                    <div className='addservice-right'>
                        <div className='addservice-right-div'>
                            <label htmlFor="">Upload Image</label>
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
                        <div className='addservice-left-div'>
                            <label htmlFor="">Offer Title </label>
                            <input type="text" placeholder='Enter Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Services</label>
                            <select
                                name="service"
                                value={servicesId}
                                onChange={(e) => setServicesId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {loading ?
                                    <option value="">Loading...</option>
                                    :
                                    serviceOptions?.data?.length === 0 ?
                                        <option value="">No data</option>
                                        :
                                        serviceOptions?.data?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.title}
                                            </option>
                                        ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='addbanner-container'>
                    <div className='addsubcategory-left-div'>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Select User</label>
                            <select
                                name="user"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {loading ?
                                    <option value="">Loading...</option>
                                    :
                                    UserOptions?.data?.length === 0 ?
                                        <option value="">No data</option>
                                        :
                                        UserOptions?.data?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.user?.fullName}
                                            </option>
                                        ))}
                            </select>
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Amount</label>
                            <input type="number" placeholder='Enter amount'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Start Date </label>
                            <input type="date"
                                value={startdate}
                                onChange={(e) => setSatartDate(e.target.value)}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">End Date </label>
                            <input type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='addservice-left-div'>
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" placeholder='Write a description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >

                        </textarea>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddOffers)