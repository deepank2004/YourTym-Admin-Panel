import React, { useCallback, useEffect, useRef, useState } from 'react'
import HOC from '../../../components/HOC/HOC'
import { toast } from 'react-toastify';
import { getApi, postApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';
import { createPayload } from '../../../utils/utils';

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";



import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddSubCategory = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [maincategoryId, setmainCategoryId] = useState(null);
    const [maincategoryname, setmainCategoryname] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryname, setCategoryname] = useState(null);
    const [description, setDescription] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);


    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);
    const [CategoryOptions, setCategoryOptions] = useState([]);


    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    const fetchMainCategories = async () => {
        await getApi(endPoints.getallMaincategory, {
            setResponse: setMainCategoryOptions,
            setLoading,
            errorMsg: "Failed to fetch main categories!",
        });
    };


    const fetchCategories = useCallback(async () => {
        await getApi(endPoints.getAllCategorybymaincategory(maincategoryId), {
            setResponse: setCategoryOptions,
            setLoading: setLoading1,
        });
    }, [maincategoryId]);


    useEffect(() => {
        if (maincategoryId) {
            fetchCategories();
        }
    }, [maincategoryId, fetchCategories]);

    useEffect(() => {
        fetchMainCategories();
    }, []);

    const resetForm = () => {
        setName("");
        setmainCategoryId(null);
        setmainCategoryname("");
        setDescription("");
        setImage(null);
        setImagePreview("");
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
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }



    const handleSubmit = async () => {
        if (!name || !maincategoryId || !categoryId || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const fields = {
            name,
            mainCategoryId: maincategoryId,
            categoryId,
            description,
            image,
            status,
        };

        const formData = createPayload(fields);

        await postApi(endPoints.addsubcategory, formData, {
            setLoading: setLoading2,
            successMsg: "SubCategory added successfully!",
            errorMsg: "Failed to add subcategory!",
        });
        navigate("/service-management/all-subcategory");
        resetForm();
    };


    const fullToolbarOptions = [
        [{ font: [] }], // Font styles
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
        ["bold", "italic", "underline", "strike"], // Basic formatting
        [{ color: [] }, { background: [] }], // Font and background colors
        [{ list: "ordered" }, { list: "bullet" }], // Lists
        [{ indent: "-1" }, { indent: "+1" }], // Indentation
        [{ align: [] }], // Text alignment
        ["clean"], // Remove formatting
    ];



    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Add Sub Category</h6>
                    </div>
                    <div className='addcategory-btn'>
                        <div className='partnerprofile-btn'>
                            <button onClick={() => navigate('/service-management/all-subcategory')}>Cancel</button>
                        </div>
                        <div className='addserivce-btn'>
                            <button onClick={handleSubmit} disabled={loading2}>{loading2 ? "Saving..." : "Save"}</button>
                        </div>
                    </div>
                </div>
                <div className='addservice-main'>
                    <div className='addservice-container'>
                        <div className='addservice-left'>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter subcatgory name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="serviceName"
                                />
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Main-Category</label>
                                <select
                                    value={maincategoryId || ""}
                                    onChange={(e) => {
                                        const selectedmainCategorytype = mainCategoryOptions?.data?.find(
                                            (category) => category._id === e.target.value
                                        );
                                        setmainCategoryId(e.target.value);
                                        setmainCategoryname(selectedmainCategorytype?.name || "");
                                    }}
                                >
                                    <option value="">Select main-Category-type</option>
                                    {loading ?
                                        <option value="">Loading...</option>
                                        :
                                        mainCategoryOptions?.data?.length === 0 ?
                                            <option value="">No data</option>
                                            :
                                            mainCategoryOptions?.data?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                </select>
                            </div>
                            <div className="addservice-left-div">
                                <label htmlFor="">Category</label>
                                <select
                                    value={categoryId || ""}
                                    onChange={(e) => {
                                        const selectedCategory = CategoryOptions?.data?.find(
                                            (category) => category._id === e.target.value
                                        );
                                        setCategoryId(e.target.value);
                                        setCategoryname(selectedCategory?.name || "");
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {loading1 ? (
                                        <option value="">Loading...</option>
                                    ) :
                                        !Array.isArray(CategoryOptions?.data) || CategoryOptions?.data?.length === 0 ? (
                                            <option value="">No data</option>
                                        ) : (
                                            CategoryOptions?.data?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))
                                        )}
                                </select>
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Description</label>
                                <div className="custom-quill-wrapper">
                                    <ReactQuill
                                        theme="snow"
                                        modules={{ toolbar: fullToolbarOptions }}
                                        value={description}
                                        onChange={setDescription}
                                        className="custom-quill-editor"
                                    />
                                </div>
                            </div>
                            <div className="addcategory-container">
                                <label htmlFor="">Status</label>
                                <select
                                    onChange={(e) => setStatus(e.target.value === "true")}
                                    value={status} // Convert boolean to string
                                >
                                    <option value="">Select</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
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

export default HOC(AddSubCategory)