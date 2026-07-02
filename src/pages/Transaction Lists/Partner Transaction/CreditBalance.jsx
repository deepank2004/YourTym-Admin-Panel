import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../../components/HOC/HOC'
import { IoSearch } from "react-icons/io5";

import { Link } from 'react-router-dom';
import endPoints from '../../../Repository/apiConfig';
import { getApi } from '../../../Repository/Api';
import img from '../../../assest/loading1.gif'

import Modal from "react-bootstrap/Modal";
import { formatDate } from '../../../utils/utils';
import { CalendarView } from '../../../components/Modals/Modals';
import { FaCalendarDays } from 'react-icons/fa6';
import FilterDropdown from '../../../components/Filter Dropdown/FilterDropdown';
import Pagination from '../../../components/Pagination/Pagination';

const CreditBalance = () => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState(null);
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);


    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });


    const fetchData = useCallback(async () => {
        setData([]);
        const [startDate, endDate] = dateRange;

        await getApi(endPoints.getallBookings(
            pagination.page, pagination.limit, searchQuery, selectedFilter, startDate, endDate), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [pagination.page, pagination.limit, searchQuery, selectedFilter, dateRange]);

    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: Data?.pagination?.totalPages,
            hasPrevPage: Data?.pagination?.hasPrevPage,
            hasNextPage: Data?.pagination?.hasNextPage,
        }));
    }, [Data]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


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
        { label: "All Transaction", value: "" },
        { label: "Last 7 days", value: "last7Days" },
        { label: "Last 30 days", value: "last30Days" },
        { label: "Last 6 months", value: "last6Months" },
        { label: "Last 12 months", value: "last12Months" },
    ];



    const handleDateChange = (dates) => {
        setDateRange(dates);
        setShowModal(false); // Close modal after selection
        setPagination((prev) => ({ ...prev, page: 1 }));
    };


    return (
        <>
            <CalendarView
                show={showModal}
                onHide={() => setShowModal(false)}
                onSelectDate={handleDateChange}
                dateRange={dateRange}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Transaction Lists</h6>
                    </div>
                    <div className='userlist3'>
                        <div className="search-container">
                            <div className="userlist4">
                                <IoSearch className="search-icon" />
                                <input
                                    type="search"
                                    placeholder="Search by order ID"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <button className="search-button" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                        <div className="filter-dropdown" style={{ display: "flex" }}>
                            <button className="filter-button" onClick={() => setShowModal(true)}>
                                <span className="filter-icon"></span>
                                {dateRange[0] && dateRange[1]
                                    ? `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`
                                    : "Select Date"}
                                <span className="dropdown-arrow">
                                    <FaCalendarDays color="#000000" size={25} />
                                </span>
                            </button>

                            {dateRange[0] && dateRange[1] && (
                                <button className="clear-button" onClick={() => setDateRange([null, null])}>
                                    Clear
                                </button>
                            )}
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
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/transaction-lists/partner-transaction/subscription-transaction'} className='link'>
                        <div className='servicetnasction'>
                            <h6>Subscription Transaction</h6>
                        </div>
                    </Link>
                    <Link to={'/transaction-lists/partner-transaction/service-transaction'} className='link'>
                        <div className='servicetnasctionactive'>
                            <h6>Service Transaction</h6>
                        </div>
                    </Link>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Name</th>
                                    <th>Service</th>
                                    <th>Order ID</th>
                                    <th>Order Total</th>
                                    <th>Payment Method</th>
                                    <th>Partner Wallet</th>
                                    <th>Date</th>
                                    <th>Payment Status</th>
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
                                                <td>#{i?.transctionId?.transctionId}</td>
                                                <td>{i?.partnerId?.fullName}</td>
                                                <td>
                                                    {i?.services?.slice(0, 1).map((service) => (
                                                        <span key={service?.serviceId?._id}>
                                                            {service?.serviceId?.title}
                                                        </span>
                                                    ))}

                                                    {i?.services?.length > 0 && (
                                                        <li
                                                            style={{ color: "blue", cursor: "pointer" }}
                                                            onClick={() => setSelectedServices(i)}
                                                        >
                                                            View More
                                                        </li>
                                                    )}
                                                </td>
                                                <td>#{i?.orderId}</td>
                                                <td>₹{i?.paidAmount}</td>
                                                <td>{i?.transctionId?.paymentMode}</td>
                                                <td>₹{i?.partnerId?.wallet}</td>
                                                <td>{formatDate(i?.transctionId?.createdAt)}</td>
                                                <td
                                                    style={{
                                                        color: i.paymentStatus === 'success' ? '#3FB031'
                                                            : i.paymentStatus === 'Rescheduled'
                                                                ? '#E1B913'
                                                                : i.paymentStatus === 'Cancelled'
                                                                    ? '#B60B0B'
                                                                    : '#0023D3',
                                                    }}
                                                >
                                                    {i.paymentStatus}
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                            {selectedServices && (
                                <Modal show={!!selectedServices} size="lg" onHide={() => setSelectedServices(null)} centered>
                                    <Modal.Header closeButton className='adminprofileupdate'>
                                        <Modal.Title id="contained-modal-title-vcenter">All Services ({selectedServices?.services?.length})</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='viewuserlist'>
                                        <div className='bottomdashboard3'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        {/* <th>Order ID</th> */}
                                                        <th>Service Name</th>
                                                        <th>Main Category Name</th>
                                                        <th>Total Time</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Total Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedServices?.services?.length === 0 ?
                                                        <tr>
                                                            <td colSpan="10" className='tableloading'>
                                                                <p>No data available.</p>
                                                            </td>
                                                        </tr>
                                                        :
                                                        selectedServices?.services?.map((order, index) => (
                                                            <tr key={index}>
                                                                <td>{order?.serviceId?.title || "N/A"}</td>
                                                                <td>{order?.serviceId?.mainCategoryId.name || "N/A"}</td>
                                                                <td>{order?.serviceId?.totalTime || "N/A"}</td>
                                                                <td>{order?.quantity || "N/A"}</td>
                                                                <td>{order.price || 0}</td>
                                                                <td>{order.total || 0}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            )}
                        </table>
                    </div>
                </div>
            </div>
            <Pagination
                currentPage={Data?.pagination?.currentPage}
                totalPages={Data?.pagination?.totalPages}
                totalDocs={Data?.pagination?.totalDocs}
                onPageChange={(newPage) =>
                    setPagination((prev) => ({ ...prev, currentPage: newPage }))
                }
            />
        </>
    )
}

export default HOC(CreditBalance)