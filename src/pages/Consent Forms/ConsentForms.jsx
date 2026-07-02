import React, { useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'

import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import img from '../../assest/loading1.gif'


import { formatDate } from '../../utils/utils';
import { ViewDescription } from '../../components/Modals/Modals';




const ConsentForms = () => {

    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const fetchData = async () => {
        await getApi(endPoints.getConsentForms, {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }

    useEffect(() => {
        fetchData();
    }, []);


    const openDescriptionModal = (data) => {
        setSelectedItem(data);
        setShowModal(true)
    };


    const truncateText = (htmlString, maxLength) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlString;
        const textContent = tempElement.textContent || tempElement.innerText || "";

        return textContent.length > maxLength ? `${textContent.slice(0, maxLength)}...` : textContent;
    };

    return (
        <>
            <ViewDescription
                show={showModal}
                onHide={() => setShowModal(false)}
                data={selectedItem}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>All Consent Forms</h6>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
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
                                                <td>{i?.title}</td>
                                                <td>
                                                    <span dangerouslySetInnerHTML={{ __html: truncateText(i?.description, 15) }} />{' '}
                                                    {i?.description?.replace(/<\/?[^>]+(>|$)/g, "").length > 15 && (
                                                        <button
                                                            onClick={() => openDescriptionModal(i.description)}
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
                                                <td>{formatDate(i.createdAt)}</td>
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

export default HOC(ConsentForms)