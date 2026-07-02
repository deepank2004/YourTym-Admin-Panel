import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { AdminDetailsModal, DeleteConfirmation } from '../../components/Modals/Modals';


import { IoSearch } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import FilterDropdown from '../../components/Filter Dropdown/FilterDropdown';
import endPoints from '../../Repository/apiConfig';
import { deleteApi, getApi, putApi } from '../../Repository/Api';

import img from '../../assest/loading1.gif'

const SubAdmin = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);


    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchData = useCallback(async () => {
        setUserData([])
        await getApi(endPoints.getallSubAdmin(pagination.page, pagination.limit, searchQuery, selectedFilter), {
            setResponse: setUserData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [pagination.page, pagination.limit, searchQuery, selectedFilter]);

    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: userData?.pagination?.totalPages,
            hasPrevPage: userData?.pagination?.hasPrevPage,
            hasNextPage: userData?.pagination?.hasNextPage,
        }));
    }, [userData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDeleteClick = (categoryId) => {
        setItemToDelete(categoryId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async (userId) => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deleteuser(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: "Admin deleted successfully!",
            errorMsg: "Failed to delete admin!",
            additionalFunctions: [fetchData],
        });
        setShowDeleteModal(false);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === "") {
            setSearchQuery("");
            setPagination((prev) => ({ ...prev, page: 1 }));
        }
    };


    const handleSearch = () => {
        setSearchQuery(search);
        setPagination((prev) => ({ ...prev, page: 1 }));
    };



    const filters = [
        { label: "All", value: "" },
        { label: "Approved", value: "Approved" },
        { label: "Pending", value: "Pending" },
        { label: "Blocked", value: "Reject" },
    ];



    const openModal = (item) => {
        setSelectedItem(item);
        setShow(true);
    };

    const handleUpdate = async (userId, currentStatus) => {
        const newStatus = currentStatus === "Approved" ? "Reject" : "Approved"; // Toggle status

        const payload = {
            status: newStatus,
        };

        await putApi(endPoints.updateUserStatus(userId), payload, {
            successMsg: `Admin ${newStatus === "Approved" ? "Un-Blocked" : "Blocked"} successfully!`,
            errorMsg: "Failed to update user status!",
        });

        fetchData();
    };


    return (
        <>
            <AdminDetailsModal
                show={show}
                onHide={() => setShow(false)}
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
                        <h6>Sub Admin</h6>
                    </div>
                    <div className='userlist3'>
                        <div className="search-container">
                            <div className="userlist4">
                                <IoSearch className="search-icon" />
                                <input
                                    type="search"
                                    placeholder="Search by name or ID"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <button className="search-button" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                        <FilterDropdown
                            filters={filters}
                            selectedFilter={filters.find((f) => f.value === selectedFilter)?.label || "Choose Filter"}
                            onFilterSelect={(filter) => {
                                setSelectedFilter(filter?.value || "");
                                setPagination((prev) => ({ ...prev, page: 1 }));
                            }}
                            resetLabel="Reset Filter"
                        />

                        <div className='userlist5'>
                            <button onClick={() => navigate('/subadmin/add-subadmin')}>Add new</button>
                        </div>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sub Admin ID</th>
                                    <th>Name</th>
                                    <th>Email ID</th>
                                    <th>Registered Date</th>
                                    <th>View Details</th>
                                    <th>Status</th>
                                    <th>Add Permission</th>
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
                                    (!userData?.data || userData?.data.length === 0) ? (
                                        <tr>
                                            <td colSpan="8" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                    ) :
                                        userData?.data?.map((user, index) => (
                                            <tr key={index}>
                                                <td>#{user?.user?.userId}</td>
                                                <td>{user?.user?.fullName}</td>
                                                <td>{user?.user?.email}</td>
                                                <td>{user.memberSince}</td>
                                                <td>
                                                    <LuEye
                                                        color="#000000"
                                                        size={20}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => openModal(user)}
                                                    />
                                                </td>
                                                <td>{user?.user?.status === "Reject" ? "Blocked" : user?.user?.status}</td>
                                                <td>
                                                    <div className='userlist5'>
                                                        <Link to={`/subadmin/permission/${user?.user?._id}`}>
                                                            <button>Add</button>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className='div-icons'>
                                                    <FaEdit onClick={() => navigate(`/subadmin/edit/${user?.user?._id}`)} />
                                                    <MdDelete onClick={() => handleDeleteClick(user?.user?._id)} />
                                                    <MdBlock
                                                        onClick={() => handleUpdate(user?._id, user?.user?.status)}
                                                        color={user?.user?.status === "Approved" ? "green" : user?.user?.status === "Reject" ? "red" : ""}
                                                        size={25}
                                                        style={{ cursor: "pointer" }}
                                                    />
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

export default HOC(SubAdmin)