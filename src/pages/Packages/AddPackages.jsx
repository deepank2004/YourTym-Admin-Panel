import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { toast } from 'react-toastify';
import { getApi, postApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddPackages = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [maincategoryId, setmainCategoryId] = useState(null);
    const [description, setDescription] = useState(null);
    const [totalmin, setTotalMin] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);

    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);
    const [CategoryOptions, setCategoryOptions] = useState([]);
    const [SubCategoryOptions, setSubCategoryOptions] = useState([]);
    const [servicesOption, setServicesOptions] = useState([]);

    // New state for tracking added service groups
    const [serviceGroups, setServiceGroups] = useState([]);

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
        setServicesOptions([]);
        await getApi(endPoints.getAllservicebysubcategoryid(maincategoryId, categoryId, subCategoryId), {
            setResponse: setServicesOptions,
            setLoading: setLoading3,
        });
    }, [maincategoryId, categoryId, subCategoryId])

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
        if (maincategoryId && categoryId && subCategoryId) {
            fetchServices();
        }
    }, [maincategoryId, categoryId, subCategoryId, fetchServices]);

    useEffect(() => {
        fetchMainCategories();
    }, []);

    const resetForm = () => {
        setName("");
        setmainCategoryId(null);
        setDescription("");
        setTotalMin("");
        setCategoryId(null);
        setSubCategoryId(null);
        setSelectedServiceIds([]);
        setServiceGroups([]);
    };

    const handleAddServiceGroup = () => {
        if (!categoryId || !subCategoryId || !selectedServiceIds?.length) {
            toast.error("Please select a category, subcategory, and at least one service.");
            return;
        }

        // Get names for display
        const categoryName = getDisplayName(categoryId, CategoryOptions);
        const subCategoryName = getDisplayName(subCategoryId, SubCategoryOptions);
        const serviceNames = selectedServiceIds.map(id =>
            getDisplayName(id, servicesOption)
        );

        setServiceGroups(prev => {
            // Create new service group object
            const newSubCategory = {
                subCategoryId,
                subCategoryName,
                services: [...selectedServiceIds],
                serviceNames: [...serviceNames]
            };

            // Check if category already exists
            const categoryIndex = prev.findIndex(
                g => g.category.categoryId === categoryId
            );

            // If category doesn't exist, add new category with subcategory
            if (categoryIndex === -1) {
                return [
                    ...prev,
                    {
                        category: {
                            categoryId,
                            categoryName,
                            subCategory: [newSubCategory]
                        }
                    }
                ];
            }

            // If category exists, check if subcategory exists
            const existingCategory = prev[categoryIndex];
            const subCategoryIndex = existingCategory.category.subCategory.findIndex(
                sc => sc.subCategoryId === subCategoryId
            );

            // Create updated category
            const updatedCategory = {
                ...existingCategory.category,
                subCategory: [...existingCategory.category.subCategory]
            };

            // If subcategory doesn't exist, add new subcategory
            if (subCategoryIndex === -1) {
                updatedCategory.subCategory.push(newSubCategory);
            }
            // If subcategory exists, merge services
            else {
                const existingSubCat = updatedCategory.subCategory[subCategoryIndex];
                updatedCategory.subCategory[subCategoryIndex] = {
                    ...existingSubCat,
                    services: [...new Set([...existingSubCat.services, ...selectedServiceIds])],
                    serviceNames: [...new Set([...existingSubCat.serviceNames, ...serviceNames])]
                };
            }

            // Return updated groups
            return [
                ...prev.slice(0, categoryIndex),
                { category: updatedCategory },
                ...prev.slice(categoryIndex + 1)
            ];
        });

        toast.success("Service group added successfully!");
        setSelectedServiceIds([]);
    };

    const handleRemoveServiceGroup = (categoryId, subCategoryId) => {
        setServiceGroups(prev => {
            const updated = prev.map(group => {
                if (group.category?.categoryId === categoryId) {
                    // Safely handle undefined subCategory
                    const subCategories = group.subCategory || [];
                    const filteredSubCategories = subCategories.filter(
                        sc => sc?.subCategoryId !== subCategoryId
                    );

                    if (filteredSubCategories.length === 0) {
                        return null; // Remove entire category if no subcategories left
                    }

                    return {
                        ...group,
                        subCategory: filteredSubCategories
                    };
                }
                return group;
            }).filter(Boolean); // Remove null entries

            return updated;
        });
    };

    const handleSubmit = async () => {
        if (!name || !maincategoryId || !description || !totalmin || serviceGroups.length === 0) {
            toast.error("Please fill all required fields and add at least one service group");
            return;
        }

        // Prepare payload without display names
        const payload = {
            title: name,
            timeInMin: totalmin,
            mainCategoryId: maincategoryId,
            description: description,
            status: status,
            type: "Package",
            packageType: "Customize",
            services: serviceGroups?.map(group => ({
                category: {
                    categoryId: group.category?.categoryId,
                    subCategory: group.category?.subCategory?.map(subCat => ({
                        subCategoryId: subCat?.subCategoryId,
                        services: subCat?.services || []
                    })) || []
                }
            })) || []
        };

        await postApi(endPoints.AddPackage, payload, {
            setLoading: setLoading4,
            successMsg: "Package added successfully!",
            errorMsg: "Failed to add Package!",
        });

        navigate("/allpackages");
        resetForm();
    };

    // Helper function to get category/subcategory/service names for display
    const getDisplayName = (id, options) => {
        if (!id || !options?.data) return "Unknown";

        // Find the item in the options array
        const item = Array.isArray(options.data)
            ? options.data.find(item => item._id === id)
            : null;

        // Return name or title if available
        return item?.name || item?.title || "Unknown";
    };
    console.log(serviceGroups, "sdls")
    console.log("Service Groups before render:", JSON.parse(JSON.stringify(serviceGroups)));
    const fullToolbarOptions = [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["clean"],
    ];

    return (
        <div className='userprofilecontainer'>
            <div className='partnerprofile-container'>
                <div className='userprofile-header'>
                    <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate('/allpackages')} />
                    <h6>Add Package</h6>
                </div>
                <div className='addcategory-btn'>
                    <div className='partnerprofile-btn'>
                        <button onClick={() => navigate('/service-management/all-subcategory')}>Cancel</button>
                    </div>
                    <div className='addserivce-btn'>
                        <button onClick={handleSubmit} disabled={loading4}>
                            {loading4 ? "Saving..." : "Save"}
                        </button>
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
                                placeholder="Enter Package name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Main-Category</label>
                            <select
                                value={maincategoryId}
                                onChange={(e) => {
                                    setmainCategoryId(e.target.value);
                                    setCategoryId(null);
                                    setSubCategoryId(null);
                                    setSelectedServiceIds([]);
                                }}
                            >
                                <option value="">Select</option>
                                {loading ? (
                                    <option value="">Loading...</option>
                                ) : !Array.isArray(mainCategoryOptions?.data) || mainCategoryOptions?.data?.length === 0 ? (
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
                                value={categoryId}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                    setSubCategoryId(null);
                                    setSelectedServiceIds([]);
                                }}
                                disabled={!maincategoryId}
                            >
                                <option value="">Select</option>
                                {loading1 ? (
                                    <option value="">Loading...</option>
                                ) : !Array.isArray(CategoryOptions?.data) || CategoryOptions?.data?.length === 0 ? (
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
                                value={subCategoryId}
                                onChange={(e) => {
                                    setSubCategoryId(e.target.value);
                                    setSelectedServiceIds([]);
                                }}
                                disabled={!categoryId}
                            >
                                <option value="">Select</option>
                                {loading2 ? (
                                    <option value="">Loading...</option>
                                ) : !Array.isArray(SubCategoryOptions?.data) || SubCategoryOptions?.data?.length === 0 ? (
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
                                    const selectedOptions = Array.from(
                                        e.target.selectedOptions,
                                        (option) => option.value
                                    );
                                    setSelectedServiceIds(selectedOptions);
                                }}
                                disabled={!subCategoryId}
                            >
                                {loading3 ? (
                                    <option value="">Loading...</option>
                                ) : !Array.isArray(servicesOption?.data) || servicesOption?.data?.length === 0 ? (
                                    <option value="">No data</option>
                                ) : (
                                    servicesOption?.data?.map((service) => (
                                        <option key={service._id} value={service._id}>
                                            {service.title} ({service.timeInMin}min)
                                        </option>
                                    ))
                                )}
                            </select>
                            <div className='addserivce-btn' style={{ marginTop: "1rem" }}>
                                <button
                                    onClick={handleAddServiceGroup}
                                    disabled={!categoryId || !subCategoryId || selectedServiceIds.length === 0}
                                >
                                    Add Service Group
                                </button>
                            </div>
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Total Minutes</label>
                            <input
                                type="number"
                                placeholder="Enter total minutes"
                                value={totalmin}
                                onChange={(e) => setTotalMin(e.target.value)}
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
                                value={status}
                            >
                                <option value="">Select</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Service Groups Preview Table */}
                {serviceGroups.length > 0 && (
                    <div className="service-groups-preview">
                        <h4>Service Groups Preview</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Sub-Category</th>
                                    <th>Services</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceGroups.map((group) => (
                                    group.category?.subCategory?.map((subCat, subIndex) => {
                                        const isFirstSubCategory = subIndex === 0;
                                        const rowSpan = group.category.subCategory.length;

                                        return (
                                            <tr key={`${group.category.categoryId}-${subCat.subCategoryId}`}>
                                                {/* Category cell with rowSpan */}
                                                {isFirstSubCategory && (
                                                    <td rowSpan={rowSpan} style={{ verticalAlign: 'top' }}>
                                                        {group.category.categoryName || "Unknown"}
                                                    </td>
                                                )}

                                                {/* SubCategory cell */}
                                                <td>{subCat.subCategoryName || "Unknown"}</td>

                                                {/* Services cell */}
                                                <td>
                                                    {subCat.serviceNames?.length > 0 ? (
                                                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                                            {subCat.serviceNames.map((name, serviceIndex) => (
                                                                <li key={`${subCat.subCategoryId}-${serviceIndex}`}>
                                                                    {name || "Unnamed Service"}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <div>No services selected</div>
                                                    )}
                                                </td>

                                                {/* Actions cell - Only show in the first row */}
                                                {isFirstSubCategory && (
                                                    <td rowSpan={rowSpan} style={{ verticalAlign: 'top' }}>
                                                        <button
                                                            onClick={() => handleRemoveServiceGroup(
                                                                group.category.categoryId,
                                                                null // Remove entire category
                                                            )}
                                                            style={{
                                                                padding: '5px 10px',
                                                                background: '#ff4444',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HOC(AddPackages);