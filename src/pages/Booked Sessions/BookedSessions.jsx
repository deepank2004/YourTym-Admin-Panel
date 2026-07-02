import React, { useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { AddPassFail, DeleteConfirmation } from '../../components/Modals/Modals';

import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import img from '../../assest/loading1.gif'


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatDate } from '../../utils/utils';




const BookedSessions = () => {

    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);




    const fetchData = async () => {
        await getApi(endPoints.getAllsession, {
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
        await deleteApi(endPoints.deletesession(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
        setShowDeleteModal(false);
    };



    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal(true);
    };



    // Initial Data Fetch
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <AddPassFail
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
                        <h6>All Booked Sessions</h6>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Partner Name</th>
                                    <th>Partner Number</th>
                                    <th>Partner Email</th>
                                    <th>Date</th>
                                    <th>Skill Session Result</th>
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
                                    Data?.data?.length === 0 ?
                                        <tr>
                                            <td colSpan="9" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                        :
                                        Data?.data?.map((i, index) => (
                                            <tr key={index}>
                                                <td>#{index + 1}</td>
                                                <td>{i?.userId?.fullName || 'N/A'}</td>
                                                <td>{i?.userId?.phone || 'N/A'}</td>
                                                <td>{i?.userId?.email || 'N/A'}</td>
                                                <td>{formatDate(i?.createdAt)}</td>
                                                <td>{i?.skillSessionResult || 'N/A'}</td>
                                                <td>{i?.status}</td>
                                                <td className='div-icons'>
                                                    <FaEdit onClick={() => openEditModal(i)} />
                                                    <MdDelete onClick={() => handleDeleteClick(i._id)} />
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

export default HOC(BookedSessions)