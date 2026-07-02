import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";



import img from '../../assest/loading1.gif'
import { DeleteConfirmation } from '../../components/Modals/Modals';

const Banners = () => {
    const navigate = useNavigate()

    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);



    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallBanner, {
            setResponse: setBannerData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch Banner data!",
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
        await deleteApi(endPoints.deletebanner(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: "Banner deleted successfully!",
            errorMsg: "Failed to delete banner!",
            additionalFunctions: [fetchData],
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
                        <h6>Banners</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='userlist5'>
                            <button onClick={() => navigate('/banners/add-banner')}>Add new</button>
                        </div>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Banner</th>
                                    <th>Banner name</th>
                                    <th>Banner Type</th>
                                    <th>Banner Position</th>
                                    <th>View Details</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                ) :
                                    bannerData?.data?.status === 0 ? (
                                        <tr>
                                            <td colSpan="8" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        bannerData?.data?.map((banner, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className='bannerimagetable'>
                                                        <img src={banner.image} alt="" />
                                                    </div>

                                                </td>
                                                <td>{banner.title}</td>
                                                <td>{banner.type}</td>
                                                <td>{banner.position}</td>
                                                <td style={{ cursor: 'pointer' }}>
                                                    <LuEye color="#000000" size={20} onClick={() => navigate(`/banners/view-banner/${banner?._id}`)} />
                                                </td>
                                                <td>{banner.status ? "Active" : "Deactive"}</td>
                                                <td className='div-icons'>
                                                    <MdDelete onClick={() => handleDeleteClick(banner?._id)} />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(Banners)