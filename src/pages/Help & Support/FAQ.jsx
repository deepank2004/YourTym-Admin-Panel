import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import img from '../../assest/loading1.gif'
import { DeleteConfirmation } from '../../components/Modals/Modals';


const FAQ = () => {
    const navigate = useNavigate()

    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);



    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallFaq, {
            setResponse: setFaqData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch faq data!",
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
        await deleteApi(endPoints.deletefaq(itemToDelete), {
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
                        <h6>Help & Support</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='addserivce-btn'>
                            <button onClick={() => navigate('/help-Support/support-faq/add-faq')}>Create new</button>
                        </div>
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/help-Support/support-faq'} className='link'>
                        <div className='servicetnasctionactive'>
                            <h6>Support FAQ</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/maincategory-faq'} className='link'>
                        <div className='servicetnasction'>
                            <h6>MainCategory FAQ</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/ticket-raised'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Ticket Raised</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/contact-support'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Contact Support</h6>
                        </div>
                    </Link>

                </div>
                <div className='faqcontainer'>
                    {loading ?
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                        :
                        faqData?.data?.length === 0 ?
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                            :
                            faqData?.data?.map((faq, index) => (
                                <div className='faqlist'>
                                    <div className='faqlistcontent'>
                                        <h6>{faq.question}?</h6>
                                        <p>{faq.answer} </p>
                                    </div>
                                    <div className='faqlisticons'>
                                        <div className='privacypolicyicon' onClick={() => navigate(`/help-Support/support-faq/edit/${faq?._id}`)}>
                                            <MdOutlineModeEdit color='#FF5534' size={20} />
                                        </div>
                                        <div className='privacypolicyicon' size={20} onClick={() => handleDeleteClick(faq?._id)}>
                                            <RiDeleteBin6Line color='#FF5534' />
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>

            </div >
        </>
    )
}

export default HOC(FAQ)