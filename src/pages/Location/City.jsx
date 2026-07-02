import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { Link } from 'react-router-dom';
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import img from '../../assest/loading1.gif'


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AddCity, DeleteConfirmation } from '../../components/Modals/Modals';


const City = () => {
    const [cityData, setCityData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);



    const fetchData = useCallback(async () => {
        await getApi(endPoints.getcity, {
            setResponse: setCityData,
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

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deletecity(itemToDelete), {
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
            <AddCity
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
                        <div className='servicetnasctionactive' >
                            <h6>Cities</h6>
                        </div>
                    </Link>
                    <Link to={'/location/areas'} className='link'>
                        <div className='servicetnasction' >
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
                                    (!cityData?.data || cityData?.data?.length === 0 || cityData?.status === 404) ?
                                        <tr>
                                            <td colSpan="7" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                        :
                                        cityData?.data?.map((city, index) => (
                                            <tr key={index}>
                                                <td>
                                                    #{index + 1}
                                                </td>
                                                <td>{city.name}</td>
                                                <td
                                                    style={{
                                                        color: city.status ? '#3FB031'
                                                            : '#B60B0B'
                                                    }}
                                                >
                                                    {city.status ? "Active" : 'Inactive'}
                                                </td>
                                                <td className='div-icons'>
                                                    <FaEdit onClick={() => openEditModal(city)} />
                                                    <MdDelete onClick={() => handleDeleteClick(city._id)} />
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

export default HOC(City)