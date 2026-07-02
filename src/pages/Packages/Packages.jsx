import React, { useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { AddCategory, DeleteConfirmation, ViewDescription } from '../../components/Modals/Modals';

import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import img from '../../assest/loading1.gif'


import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

import { IoEye } from "react-icons/io5";



const Packages = () => {
    const navigate = useNavigate();
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);



    const fetchData = async () => {
        setData([]);
        await getApi(endPoints.getAllpackages, {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }

    const handleDeleteClick = (categoryId) => {
        setItemToDelete(categoryId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deletepackage(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
        setShowDeleteModal(false);
    };

    // Modal Openers

    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal(true);
    };

    // const openDeleteModal = (categoryId) => {
    //     setSelectedItem(categoryId);
    //     handleDelete();
    // };

    useEffect(() => {
        fetchData();
    }, []);

    const openDescriptionModal = (data) => {
        setSelectedItem(data);
        setShowModal1(true)
    };

    const truncateText = (htmlString, maxLength) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlString;
        const textContent = tempElement.textContent || tempElement.innerText || "";

        return textContent.length > maxLength ? `${textContent.slice(0, maxLength)}...` : textContent;
    };


    return (
        <>
            <AddCategory
                show={showModal}
                onHide={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <ViewDescription
                show={showModal1}
                onHide={() => setShowModal1(false)}
                data={selectedItem}
            />
            <DeleteConfirmation
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                loading={deleteLoading}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>All Package</h6>
                    </div>
                    <div className='userlist5'>
                        <button onClick={() => navigate('/allpackages/add')}>Add</button>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Title</th>
                                    <th>Total Minutes</th>
                                    <th>Main Category</th>
                                    <th>Description</th>
                                    <th>Status</th>
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
                                    !Array.isArray(Data?.data) || Data?.data?.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        Data?.data?.map((i, index) => (
                                            <tr key={index}>
                                                <td>#{index + 1}</td>
                                                <td>{i?.title}</td>
                                                <td>{i?.timeInMin}Min</td>
                                                <td>{i?.mainCategoryId?.name}</td>
                                                <td>
                                                    <span dangerouslySetInnerHTML={{ __html: truncateText(i?.description, 15) }} />{' '}
                                                    {i?.description?.replace(/<\/?[^>]+(>|$)/g, "").length > 15 && (
                                                        <button
                                                            onClick={() => openDescriptionModal(i.description)}
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
                                                <td className='div-icons'>
                                                    <Link to={`/allpackages/view/${i?._id}`}>
                                                        <IoEye />
                                                    </Link>
                                                    <MdDelete onClick={() => handleDeleteClick(i._id)} />
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

export default HOC(Packages)