import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { deleteApi, getApi } from '../../Repository/Api';

import { MdMoreVert } from "react-icons/md";
import { RiStarFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import img6 from '../../assest/loading1.gif'
import { DeleteConfirmation } from '../../components/Modals/Modals';



const ServiceManagement = () => {

    const [maincategorydata, setMainCategoryData] = useState([])
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallMaincategory, {
            setResponse: setMainCategoryData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch main category data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const navigate = useNavigate()


    const handleDeleteClick = (categoryId) => {
        setItemToDelete(categoryId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deletemaincategory(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: "Service deleted successfully!",
            errorMsg: "Failed to delete service!",
            additionalFunctions: [fetchData()],
        });
        setShowDeleteModal(false);
    };

    return (
        <>
            <DeleteConfirmation
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                loading={deleteLoading}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Service Management</h6>
                    </div>
                    <div className='userlist5'>
                        <button onClick={() => navigate('/service-management/add-service')}>Add Service</button>
                    </div>
                </div>
                <div className='userlist6'>
                    {loading ? (
                        <div className="normalloading">
                            <img src={img6} alt="" />
                        </div>
                    ) : !maincategorydata?.data || maincategorydata.data.length === 0 ? (
                        <div className="normalloading">
                            <p>No data available.</p>
                        </div>
                    ) : (
                        <div className="servicemanagement-container">
                            {maincategorydata.data.map((i, index) => (
                                <div className="servicemanagement-div" key={index}>
                                    <div className="servicemanagement-div-icon">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="none" className="table-icon">
                                                <MdMoreVert color="#000000" size={25} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdownmenu-custimize">
                                                <Dropdown.Item className="userdrop1">
                                                    <Link
                                                        to={`/service-management/main-category/${i?._id}`}
                                                        className="link"
                                                    >
                                                        <div className="userdrop">
                                                            <FaEdit color="#000000" size={20} />
                                                            <p>Edit</p>
                                                        </div>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item className="userdrop1" onClick={() => handleDeleteClick(i?._id)}>
                                                    <div className="userdrop">
                                                        <RiDeleteBin6Line
                                                            color="#FF5534"
                                                            size={20}
                                                        />
                                                        <p style={{ color: "#FF5534" }}>
                                                            Delete
                                                        </p>
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <Link
                                        to={`/service-management/${i.name}/${i._id}`}
                                        className="link"
                                    >
                                        <div className="servicemanagement-div-profile">
                                            <div className="servicemanagement-div-image">
                                                <img src={i.image} alt="" />
                                            </div>
                                            <h6>{i.name}</h6>
                                        </div>
                                        <div className="servicemanagement-div-line"></div>
                                        <div className="servicemanagement-div-content">
                                            <p>No of bookings: {i?.orders?.[0]?.orderCount}</p>
                                            <p>
                                                Rating:{" "}
                                                <RiStarFill color="#E1B913" size={20} />{" "}
                                                {i.averageRating}
                                            </p>
                                            <p>Category: {i.categoryCount}</p>
                                            <p>Total partners: {i.partnerCount}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div >
        </>
    )
}

export default HOC(ServiceManagement)