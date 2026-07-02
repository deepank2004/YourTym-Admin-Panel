import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { Link } from 'react-router-dom';
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import img from '../../assest/loading1.gif'


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AddArea, DeleteConfirmation } from '../../components/Modals/Modals';


const Area = () => {
    const [areaData, setAreaData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getarea, {
            setResponse: setAreaData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDeleteClick = (categoryId) => {
        setItemToDelete(categoryId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async (id) => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deletearea(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
        setShowDeleteModal(false);
    };



    const openAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal(true);
    };



    return (
        <>
            <AddArea
                show={showModal}
                onHide={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
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
                        <h6>Location</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='userlist5'>
                            <button onClick={openAddModal}>Add new</button>
                        </div>
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/location/cities'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Cities</h6>
                        </div>
                    </Link>
                    <Link to={'/location/areas'} className='link'>
                        <div className='servicetnasctionactive' >
                            <h6>Areas</h6>
                        </div>
                    </Link>

                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Area Name</th>
                                    <th>City Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ?
                                    <tr>
                                        <td colSpan="7" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                    :
                                    (!areaData?.data || areaData?.data?.length === 0 || areaData?.status === 404) ?
                                        <tr>
                                            <td colSpan="7" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                        :
                                        areaData?.data?.map((area, index) => (
                                            <tr key={index}>
                                                <td>
                                                    #{index + 1}
                                                </td>
                                                <td>{area?.name}</td>
                                                <td>{area?.city?.name || "N/A"}</td>
                                                <td
                                                    style={{
                                                        color: area?.status ? '#3FB031'
                                                            : '#B60B0B'
                                                    }}
                                                >
                                                    {area?.status ? "Active" : 'Inactive'}
                                                </td>
                                                <td className='div-icons'>
                                                    <FaEdit onClick={() => openEditModal(area)} />
                                                    <MdDelete onClick={() => handleDeleteClick(area?._id)} />
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(Area)