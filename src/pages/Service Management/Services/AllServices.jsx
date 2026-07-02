import React, { useEffect, useState } from 'react'
import HOC from '../../../components/HOC/HOC'
import { getApi, deleteApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';
import { DeleteConfirmation, ViewDescription } from '../../../components/Modals/Modals';
import { Link } from 'react-router-dom';


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";


import img from '../../../assest/loading1.gif'


const AllServices = () => {

    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchData = async () => {
        await getApi(endPoints.getAllservice, {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }


    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteClick = (categoryId) => {
        setItemToDelete(categoryId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deleteservice(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
        setShowDeleteModal(false);
    };

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


    console.log(Data?.data, "adla")


    return (
        <>
            <ViewDescription
                show={showModal}
                onHide={() => setShowModal(false)}
                data={selectedItem}
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
                        <h6>All Service</h6>
                    </div>
                    <Link to={`/service-management/all-services/add`}>
                        <div className='userlist5'>
                            <button>Add</button>
                        </div>
                    </Link>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Main Category</th>
                                    <th>Category</th>
                                    <th>Description</th>
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
                                    !Array.isArray(Data?.data) || Data?.data?.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        Data?.data?.map((i, index) => (
                                            <tr key={index}>
                                                <td>#{index + 1}</td>
                                                <td>{i?.title}</td>
                                                <td><img src={i?.images?.[0]?.img} alt="" style={{ width: "100px", height: '50px' }} /></td>
                                                <td>{i?.mainCategoryId?.name}</td>
                                                <td>{i?.categoryId?.name}</td>
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
                                                <td>{i?.status ? "Active" : "InActive"}</td>
                                                <td className='div-icons'>
                                                    <Link to={`/service-management/all-services/view/${i?._id}`}>
                                                        <IoEye />
                                                    </Link>
                                                    <Link to={`/service-management/all-services/edit/${i?._id}`}>
                                                        <FaEdit />
                                                    </Link>
                                                    <MdDelete onClick={() => handleDeleteClick(i._id)} />
                                                </td>
                                            </tr>
                                        )))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(AllServices)