import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [mainCategoryData, setMainCategoryData] = useState([]);
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

  const mainCategoryOptions = useMemo(
    () => [
      { label: "All Main Categories", value: "" },
      ...(Array.isArray(mainCategoryData?.data)
        ? mainCategoryData.data.map((category) => ({
            label: category?.name || "Unnamed Category",
            value: category?._id,
          }))
        : []),
    ],
    [mainCategoryData]
  );

  const partnerHasMainCategory = useCallback(
    (partner) => {
      if (!selectedMainCategory) return true;

      const selectedCategory = mainCategoryOptions.find(
        (category) => category.value === selectedMainCategory
      );
      const assignedCategories =
        partner?.user?.serviceCategoryId ||
        partner?.serviceCategoryId ||
        partner?.user?.mainCategoryId ||
        partner?.mainCategoryId ||
        [];
      const categoryList = Array.isArray(assignedCategories)
        ? assignedCategories
        : [assignedCategories];

      return categoryList.some((category) => {
        const categoryId =
          typeof category === "object"
            ? category?._id || category?.mainCategoryId?._id || category?.mainCategoryId
            : category;
        const categoryName =
          typeof category === "object"
            ? category?.name || category?.mainCategoryId?.name
            : "";

        return (
          categoryId === selectedMainCategory ||
          (selectedCategory?.label && categoryName === selectedCategory.label)
        );
      });
    },
    [mainCategoryOptions, selectedMainCategory]
  );

  const fetchData = useCallback(async () => {
    setPartnerData([]);
    setLoading(true);

    try {
      if (!selectedMainCategory) {
        const response = await getApi(
          endPoints.getallPartner(
            pagination.page,
            pagination.limit,
            searchQuery,
            selectedFilter
          ),
          { errorMsg: "Failed to fetch partner data!" }
        );
        setPartnerData(response);
        return;
      }

      const allPartners = [];
      let page = 1;
      let totalPages = 1;

      do {
        const response = await getApi(
          endPoints.getallPartner(page, 100, searchQuery, selectedFilter),
          { errorMsg: "Failed to fetch partner data!" }
        );
        allPartners.push(...(Array.isArray(response?.data) ? response.data : []));
        totalPages = Math.max(1, Number(response?.pagination?.totalPages) || 1);
        page += 1;
      } while (page <= totalPages);

      const filteredPartners = allPartners.filter(partnerHasMainCategory);
      const startIndex = (pagination.page - 1) * pagination.limit;
      const pagePartners = filteredPartners.slice(
        startIndex,
        startIndex + pagination.limit
      );
      const filteredTotalPages = Math.max(
        1,
        Math.ceil(filteredPartners.length / pagination.limit)
      );

      setPartnerData({
        data: pagePartners,
        pagination: {
          page: pagination.page,
          totalPages: filteredTotalPages,
          totalDocs: filteredPartners.length,
          hasPrevPage: pagination.page > 1,
          hasNextPage: pagination.page < filteredTotalPages,
        },
      });
    } catch (_) {
      // The shared API helper displays the request error.
    } finally {
      setLoading(false);
    }
  }, [
    pagination.page,
    pagination.limit,
    searchQuery,
    selectedFilter,
    selectedMainCategory,
    partnerHasMainCategory,
  ]);

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        await getApi(endPoints.getallMaincategory, {
          setResponse: setMainCategoryData,
          errorMsg: "Failed to fetch main categories!",
        });
      } catch (_) {
        // The shared API helper displays the request error.
      }
    };

    fetchMainCategories();
  }, []);

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
            <FilterDropdown
              filters={mainCategoryOptions}
              selectedFilter={
                mainCategoryOptions.find(
                  (category) => category.value === selectedMainCategory
                )?.label || "All Main Categories"
              }
              onFilterSelect={(category) => {
                setSelectedMainCategory(category?.value || "");
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              resetLabel="All Main Categories"
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
