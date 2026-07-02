import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import PartnerProfile from './PartnerProfile';
import { useParams } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import img from '../../assest/loading1.gif'
import { formatDate, formatTimeWithAmPm } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';


const PartnerCreditBalance = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);


    const [userwalletData, setUserWalletData] = useState(null)
    const type = 'Credit'
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserwalletbyid(id, pagination.page, pagination.limit, type), {
            setResponse: setUserWalletData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [id, pagination.page, pagination.limit]);


    useEffect(() => {
        if (userwalletData?.pagination) {
            setPagination((prev) => ({
                ...prev,
                totalPages: userwalletData?.pagination?.totalPages,
                totalDocs: userwalletData?.pagination?.totalItems,
            }));
        }
    }, [userwalletData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <PartnerProfile active={"Credit Balance"} />
            <div className='userspayments'>
                <div className='userspayments-method-content'>
                    <div className='userprofile-content-inputes'>
                        <label htmlFor="">Total credit balance</label>
                        <input type="text" value={userwalletData?.totalEarnings} />
                    </div>
                </div>
                <div className='userlist2' style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                    <h6>Transactions</h6>
                </div>
                <div className='userbookings-container'>
                    {loading ? (
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                    ) :
                        !Array.isArray(userwalletData?.data) || userwalletData?.data?.length === 0 ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            userwalletData?.data?.map((i, index) => (
                                <div className='userbookings-main' key={index}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Spent on/ Recipient</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Transaction Type</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i?.user?.userId}</td>
                                                <td>{formatDate(i.date)}</td>
                                                <td>{formatTimeWithAmPm(i.date)}</td>
                                                <td>{i.type}</td>
                                                <td>
                                                    {i.amount}
                                                </td>
                                                <td
                                                    style={{
                                                        color: i.Status === 'success' ? '#3FB031' : '#E1B913',
                                                    }}
                                                >
                                                    {i.Status1}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        )}
                </div>
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalDocs={pagination.totalDocs}
                    onPageChange={(newPage) =>
                        setPagination((prev) => ({ ...prev, currentPage: newPage }))
                    }
                />
            </div>
        </>
    )
}

export default HOC(PartnerCreditBalance)