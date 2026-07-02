import React, { useRef, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { toast } from 'react-toastify';


import { LiaArrowLeftSolid } from "react-icons/lia";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { AiFillPlusSquare } from "react-icons/ai";
import { LuPlus } from "react-icons/lu";
import endPoints from '../../Repository/apiConfig';
import { postApi } from '../../Repository/Api';


const AddCategory = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState('');
    const [maincategoryId, setMainCategoryId] = useState(id);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState('');

    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];


    const handleSubmit = async () => {
        if (!name || !image) {
            toast.error('Please provide all the required fields!');
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('mainCategoryId', maincategoryId);


        await postApi(endPoints.addCategory, formData, {
            setLoading,
            successMsg: 'Category added successfully!',
            errorMsg: 'Failed to add category!',
        });
        navigate(-1);
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
    const handleUploadClick = () => fileInputRef.current?.click();

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Add Category</h6>
                    </div>
                    <div className='addcategory-btn'>
                        <div className='partnerprofile-btn'>
                            <button onClick={() => navigate('/service-management')}>Cancel</button>
                        </div>
                        <div className='addserivce-btn'>
                            <button onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                        </div>
                    </div>

                </div>
                <div className='addservice-main'>
                    <div className='addservice-container'>
                        <div className='addservice-left'>
                            <div className='addcategory-left-div'>
                                <div className='addcategory-left-icons'>
                                    <label htmlFor="">Category</label>
                                    {/* <div className='addcategory-left-icon'>
                                        <p>Add</p>
                                        <AiFillPlusSquare color='#000000' size={25} />
                                    </div> */}
                                </div>
                                <div className='addcategory-left-inputs'>
                                    <input
                                        type="text"
                                        placeholder='Enter category'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        id="serviceName"
                                    />
                                    {/* <Link to={'/service-management/add-service/add-category/add-subcategory'} className='link'>
                                        <div className='addcategory-left-sub'>
                                            <LuPlus color='#FF5534' size={20} />
                                            <span>Add Sub Category</span>
                                        </div>
                                    </Link> */}
                                </div>
                            </div>
                            {/* <div className='addservice-left-div'>
                                <label htmlFor="">Description</label>
                                <textarea placeholder='Write a description' />
                                <p>Do not exceed 100 characters when entering the product name.</p>
                            </div> */}
                        </div>
                        <div className='addservice-right'>
                            <div className='addservice-right-div'>
                                <label htmlFor="">Add image</label>
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

export default HOC(AddCategory)