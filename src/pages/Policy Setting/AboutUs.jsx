import React, { useEffect, useState, useCallback } from "react";
import HOC from '../../components/HOC/HOC'
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";


import img from '../../assest/loading1.gif'
import { DeleteConfirmation } from "../../components/Modals/Modals";


const AboutUs = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Stable version of fetchData
    const fetchData = useCallback(async () => {
        setData([]);
        await getApi(endPoints.getAboutUs, {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch Terms & Condition!",
        });
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
        await deleteApi(endPoints.deleteaboutus(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
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
                        <h6>About Us</h6>
                    </div>
                </div>
                {loading ?
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                    :
                    <div className='privacypolicy'>
                        <div className='privacypolicyheader'>
                            <div className='userlist5'>
                                {Object.keys(data.data || {}).length === 0 && (
                                    <button onClick={() => navigate('/about-us/add')}>Create new About Us</button>
                                )}
                            </div>
                            <div className='privacypolicyicon' onClick={() => navigate(`/about-us/edit/${data?.data?.[0]?._id}`)}>
                                <MdOutlineModeEdit color='#FF5534' size={20} />
                            </div>
                            <div className="privacypolicyicon" onClick={() => handleDeleteClick(data?.data?.[0]?._id)}>
                                <RiDeleteBin6Line color="#FF5534" size={20} />
                            </div>
                        </div>
                        <div className="privacypolicymain">
                            <h6>{data.data?.[0]?.title || "About Us"}</h6>
                            {data?.data?.[0]?.desc ? (
                                <div dangerouslySetInnerHTML={{ __html: data.data[0].desc }} />
                            ) : (
                                <p>No About Us available.</p>
                            )}
                        </div>
                    </div>
                }
            </div >
        </>
    )
}

export default HOC(AboutUs)