import React, { useEffect, useState } from 'react';
import HOC from '../../../components/HOC/HOC';
import { deleteApi, getApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';
import img from '../../../assest/loading1.gif';
import { AddMainCategoryType, DeleteConfirmation } from '../../../components/Modals/Modals';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AllMainCategoryType = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    // Fetch Data
    const fetchData = async () => {
        await getApi(endPoints.getallMaincategorytypes, {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        });
    };

    const handleDeleteClick = (categoryId) => {
        setItemToDelete(categoryId);
        setShowDeleteModal(true);
    };
    // Delete Handler
    const confirmDelete = async () => {
        if (!selectedItem) return;
        await deleteApi(endPoints.deletemaincategorytype(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        setShowDeleteModal(false);
    };

    // Modal Openers
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



    // Initial Data Fetch
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/* Add/Edit Modal */}
            <AddMainCategoryType
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

            {/* Page Content */}
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Main Category Types</h6>
                    </div>
                    <div className='userlist5'>
                        <button onClick={openAddModal}>Add</button>
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
                                    <th>Main Category Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className='tableloading'>
                                            <img src={img} alt="Loading" />
                                        </td>
                                    </tr>
                                ) : data?.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className='tableloading'>
                                            <p>No data available.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    data?.data?.map((item, index) => (
                                        <tr key={item._id || index}>
                                            <td>#{index + 1}</td>
                                            <td>{item?.name || "N/A"}</td>
                                            <td>
                                                <img
                                                    src={item?.image || ""}
                                                    alt="Category"
                                                    style={{ width: "100px", height: "50px" }}
                                                />
                                            </td>
                                            <td>{item?.mainCategoryId?.name || "N/A"}</td>
                                            <td>{item?.status ? "Active" : "Inactive"}</td>
                                            <td className='div-icons'>
                                                <FaEdit onClick={() => openEditModal(item)} />
                                                <MdDelete onClick={() => handleDeleteClick(item._id)} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(AllMainCategoryType);
