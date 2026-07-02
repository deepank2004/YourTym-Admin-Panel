import React, { useCallback, useEffect, useRef, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { toast } from 'react-toastify';


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { getApi, putApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


const EditService = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState('');
    const [loading1, setLoading1] = useState('');
    const [charCount, setCharCount] = useState(0);


    const fileInputRef = useRef(null);

    const MAX_DESCRIPTION_LENGTH = 100;
    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getmaincategorybyid(id), {
            setResponse: (response) => {
                setName(response?.data?.name || '');
                setDescription(response?.data?.notice || '');
                setImagePreview(response?.data?.image || '');
                setImage(response?.data?.image || '');
            },
            setLoading: setLoading1,
            errorMsg: 'Failed to fetch data!',
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handleUpdate = async () => {
        if (!name || !image || !description) {
            toast.error('Please provide all the required fields!');
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('notice', description);

        await putApi(endPoints.updateMaincategory(id), formData, {
            setLoading,
            successMsg: 'Service updated successfully!',
            errorMsg: 'Failed to update service!',
        });
        navigate("/service-management/main-category");
    };

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
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_DESCRIPTION_LENGTH) {
            setDescription(value);
            setCharCount(value.length);
        }
    };
    const handleUploadClick = () => fileInputRef.current?.click();

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit Service</h6>
                    </div>
                    <div className='addcategory-btn'>
                        <div className='partnerprofile-btn'>
                            <button onClick={() => navigate('/service-management')}>Cancel</button>
                        </div>
                        <div className='addserivce-btn'>
                            <button onClick={handleUpdate} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                        </div>
                    </div>
                </div>
                <div className='addservice-main'>
                    {/* <div className='servicetnasctioncontainer'>
                        <Link to={'/service-management/add-service'} className='link'>
                            <div className='servicetnasctionactive'>
                                <h6>Service</h6>
                            </div>
                        </Link>
                        <Link to={'/service-management/add-service/add-category'} className='link'>
                            <div className='servicetnasction'>
                                <h6>Category</h6>
                            </div>
                        </Link>
                    </div> */}
                    <div className='addservice-container'>
                        <div className='addservice-left'>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Service Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter service name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="serviceName"
                                />
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Description</label>
                                <textarea
                                    placeholder="Write a description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    id="description"
                                />
                                <p>{`${charCount}/${MAX_DESCRIPTION_LENGTH} characters`}</p>
                            </div>
                        </div>
                        <div className='addservice-right'>
                            <div className='addservice-right-div'>
                                <label htmlFor="">Add File</label>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(EditService)