import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import Notificationsend from './Notificationsend';


import { MdDelete } from "react-icons/md";

import img from '../../assest/loading1.gif'
import { DeleteConfirmation, ViewDescription } from '../../components/Modals/Modals';


const PushNotification = () => {
    const [notificationData, setNotificationData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallNotification, {
            setResponse: setNotificationData,
            setLoading: setLoading,
            // errorMsg: "Failed to fetch notification data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openDescriptionModal = (data) => {
        setSelectedItem(data);
        setShowModal(true)
    };


    const handleDeleteClick = (categoryId) => {
        setItemToDelete(categoryId);
        setShowDeleteModal(true);
    };


    const confirmDelete = async () => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deletenotification(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
        setShowDeleteModal(false);
    };

    const handleAllDelete = async () => {
        await deleteApi(endPoints.deleteAllnotification, {
            setLoading: setLoading2,
            successMsg: 'All Data deleted successfully!',
            errorMsg: 'Failed to delete all data!',
        });
        fetchData();
    };





    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Add 5 hours and 30 minutes to convert UTC to IST
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return formattedDate;
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.slice(0, maxLength)}...`;
        }
        return text;
    };

    return (
        <>
            <ViewDescription
                show={showModal}
                onHide={() => setShowModal(false)}
                data={selectedItem}
            />
            <Notificationsend fetchData={fetchData} />
            <DeleteConfirmation
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                loading={deleteLoading}
            />
            <div className='userlist6'>
                <div className='addserivce-btn'>
                    <button
                        style={{ marginBottom: "1rem" }}
                        disabled={loading2}
                        onClick={handleAllDelete} >
                        {loading2 ? "Deleting..." : "Delete All Notification"}
                    </button>
                </div>
                <div className='bottomdashboard3'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Notification Title</th>
                                <th>Notification Content</th>
                                {/* <th>User Type</th>
                                <th>Send to</th> */}
                                <th>Send Via</th>
                                <th>Expire Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ?
                                <tr>
                                    <td colSpan="8" className='tableloading'>
                                        <img src={img} alt="" />
                                    </td>
                                </tr>
                                :
                                notificationData?.data?.length === 0 ?
                                    <tr>
                                        <td colSpan="8" className='tableloading'>
                                            <p>No data available.</p>
                                        </td>
                                    </tr>
                                    :
                                    notificationData?.data?.map((order, index) => (
                                        <tr key={index}>
                                            <td>#{index + 1}</td>
                                            <td>{order.title}</td>
                                            <td>
                                                {truncateText(order?.content, 15)}{' '}
                                                {order?.content?.length > 15 && (
                                                    <button
                                                        onClick={() => openDescriptionModal(order.content)}
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
                                            {/* <td>{order.userType}</td>
                                            <td>{order.sendto}</td> */}
                                            <td>{order.sendVia}</td>
                                            <td>{formatDate(order.expireIn)}</td>
                                            <td>{order.status}</td>
                                            <td className='div-icons'>
                                                <MdDelete onClick={() => handleDeleteClick(order?._id)} />
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default HOC(PushNotification)