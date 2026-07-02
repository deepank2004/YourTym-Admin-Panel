import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { getApi, deleteApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import img from '../../assest/loading1.gif'


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ViewDescription } from '../../components/Modals/Modals';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LiaArrowLeftSolid } from "react-icons/lia";
import { IoEye } from "react-icons/io5";



const ServiceCategoryDetails = () => {
    const { id } = useParams()
    const { categoryid } = useParams()
    const { category } = useParams()
    const [subcategoryData, setSubCategoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate()

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getsubcategorybycategoryid(id, categoryid), {
            setResponse: setSubCategoryData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch sub category data!",
        })
    }, [id, categoryid]);





    useEffect(() => {
        fetchData();
    }, [fetchData, id, categoryid]);

    const handleDelete = async () => {
        if (!selectedItem) return;
        await deleteApi(endPoints.deletesubcategory(selectedItem), {
            setLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
    };


    const openDescriptionModal = (data) => {
        setSelectedItem(data);
        setShowModal(true)
    };




    const openDeleteModal = (categoryId) => {
        setSelectedItem(categoryId);
        handleDelete();
    };

    const truncateText = (htmlString, maxLength) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlString;
        const textContent = tempElement?.textContent || tempElement?.innerText || "";

        return textContent.length > maxLength ? `${textContent?.slice(0, maxLength)}...` : textContent;
    };




    return (
        <>
            <ViewDescription
                show={showModal}
                onHide={() => setShowModal(false)}
                data={selectedItem}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>{category}</h6>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>View Services</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ?
                                    <tr>
                                        <td colSpan="9" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                    :
                                    !Array.isArray(subcategoryData?.data) || subcategoryData?.data?.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        subcategoryData?.data?.map((i, index) => (
                                            <tr key={index}>
                                                <td>#{index + 1}</td>
                                                <td>{i?.name}</td>
                                                <td><img src={i?.image} alt="" style={{ width: "100px", height: '50px' }} /></td>
                                                <td>
                                                    <span dangerouslySetInnerHTML={{ __html: truncateText(i?.description, 15) }} />{' '}
                                                    {i?.description?.replace(/<\/?[^>]+(>|$)/g, "").length > 15 && (
                                                        <button
                                                            onClick={() => openDescriptionModal(i?.description)}
                                                            style={{
                                                                color: 'blue',
                                                                textDecoration: 'underline',
                                                                background: 'none',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                padding: 0,
                                                            }}
                                                        >
                                                            Show More
                                                        </button>
                                                    )}
                                                </td>
                                                <td>{i?.status ? "Active" : "In-Active"}</td>
                                                <td className='div-icons11'>
                                                    <Link to={`/service-management/service-details/${id}/${category}/${categoryid}/subcategory/${i?._id}`}>
                                                        <IoEye />
                                                    </Link>
                                                </td>
                                                <td className='div-icons'>
                                                    <Link to={`/service-management/all-subcategory/edit/${i?._id}`}>
                                                        <FaEdit />
                                                    </Link>
                                                    <MdDelete onClick={() => openDeleteModal(i._id)} />
                                                </td>
                                            </tr>
                                        )))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(ServiceCategoryDetails)