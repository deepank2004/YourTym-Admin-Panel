import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { toast } from 'react-toastify';
import { getApi, putApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';

import img from '../../assest/loading1.gif'


import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddPackageImage, AddPackagePrice, ViewPackagePrice } from '../../components/Modals/Modals';

const EditPackages = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState('');
    const [maincategoryId, setmainCategoryId] = useState(null);
    const [description, setDescription] = useState(null);
    const [totalmin, setTotalMin] = useState('');
    const [images, setImages] = useState([]);
    const [categoryId, setCategoryId] = useState(null);

    const [subcategoryId, setSubCategoryId] = useState(null);

    const [status, setStatus] = useState(null);



    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);
    const [loading5, setLoading5] = useState(false);


    const [services, setServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [selectedServiceNames, setSelectedServiceNames] = useState([]);
    const [message, setMessage] = useState('');


    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);
    const [CategoryOptions, setCategoryOptions] = useState([]);
    const [SubCategoryOptions, setSubCategoryOptions] = useState([]);
    const [servicesOption, setServicesOptions] = useState([]);
    const [location, setLocations] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getpackagebyid(id), {
            setResponse: (response) => {
                if (response?.data) {
                    setName(response?.data?.title || '');
                    setmainCategoryId(response?.data?.mainCategoryId?._id || '');
                    setDescription(response?.data?.description || '');
                    setStatus(response?.data?.status || '');
                    setTotalMin(response?.data?.timeInMin || '');

                    setServices(response?.data?.services || []);

                    const categoryData = response?.data?.services?.[0]?.category?.categoryId;
                    setCategoryId(categoryData?._id || '');

                    const subCategoryData = response?.data?.services?.[0]?.category?.subCategory?.[0]?.subCategoryId;
                    setSubCategoryId(subCategoryData?._id || '');


                    const selectedServices = response?.data?.services?.flatMap((service) =>
                        service.category.subCategory.flatMap((sub) =>
                            sub.services.map((s) => s._id)
                        )
                    ) || [];
                    setSelectedServiceIds(selectedServices);
                    setImages(response?.data?.images || []);
                    setLocations(response?.data?.location || []);
                }
            },
            setLoading: setLoading5,
            errorMsg: 'Failed to fetch data!',
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);



    const fetchMainCategories = async () => {
        await getApi(endPoints.getallMaincategory, {
            setResponse: setMainCategoryOptions,
            setLoading,
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

    const fetchServices = useCallback(async () => {
        await getApi(endPoints.getAllservicebysubcategoryid(maincategoryId, categoryId, subcategoryId), {
            setResponse: setServicesOptions,
            setLoading: setLoading3,
            // errorMsg: "Failed to fetch services!",
        });
    }, [maincategoryId, categoryId, subcategoryId])


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
        if (maincategoryId && categoryId && subcategoryId) {
            fetchServices();
        }
    }, [maincategoryId, categoryId, subcategoryId, fetchServices]);

    useEffect(() => {
        fetchMainCategories();
    }, []);




    const handleEditServices = () => {
        if (!categoryId || !subcategoryId || selectedServiceIds.length === 0) {
            toast.error("Please select a category, subcategory, and at least one service.");
            return;
        }

        // Find the selected category, subcategory, and services from their respective options
        const selectedCategory = CategoryOptions.data.find(cat => cat._id === categoryId);
        const selectedSubCategory = SubCategoryOptions.data.find(sub => sub._id === subcategoryId);
        const selectedServices = servicesOption.data.filter(service =>
            selectedServiceIds.includes(service._id)
        );

        if (!selectedCategory || !selectedSubCategory || selectedServices.length === 0) {
            toast.error("Invalid selection. Please check your choices.");
            return;
        }

        setServices(prevServices => {
            // Check if the category already exists in the services array
            const categoryIndex = prevServices.findIndex(s =>
                s.category.categoryId._id === selectedCategory._id
            );

            if (categoryIndex === -1) {
                // Category doesn't exist, add new category with subcategory and services
                return [
                    ...prevServices,
                    {
                        category: {
                            categoryId: selectedCategory,
                            subCategory: [{
                                subCategoryId: selectedSubCategory,
                                services: selectedServices
                            }]
                        }
                    }
                ];
            }

            // Category exists, check if subcategory exists within the category
            const updatedServices = [...prevServices];
            const category = updatedServices[categoryIndex];
            const subCategoryIndex = category.subCategory.findIndex(sc =>
                sc.subCategoryId._id === selectedSubCategory._id
            );

            if (subCategoryIndex === -1) {
                // Subcategory doesn't exist, add new subcategory with services
                category.subCategory.push({
                    subCategoryId: selectedSubCategory,
                    services: selectedServices
                });
            } else {
                // Subcategory exists, merge the services
                const existingServices = category.subCategory[subCategoryIndex].services;
                const mergedServices = [...existingServices, ...selectedServices];
                // Remove duplicate services by _id
                const uniqueServices = mergedServices.reduce((acc, current) => {
                    if (!acc.find(item => item._id === current._id)) {
                        acc.push(current);
                    }
                    return acc;
                }, []);
                category.subCategory[subCategoryIndex].services = uniqueServices;
            }

            return updatedServices;
        });

        // Provide feedback to the user
        const selectedNames = selectedServices.map(service => service.title);
        toast.success(`Services added: ${selectedNames.join(', ')}`);
        setMessage(`Services added: ${selectedNames.join(', ')}`);
        setSelectedServiceIds([]);
    };




    const handleSubmit = async () => {
        const payload = {
            title: name,
            timeInMin: totalmin,
            mainCategoryId: maincategoryId,
            description: description,
            status: status,
            type: "Package",
            packageType: "Customize",
            services: services
        };

        await putApi(endPoints.updatePackage(id), payload, {
            setLoading: setLoading4,
            successMsg: "Package updated successfully!",
            errorMsg: "Failed to update package!",
        });
        navigate("/allpackages");
    };







    const fullToolbarOptions = [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"], // Basic formatting
        [{ color: [] }, { background: [] }], // Font and background colors
        [{ list: "ordered" }, { list: "bullet" }], // Lists
        [{ indent: "-1" }, { indent: "+1" }], // Indentation
        [{ align: [] }], // Text alignment
        ["clean"], // Remove formatting
    ]



    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal(true);
    };



    return (
        <>
            <AddPackagePrice
                show={showModal}
                onHide={() => setShowModal(false)}
                onHide1={() => setShowModal2(false)}
                id={id}
                edit={isEditMode}
                data={selectedItem}
                fetchData={fetchData}
            />
            <ViewPackagePrice
                show={showModal2}
                onHide={() => setShowModal2(false)}
                location={location}
                openEditModal={openEditModal}
            />
            <AddPackageImage
                show={showModal1}
                onHide={() => setShowModal1(false)}
                fetchdata={fetchData}
                id={id}
            />
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate('/allpackages')} />
                        <h6>View Package</h6>
                        <div className='addserivce-btn' style={{ gap: "0.5rem" }}>
                            <button onClick={() => setShowModal(true)} style={{ marginRight: "0.5rem" }}>Add Price</button>
                            <button onClick={() => setShowModal2(true)} style={{ marginRight: "0.5rem" }}>View Prices</button>
                            {/* <button onClick={() => setShowModal1(true)}>Add Images</button> */}
                        </div>
                    </div>
                    <div className='addcategory-btn'>
                        <div className='partnerprofile-btn'>
                            <button onClick={() => navigate('/allpackages')}>Cancel</button>
                        </div>
                        <div className='addserivce-btn'>
                            <button onClick={handleSubmit} disabled={loading4}>{loading4 ? "Saving..." : "Save"}</button>
                        </div>
                    </div>
                </div>
                <div className='addservice-main'>
                    {loading5 ?
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
                                        placeholder="Enter Package name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        id="serviceName"
                                    />
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Main-Category</label>
                                    <select
                                        name="mainCategory"
                                        value={maincategoryId}
                                        onChange={(e) => setmainCategoryId(e.target.value)}
                                    >
                                        <option value="">Select</option>
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
                                        name="Category"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                    >
                                        <option value="">Select</option>
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
                                        name="SubCategory"
                                        value={subcategoryId}
                                        onChange={(e) => setSubCategoryId(e.target.value)}
                                    >
                                        <option value="">Select</option>
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
                                    <label htmlFor="">Select Services</label>
                                    <select
                                        multiple
                                        value={selectedServiceIds}
                                        onChange={(e) => {
                                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                            setSelectedServiceIds(selectedOptions);
                                        }}
                                    >
                                        {loading3 ? (
                                            <option value="">Loading...</option>
                                        ) : !Array.isArray(servicesOption?.data) || servicesOption?.data?.length === 0 ? (
                                            <option value="">No data</option>
                                        ) : (
                                            servicesOption?.data?.map((service) => (
                                                <option key={service._id} value={service._id}>
                                                    {service.title}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    <div>
                                        <p>{message}</p>
                                    </div>
                                    <div className='addserivce-btn' style={{ marginTop: "1rem" }}>
                                        <button onClick={handleEditServices}>Add Selected Services</button>
                                    </div>
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Total Minutes</label>
                                    <input
                                        type="number"
                                        placeholder="Enter Service total minutes"
                                        value={totalmin}
                                        onChange={(e) => setTotalMin(e.target.value)}
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

export default HOC(EditPackages)