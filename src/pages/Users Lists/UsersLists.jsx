import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import FilterDropdown from "../../components/Filter Dropdown/FilterDropdown";
import { deleteApi, getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

import img from "../../assest/loading1.gif";

import Pagination from "../../components/Pagination/Pagination";
import { DeleteConfirmation } from "../../components/Modals/Modals";

const UsersLists = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [pagination, setPagination] = useState({
    limit: 10,
    totalPages: 1,
    currentPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const setLoading1 = null;

  const fetchData = useCallback(async () => {
    setUserData([]);
    await getApi(
      endPoints.getallUser(
        pagination.currentPage,
        pagination.limit,
        searchQuery,
        selectedFilter
      ),
      {
        setResponse: setUserData,
        setLoading: setLoading,
        errorMsg: "Failed to fetch user data!",
      }
    );
  }, [pagination.currentPage, pagination.limit, searchQuery, selectedFilter]);

  useEffect(() => {
    if (userData?.pagination) {
      setPagination((prev) => ({
        ...prev,
        totalPages: userData.pagination.totalPages || 1,
        hasPrevPage: userData.pagination.hasPrevPage || false,
        hasNextPage: userData.pagination.hasNextPage || false,
      }));
    }
  }, [userData]);

  const handleDeleteClick = (categoryId) => {
    setItemToDelete(categoryId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await deleteApi(endPoints.deleteuser(itemToDelete), {
      setLoading: setDeleteLoading,
      successMsg: "User deleted successfully!",
      errorMsg: "Failed to delete user!",
      additionalFunctions: [fetchData()],
    });
    setShowDeleteModal(false);
  };

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

  const filters = [
    { label: "All User", value: "" },
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
            <h6>Users Lists</h6>
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
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Phone No.</th>
                  <th>Address</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th>Block User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="tableloading">
                      <img src={img} alt="" />
                    </td>
                  </tr>
                ) : !userData?.data || userData?.data.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="tableloading">
                      <p>No data available.</p>
                    </td>
                  </tr>
                ) : (
                  userData?.data?.map((user, index) => (
                    <tr key={index}>
                      <td>#{user?.user?.userId}</td>
                      <td>
                        {user?.user?.fullName?.trim() ||
                          (user?.user?.firstName && user?.user?.lastName
                            ? `${user?.user?.firstName} ${user?.user?.lastName}`
                            : "N/A")}
                      </td>
                      <td>{user?.user?.email || "N/A"}</td>
                      <td>{user?.user?.phone || "N/A"}</td>
                      <td>{user?.user?.address1 || "N/A"}</td>
                      <td>{user?.memberSince}</td>
                      <td>
                        {user?.user?.status === "Reject"
                          ? "Blocked"
                          : user?.user?.status}
                      </td>
                      <td>
                        <div className="userlist7">
                          <label className="switch">
                            <input
                              type="checkbox"
                              id="schedule-toggle"
                              checked={user?.user?.status !== "Approved"}
                              onChange={() =>
                                handleToggle(user?._id, user?.user?.status)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </td>
                      <td className="div-icons">
                        <Link
                          to={`/userslists/user-profile/bookings/${user._id}`}
                        >
                          <LuEye />
                        </Link>
                        <MdDelete
                          onClick={() => handleDeleteClick(user?._id)}
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
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalDocs={userData?.pagination?.totalDocs}
        onPageChange={(newPage) =>
          setPagination((prev) => ({ ...prev, currentPage: newPage }))
        }
      />
    </>
  );
};

export default HOC(UsersLists);
