import React, { useEffect, useRef, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { getApi, postApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { toast } from 'react-toastify';
import { createPayload } from '../../utils/utils';


const AddBannerCategory = () => {
    const navigate = useNavigate()
    const [categoryId, setCategoryId] = useState('');
    const [bannerStatus, setBannerStatus] = useState('');
    const [bannerdescription, setBannerDescription] = useState('');
    const [bannerposition, setBannerPosition] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    const [CategoryOptions, setCategoryOptions] = useState([]);

    const fetchCategories = async () => {
        await getApi(endPoints.getAllCategory, {
            setResponse: setCategoryOptions,
            setLoading,
            // errorMsg: "Failed to fetch categories!",
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);


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
            categoryId: categoryId,
            status: bannerStatus,
            image: image,
            desc: bannerdescription,
            position: bannerposition,
        };

        const formData = createPayload(fields);

        await postApi(endPoints.addcategoryBanner, formData, {
            setLoading,
            successMsg: "Category Banner added successfully!",
            errorMsg: "Failed to add category Banner!",
        });
        navigate("/category/banners");
    };


    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid
                            color='#000000'
                            size={25} onClick={() => navigate(-1)}
                        />
                        <h6>Add Category Banner</h6>
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
                            <label htmlFor="">Upload Banner</label>
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
                            <label htmlFor="">Select Category</label>
                            <select
                                name="Category"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {loading ?
                                    <option value="">Loading...</option>
                                    :
                                    CategoryOptions?.data?.length === 0 ?
                                        <option value="">No data</option>
                                        :
                                        CategoryOptions?.data?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                            </select>
                        </div>
                        <div className='addsubcategory-left-div'>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Banner Position</label>
                                <select onChange={(e) => setBannerPosition(e.target.value)}
                                    value={bannerposition}>
                                    <option value="">Select</option>
                                    <option value="TOP">Top</option>
                                    <option value="MID">Middle</option>
                                    <option value="BOTTOM">Bottom</option>
                                    <option value="MB">Middle Bottom</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='addbanner-container'>
                    <div className='addsubcategory-left-div'>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Select Banner Status</label>
                            <select onChange={(e) => setBannerStatus(e.target.value === "true")}
                                value={bannerStatus}>
                                <option value="">Select</option>
                                <option value="true">Active</option>
                                <option value="false">Deactive</option>
                            </select>
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Banner Description</label>
                            <textarea
                                placeholder='Enter the banner description'
                                value={bannerdescription}
                                onChange={(e) => setBannerDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddBannerCategory)