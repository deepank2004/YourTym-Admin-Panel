import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HOC from '../../components/HOC/HOC';
import { AddFund, AddReFund } from '../../components/Modals/Modals';


import { LiaArrowLeftSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";

import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import img1 from '../../assest/loading1.gif'
import { formatDate } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';


const WalletDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [Data, setData] = useState([]);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        limit: 10,
    });


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getTransactionbyuserid(id, pagination.currentPage, pagination.limit), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [id, pagination.currentPage, pagination.limit]);

    const fetchUserData = useCallback(async () => {
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setUserData,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch user data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);


    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const openAddModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    return (
        <>

            <AddFund
                show={show}
                handleClose={() => setShow(false)}
            />
            <AddReFund
                show={showModal}
                onHide={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
            />
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Wallet Detail</h6>
                    </div>
                </div>
                {loading1 ? (
                    <div className='normalloading'>
                        <img src={img1} alt="" />
                    </div>
                ) : !Data?.data ? (
                    <div className='normalloading'>
                        <p>No data available.</p>
                    </div>
                ) : (
                    <>
                        <div className='userprofile-main'>
                            <div className='userprofile-profileimage'>
                                <img src={userData?.data?.data?.image} alt="" />
                            </div>
                            <div className='partnerprofile-main'>
                                <div className='partnerprofile-content'>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">User name</label>
                                        <input type="text"
                                            value={
                                                userData?.data?.data?.fullName?.trim() ||
                                                `${userData?.data?.data?.firstName || ''} ${userData?.data?.data?.lastName || ''}`.trim() ||
                                                ''
                                            }
                                            readOnly
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">User ID</label>
                                        <input type="text"
                                            value={userData?.data?.data?.userId || 'N/A'}
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">User Type</label>
                                        <input type="text"
                                            value={userData?.data?.data?.userType || 'N/A'}
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Email ID</label>
                                        <input type="text"
                                            value={userData?.data?.data?.email || 'N/A'}
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Phone number</label>
                                        <input type="text"
                                            value={userData?.data?.data?.phone || 'N/A'}
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Wallet balance</label>
                                        <input type="text"
                                            value={userData?.data?.data?.wallet || 'N/A'}
                                        />
                                    </div>
                                    {/* <div className='userprofile-content-inputes'>
                                        <label htmlFor="" style={{ visibility: "hidden" }}>Wallet balance</label>
                                        <button onClick={() => setShow(true)}>Add Fund <FaPlus /></button>
                                    </div> */}

                                </div>
                            </div>

                        </div>
                        <div className='wallet-details-container'>
                            <label htmlFor="">Wallet Transaction</label>
                            <div className='userbookings-container'>
                                {loading ? (
                                    <div className='normalloading'>
                                        <img src={img1} alt="" />
                                    </div>
                                ) :
                                    !Array.isArray(Data?.data) || Data?.data?.length === 0 ? (
                                        <div className='normalloading'>
                                            <p>No data available.</p>
                                        </div>
                                    ) : (
                                        Data?.data.map((i, index) => (
                                            <div className='userbookings-main' key={index}>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Recipient Name/ID</th>
                                                            <th>Date</th>
                                                            <th>Transaction Type</th>
                                                            <th>Amount</th>
                                                            <th>Refund Amount</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {i?.user?.fullName}/{i.user?.userId}
                                                            </td>
                                                            <td>{formatDate(i.date)}</td>
                                                            <td>{i.type}</td>
                                                            <td>{i.amount}</td>
                                                            <td>{i?.refundAmount || '---'}</td>
                                                            <td className='userlist5'>
                                                                <button
                                                                    onClick={() => openAddModal(i)}
                                                                    style={{ padding: "0.5rem" }}
                                                                    disabled={i?.isRefundAmount}
                                                                >
                                                                    Send Refund
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))
                                    )}
                            </div>
                        </div>
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            totalDocs={pagination.totalDocs}
                            onPageChange={(newPage) =>
                                setPagination((prev) => ({ ...prev, currentPage: newPage }))
                            }
                        />
                    </>
                )}
            </div>

        </>
    )
}

export default HOC(WalletDetail)