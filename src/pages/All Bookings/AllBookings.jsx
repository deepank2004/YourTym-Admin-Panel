import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link } from "react-router-dom";
import FilterDropdown from "../../components/Filter Dropdown/FilterDropdown";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { formatDate } from "../../utils/utils";
import { LuEye } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import "react-calendar/dist/Calendar.css";
import { FaCalendarDays } from "react-icons/fa6";
import img from "../../assest/loading1.gif";
import { CalendarView } from "../../components/Modals/Modals";
import Pagination from "../../components/Pagination/Pagination";

const AllBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedFilter1, setSelectedFilter1] = useState("");
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
    setBookingData([]);
    const [startDate, endDate] = dateRange;

    await getApi(
      endPoints.getallBookings(
        pagination.page,
        pagination.limit,
        searchQuery,
        selectedFilter,
        selectedFilter1,
        startDate,
        endDate
      ),
      {
        setResponse: setBookingData,
        setLoading: setLoading,
        errorMsg: "Failed to fetch booking data!",
      }
    );
  }, [
    pagination.page,
    pagination.limit,
    searchQuery,
    selectedFilter,
    selectedFilter1,
    dateRange,
  ]);

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

  const handleDateChange = (dates) => {
    setDateRange(dates);
    setPagination((prev) => ({ ...prev, page: 1 }));
    setShowModal(false);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const filters = [
    { label: "All Bookings", value: "" },
    { label: "Last 7 days", value: "last7Days" },
    { label: "Last 30 days", value: "last30Days" },
    { label: "Last 6 months", value: "last6Months" },
    { label: "Last 12 months", value: "last12Months" },
  ];

  const Statusfilters = [
    { label: "All Bookings", value: "" },
    { label: "Completed", value: "Complete" },
    { label: "Pending", value: "Pending" },
    { label: "Assigned", value: "Assigned" },
    { label: "Confirmed", value: "Confirmed" },
    { label: "On The Way", value: "OnTheWay" },
    { label: "Arrived", value: "Arrived" },
    { label: "Pause", value: "Pause" },
    { label: "Resume", value: "Resume" },
    { label: "Review", value: "Review" },
    { label: "Cancel", value: "Cancel" },
  ];

  return (
    <>
      <CalendarView
        show={showModal}
        onHide={() => setShowModal(false)}
        onSelectDate={handleDateChange}
        dateRange={dateRange}
      />
      <div className="userlistcontainer">
        <div className="userlist1">
          <div className="userlist2">
            <h6>All Bookings</h6>
          </div>
          <div className="userlist3">
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

            <div className="filter-dropdown" style={{ display: "flex" }}>
              <button
                className="filter-button"
                onClick={() => setShowModal(true)}
              >
                {dateRange[0] && dateRange[1]
                  ? `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`
                  : "Select Date"}
                <span className="dropdown-arrow">
                  <FaCalendarDays color="#000000" size={20} />
                </span>
              </button>

              {dateRange[0] && dateRange[1] && (
                <button
                  className="clear-button"
                  onClick={() => {
                    setDateRange([null, null]);
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <FilterDropdown
              filters={Statusfilters}
              selectedFilter={
                Statusfilters.find((f) => f.value === selectedFilter1)?.label ||
                "Choose Filter"
              }
              onFilterSelect={(filter) => {
                setSelectedFilter1(filter.value || "");
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              resetLabel="Reset Filter"
            />

            <FilterDropdown
              filters={filters}
              selectedFilter={
                filters.find((f) => f.value === selectedFilter)?.label ||
                "Choose Filter"
              }
              onFilterSelect={(filter) => {
                setSelectedFilter(filter.value || "");
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              resetLabel="Reset Filter"
            />
          </div>
        </div>

        <div className="userlist6">
          <div className="bottomdashboard3">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Assigned to</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="tableloading">
                      <img src={img} alt="Loading" />
                    </td>
                  </tr>
                ) : bookingData?.data?.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="tableloading">
                      <p>No data available.</p>
                    </td>
                  </tr>
                ) : (
                  bookingData?.data?.map((order, index) => (
                    <tr key={index}>
                      <td>#{order?.orderId}</td>
                      <td>
                        {order?.userId?.fullName?.trim() ||
                          `${order?.userId?.firstName || ""} ${
                            order?.userId?.lastName || ""
                          }` ||
                          "N/A"}
                      </td>
                      <td>{order.services?.[0]?.serviceId?.title || "N/A"}</td>
                      <td>
                        {order.services?.[0]?.serviceId?.categoryId?.name ||
                          "N/A"}
                      </td>
                      <td>{formatDate(order.Date)}</td>
                      <td>{order.startTime + " to " + order.endTime || "-"}</td>
                      <td>
                        {order.partnerId?.fullName?.trim() ||
                          `${order.partnerId?.firstName || ""} ${
                            order.partnerId?.lastName || ""
                          }` ||
                          "N/A"}
                      </td>
                      <td>₹{Math.round(order.paidAmount)}</td>
                      <td
                        style={{
                          color: ["Pending", "Cancel", "Unconfirmed"].includes(
                            order.status
                          )
                            ? "#B60B0B"
                            : ["Arrived", "OnTheWay", "Complete"].includes(
                                order.status
                              )
                            ? "#3FB031"
                            : "#F1C40F",
                        }}
                      >
                        {order.status}
                      </td>

                      <td className="div-icons">
                        <Link to={`/allbookings/booking-details/${order._id}`}>
                          <LuEye />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={bookingData?.pagination?.totalPages || 1}
        totalDocs={bookingData?.pagination?.totalDocs || 0}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default HOC(AllBookings);
