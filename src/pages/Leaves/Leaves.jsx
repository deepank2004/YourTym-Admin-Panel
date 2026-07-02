import React, { useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { ViewDescription } from '../../components/Modals/Modals';

import { getApi, putApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import img from '../../assest/loading1.gif'


import { IoCloseCircle } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { formatDate } from '../../utils/utils';




const Leaves = () => {

    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const fetchData = async () => {
        await getApi(endPoints.getleaves, {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }



    const handleApprovedleave = async (id) => {

        await putApi(endPoints.updateleaves(id), {
            setLoading,
            successMsg: "Leave approved successfully!",
            errorMsg: "Failed to approved leave!",
        });
        fetchData();
    };

    const handleCancelledLeave = async (id) => {

        await putApi(endPoints.updateleaves1(id), {
            setLoading,
            successMsg: "Leave cancel successfully!",
            errorMsg: "Failed to cancel leave!",
        });
        fetchData();
    };









    const openDescriptionModal = (data) => {
        setSelectedItem(data);
        setShowModal1(true)
    };


    // Initial Data Fetch
    useEffect(() => {
        fetchData();
    }, []);


    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.slice(0, maxLength)}...`;
        }
        return text;
    };

    return (
        <>
            <ViewDescription
                show={showModal1}
                onHide={() => setShowModal1(false)}
                data={selectedItem}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>All Leaves</h6>
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
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Leave Type</th>
                                    <th>Reason</th>
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
                                                <td>
                                                    {i?.userId?.fullName?.trim()
                                                        || (i?.userId?.firstName && i?.userId?.lastName
                                                            ? `${i?.userId?.firstName} ${i?.userId?.lastName}`
                                                            : 'N/A')}
                                                </td>
                                                <td>{i.userId?.phone || 'N/A'}</td>
                                                <td>{i?.userId?.email || 'N/A'}</td>
                                                <td>{formatDate(i?.startDate)}</td>
                                                <td>{formatDate(i?.endDate)}</td>
                                                <td>{i?.leaveType}</td>
                                                <td>
                                                    {truncateText(i.reason, 15)}{' '}
                                                    {i.reason?.length > 100 && (
                                                        <button
                                                            onClick={() => openDescriptionModal(i.reason)}
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
                                                <td>{i?.status}</td>
                                                <td className='div-icons'>
                                                    <IoCheckmarkCircle onClick={() => handleApprovedleave(i?._id)} />
                                                    <IoCloseCircle onClick={() => handleCancelledLeave(i?._id)} />
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

export default HOC(Leaves)