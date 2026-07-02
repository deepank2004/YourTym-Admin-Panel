import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';

import img from '../../assest/loading1.gif'


import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddPackageImage, AddPackagePrice, ViewDescription, ViewPackagePrice } from '../../components/Modals/Modals';

const ViewPackage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false);




    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [data, setData] = useState({})


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getpackagebyid(id), {
            setResponse: (response) => {
                if (response?.data) {
                    setData(response.data);
                }
            },
            setLoading: setLoading,
            errorMsg: 'Failed to fetch data!',
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);













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


    const openDescriptionModal = (data) => {
        setSelectedItem(data);
        setShowModal3(true)
    };

    const truncateText = (htmlString, maxLength) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlString;
        const textContent = tempElement.textContent || tempElement.innerText || "";

        return textContent.length > maxLength ? `${textContent.slice(0, maxLength)}...` : textContent;
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
                location={data.location}
                openEditModal={openEditModal}
            />
            <AddPackageImage
                show={showModal1}
                onHide={() => setShowModal1(false)}
                fetchdata={fetchData}
                id={id}
            />
            <ViewDescription
                show={showModal3}
                onHide={() => setShowModal3(false)}
                data={selectedItem}
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
                            <button onClick={() => navigate('/allpackages')}>Back</button>
                        </div>
                    </div>
                </div>
                <div className='addservice-main'>
                    {loading ?
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
                                        value={data?.title}
                                        id="serviceName"
                                        readOnly
                                    />
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Main Category Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter main category name"
                                        value={data?.mainCategoryId?.name}
                                        readOnly
                                    />
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Total Minutes</label>
                                    <input
                                        type="number"
                                        placeholder="Enter Service total minutes"
                                        value={data?.timeInMin}
                                        readOnly
                                    />
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Description</label>
                                    <div className="custom-quill-wrapper">
                                        <ReactQuill
                                            theme="snow"
                                            modules={{ toolbar: fullToolbarOptions }}
                                            value={data?.description}
                                            className="custom-quill-editor"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="addcategory-container">
                                    <label htmlFor="">Status</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Package name"
                                        value={data?.status ? "Active" : "Deactive"}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='addservice-right'>
                                <div className='addservice-right-div'>
                                    <label htmlFor="">Upload Images</label>
                                    {data?.images === 0 ? (
                                        <div className='nodata-message'>
                                            <p>No data available.</p>
                                        </div>
                                    ) : (
                                        data?.images?.map((img, index) => (
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

            <div className="service-groups-preview">
                <h4>Service Groups Preview</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Sub-Category</th>
                            <th>Services</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.services?.map((serviceGroup, groupIndex) => (
                            serviceGroup.category?.subCategory?.map((subCat, subIndex) => {
                                const isFirstSubCategory = subIndex === 0;
                                const rowSpan = serviceGroup.category.subCategory.length;

                                return (
                                    <tr key={`${serviceGroup._id}-${subCat._id}`}>


                                        {/* Category - shown only once per group */}
                                        {isFirstSubCategory && (
                                            <td rowSpan={rowSpan} style={{ verticalAlign: 'top' }}>
                                                {serviceGroup.category.categoryId?.name || "Unknown"}
                                            </td>
                                        )}

                                        {/* SubCategory cell */}
                                        <td>{subCat.subCategoryId?.name || "Unknown"}</td>

                                        {/* Services cell */}
                                        <td>
                                            {subCat.services?.length > 0 ? (
                                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                                    {subCat.services.map((service) => (
                                                        <li key={service._id}>
                                                            {service.title || "Unnamed Service"}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div>No services selected</div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HOC(ViewPackage)