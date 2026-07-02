import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link } from "react-router-dom";

import { IoSearch } from "react-icons/io5";
import { deleteApi, getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

import img from "../../assest/loading1.gif";
import FilterDropdown from "../../components/Filter Dropdown/FilterDropdown";
import Pagination from "../../components/Pagination/Pagination";
import { DeleteConfirmation } from "../../components/Modals/Modals";

const PartnerLists = () => {
  const [partnerdata, setPartnerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const setLoading1 = false;
  const [pagination, setPagination] = useState({
    limit: 10,
    totalPages: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchData = useCallback(async () => {
    setPartnerData([]);
    await getApi(
      endPoints.getallPartner(
        pagination.page,
        pagination.limit,
        searchQuery,
        selectedFilter
      ),
      {
        setResponse: setPartnerData,
        setLoading: setLoading,
        errorMsg: "Failed to fetch partner data!",
      }
    );
  }, [pagination.page, pagination.limit, searchQuery, selectedFilter]);

  useEffect(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      totalPages: partnerdata?.pagination?.totalPages,
      hasPrevPage: partnerdata?.pagination?.hasPrevPage,
      hasNextPage: partnerdata?.pagination?.hasNextPage,
    }));
  }, [partnerdata]);

  const handleDeleteClick = (categoryId) => {
    setItemToDelete(categoryId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await deleteApi(endPoints.deleteuser(itemToDelete), {
      setLoading: setDeleteLoading,
      successMsg: "Partner deleted successfully!",
      errorMsg: "Failed to delete partner!",
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggle = async (userId, currentStatus) => {
    let newStatus;

    if (currentStatus === "Pending") {
      newStatus = "Approved";
    } else {
      newStatus = currentStatus === "Approved" ? "Reject" : "Approved";
    }

    const payload = {
      status: newStatus,
    };

    await putApi(endPoints.updateUserStatus(userId), payload, {
      setLoading: setLoading1,
      successMsg: `User ${
        newStatus === "Approved" ? "Un-Blocked" : "Blocked"
      } successfully!`,
      errorMsg: "Failed to update user status!",
    });

    fetchData();
  };

  const filters = [
    { label: "All Partner", value: "" },
    { label: "Pending Users", value: "Pending" },
    { label: "Blocked Users", value: "Reject" },
  ];

  return (
    <>
      <DeleteConfirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
      <div className="userlistcontainer">
        <div className="userlist1">
          <div className="userlist2">
            <h6>Partner Lists</h6>
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
            <FilterDropdown
              filters={filters}
              selectedFilter={
                filters.find((f) => f.value === selectedFilter)?.label ||
                "Choose Filter"
              }
              onFilterSelect={(filter) => {
                setSelectedFilter(filter?.value || "");
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              resetLabel="Reset Filter"
            />
            {/* <div className='userlist5'>
                            <button>Export</button>
                        </div> */}
          </div>
        </div>
        <div className="userlist6">
          <div className="bottomdashboard3">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Phone No.</th>
                  <th>Department</th>
                  <th>City</th>
                  <th>Status</th>
                  {/* <th>Jobs Completed</th>
                                    <th>Jobs Cancelled</th>
                                    <th>Rating</th> */}
                  {/* <th>Subscription</th> */}
                  <th>Block Partner</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="12" className="tableloading">
                      <img src={img} alt="" />
                    </td>
                  </tr>
                ) : !partnerdata?.data || partnerdata?.data.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="tableloading">
                      <p>No data available.</p>
                    </td>
                  </tr>
                ) : (
                  partnerdata?.data?.map((partner, index) => (
                    <tr key={index}>
                      <td>#{partner?.user?._id}</td>
                      <td>
                        {partner?.user?.fullName?.trim() ||
                          (partner?.user?.firstName && partner?.user?.lastName
                            ? `${partner?.user?.firstName} ${partner?.user?.lastName}`
                            : "N/A")}
                      </td>
                      <td>{partner?.user?.email || "N/A"}</td>
                      <td>{partner?.user?.phone || "N/A"}</td>
                      <td>{partner?.user?.department || "N/A"}</td>
                      <td>{partner?.user?.city?.name || "N/A"}</td>
                      <td>
                        {partner?.user?.status === "Reject"
                          ? "Blocked"
                          : partner?.user?.status}
                      </td>
                      {/* <td>{partner?.completedBookings}</td>
                                                <td>{partner?.canceledBookings}</td>
                                                <td>{partner?.user?.averageRating}</td> */}
                      {/* <td>{partner?.user?.subscriptionId?.name}</td> */}
                      <td>
                        <div className="userlist7">
                          <label className="switch">
                            <input
                              type="checkbox"
                              id="schedule-toggle"
                              checked={partner?.user?.status !== "Approved"}
                              onChange={() =>
                                handleToggle(
                                  partner?._id,
                                  partner?.user?.status
                                )
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </td>
                      <td className="div-icons">
                        <Link
                          to={`/partnerlists/partner-profile/payment/${partner._id}`}
                        >
                          <LuEye />
                        </Link>
                        <MdDelete
                          onClick={() => handleDeleteClick(partner?._id)}
                        />
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
        currentPage={pagination.page} // Use `pagination.page`, NOT `partnerdata.pagination.currentPage`
        totalPages={pagination.totalPages}
        totalDocs={partnerdata?.pagination?.totalDocs}
        onPageChange={(newPage) =>
          setPagination((prev) => ({ ...prev, page: newPage }))
        }
      />
    </>
  );
};

export default HOC(PartnerLists);
