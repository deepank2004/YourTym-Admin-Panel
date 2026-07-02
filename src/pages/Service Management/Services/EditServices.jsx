import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../../components/HOC/HOC'
import { toast } from 'react-toastify';
import { getApi, putApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';

import img from '../../../assest/loading1.gif'


import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddServiceImage, AddServicePrice, ViewPackagePrice, ViewSevicePrice } from '../../../components/Modals/Modals';

const EditServices = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState('');
    const [maincategoryId, setmainCategoryId] = useState(null);
    const [maincategoryname, setmainCategoryname] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryname, setCategoryname] = useState(null);
    const [subcategoryId, setSubCategoryId] = useState(null);
    const [subcategoryname, setSubCategoryname] = useState(null);
    const [description, setDescription] = useState(null);
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState([]);
    const [status, setStatus] = useState(null);
    const [totaltime, setTotalTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);
    const [CategoryOptions, setCategoryOptions] = useState([]);
    const [SubCategoryOptions, setSubCategoryOptions] = useState([]);


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


    const fetchSubCategories = useCallback(async () => {
        await getApi(endPoints.getAllsubcategorybycategory(maincategoryId, categoryId), {
            setResponse: setSubCategoryOptions,
            setLoading: setLoading2,
        });
    }, [maincategoryId, categoryId])


    useEffect(() => {
        if (maincategoryId) {
            fetchCategories();
        }
    }, [maincategoryId, fetchCategories]);

    useEffect(() => {
        if (maincategoryId && categoryId) {
            fetchSubCategories();
        }
    }, [maincategoryId, categoryId, fetchSubCategories]);

    useEffect(() => {
        fetchMainCategories();
    }, []);



    const fetchData = useCallback(async () => {
        await getApi(endPoints.getservicebyid(id), {
            setResponse: (response) => {
                setName(response?.data?.title || '');
                setmainCategoryId(response?.data?.mainCategoryId?._id || '');
                setmainCategoryname(response?.data?.mainCategoryId?.name || '');
                setCategoryId(response?.data?.categoryId?._id || '');
                setCategoryname(response?.data?.categoryId?.name || '');
                setSubCategoryId(response?.data?.subCategoryId?._id || '');
                setSubCategoryname(response?.data?.subCategoryId?.name || '');
                setDescription(response?.data?.description || '');
                setTotalTime(response?.data?.timeInMin || '');
                setImages(response?.data?.images || []);
                setLocation(response?.data?.location || []);
                setStatus(response?.data?.status || '');
            },
            setLoading: setLoading3,
            errorMsg: 'Failed to fetch data!',
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);




    const resetForm = () => {
        setName("");
        setmainCategoryId(null);
        setmainCategoryname("");
        setDescription("");
    };




    const handleSubmit = async () => {

        const fields = {
            title: name,
            timeInMin: totaltime,
            mainCategoryId: maincategoryId,
            subCategoryId: subcategoryId,
            categoryId,
            description,
            status,
        };


        await putApi(endPoints.updateservice(id), fields, {
            setLoading: setLoading4,
            successMsg: "Service updated successfully!",
            errorMsg: "Failed to update service!",
        });
        navigate("/service-management/all-services");
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
    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal(true);
    };



    return (
        <>
            <AddServicePrice
                show={showModal}
                onHide={() => setShowModal(false)}
                onHide1={() => setShowModal2(false)}
                id={id}
                edit={isEditMode}
                data={selectedItem}
                fetchData={fetchData}
            />
            <ViewSevicePrice
                show={showModal2}
                onHide={() => setShowModal2(false)}
                location={location}
                openEditModal={openEditModal}
            />
            <AddServiceImage
                show={showModal1}
                onHide={() => setShowModal1(false)}
                fetchdata={fetchData}
                id={id}
            />
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit Service</h6>
                        <div className='addserivce-btn' style={{ gap: "0.5rem" }}>
                            <button onClick={() => setShowModal(true)} style={{ marginRight: "0.5rem" }}>Add Price</button>
                            <button onClick={() => setShowModal2(true)} style={{ marginRight: "0.5rem" }}>View Prices</button>
                            {/* <button onClick={() => setShowModal1(true)}>Add Images</button> */}
                        </div>
                    </div>
                    <div className='addcategory-btn'>
                        <div className='partnerprofile-btn'>
                            <button onClick={() => navigate('/service-management/all-subcategory')}>Cancel</button>
                        </div>
                        <div className='addserivce-btn'>
                            <button onClick={handleSubmit} disabled={loading4}>{loading4 ? "Saving..." : "Save"}</button>
                        </div>
                    </div>
                </div>
                <div className='addservice-main'>
                    {loading3 ?
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                        :
                        <div className='addservice-container'>
                            <div className='addservice-left'>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Service name"
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
                                        <option value="">Select main-Category</option>
                                        {loading ?
                                            <option value="">Loading...</option>
                                            :
                                            !Array.isArray(mainCategoryOptions?.data) || mainCategoryOptions?.data?.length === 0 ? (
                                                <option value="">No data</option>
                                            ) : (
                                                mainCategoryOptions?.data?.map((cat) => (
                                                    <option key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </option>
                                                )))}
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
                                        {loading1 ?
                                            <option value="">Loading...</option>
                                            :
                                            !Array.isArray(CategoryOptions?.data) || CategoryOptions?.data?.length === 0 ? (
                                                <option value="">No data</option>
                                            ) : (
                                                CategoryOptions?.data?.map((cat) => (
                                                    <option key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </option>
                                                )))}
                                    </select>
                                </div>
                                <div className="addservice-left-div">
                                    <label htmlFor="">Sub-Category</label>
                                    <select
                                        value={subcategoryId || ""}
                                        onChange={(e) => {
                                            const selectedSubCategory = SubCategoryOptions?.data?.find(
                                                (category) => category._id === e.target.value
                                            );
                                            setSubCategoryId(e.target.value);
                                            setSubCategoryname(selectedSubCategory?.name || "");
                                        }}
                                    >
                                        <option value="">Select Sub Category</option>
                                        {loading2 ?
                                            <option value="">Loading...</option>
                                            :
                                            !Array.isArray(SubCategoryOptions?.data) || SubCategoryOptions?.data?.length === 0 ? (
                                                <option value="">No data</option>
                                            ) : (
                                                SubCategoryOptions?.data?.map((cat) => (
                                                    <option key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </option>
                                                )))}
                                    </select>
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Total Minutes</label>
                                    <input
                                        type="number"
                                        placeholder="Enter Service total minutes"
                                        value={totaltime}
                                        onChange={(e) => setTotalTime(e.target.value)}
                                        id="serviceName"
                                    />
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
                                    <label htmlFor="">Upload Images</label>
                                    {images === 0 ? (
                                        <div className='nodata-message'>
                                            <p>No data available.</p>
                                        </div>
                                    ) : (
                                        images?.map((img, index) => (
                                            <div className='addservice-right-image' key={index}>
                                                <div className="image-preview-container">
                                                    <img src={img.img} alt="Preview" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className='addserivce-btn' style={{ marginTop: "0.5rem" }}>
                                    <button onClick={() => setShowModal1(true)}>Add Images</button>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default HOC(EditServices)