import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link, useNavigate } from "react-router-dom";
import endPoints from "../../Repository/apiConfig";
import { deleteApi, getApi } from "../../Repository/Api";

import { LuEye } from "react-icons/lu";
import img from "../../assest/loading1.gif";
import {
  DeleteConfirmation,
  ViewDescription,
} from "../../components/Modals/Modals";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MonthlySubscription = () => {
  const navigate = useNavigate();

  // State
  const [activeTab, setActiveTab] = useState("subscription"); // "subscription" | "exam"
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // API Fetch Logic (based on active tab)
  const fetchData = useCallback(async () => {
    const endpoint =
      activeTab === "subscription"
        ? endPoints.getallSubscription
        : endPoints.getExamPlan; // New endpoint for exam plan

    await getApi(endpoint, {
      setResponse: setData,
      setLoading,
      errorMsg: "Failed to fetch data!",
    });
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData, activeTab]);

  // Delete Handler
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    const endpoint =
      activeTab === "subscription"
        ? endPoints.deleteplan(itemToDelete)
        : endPoints.deleteExamPlan(itemToDelete);

    await deleteApi(endpoint, {
      setLoading: setDeleteLoading,
      successMsg: "Plan deleted successfully!",
      errorMsg: "Failed to delete plan!",
    });

    fetchData();
    setShowDeleteModal(false);
  };

  // Description Modal
  const openDescriptionModal = (data) => {
    setSelectedItem(data);
    setShowModal(true);
  };

  const truncateText = (htmlString, maxLength) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const textContent = tempElement.textContent || tempElement.innerText || "";
    return textContent.length > maxLength
      ? `${textContent.slice(0, maxLength)}...`
      : textContent;
  };

  return (
    <>
      {/* Description Modal */}
      <ViewDescription
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selectedItem}
      />

      {/* Delete Modal */}
      <DeleteConfirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />

      <div className="userlistcontainer">
        {/* Header Section */}
        <div className="userlist1">
          <div className="userlist2">
            <h6>
              {activeTab === "subscription"
                ? "Subscription Plans"
                : "Exam Plans"}
            </h6>
          </div>

          <div className="userlist3">
            <div className="userlist5">
              <button
                onClick={() =>
                  navigate(
                    activeTab === "subscription"
                      ? "/monthlysubscription/add-plan"
                      : "/monthlysubscription/add-plan"
                  )
                }
              >
                Add {activeTab === "subscription" ? "Subscription" : "Exam"}{" "}
                Plan
              </button>
            </div>
          </div>
        </div>

        <div
          className="tabs-container"
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "12px",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={() => setActiveTab("subscription")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s ease",
              border:
                activeTab === "subscription"
                  ? "2px solid #ff7b00"
                  : "2px solid #ddd",
              color: activeTab === "subscription" ? "#ff7b00" : "#555",
              backgroundColor:
                activeTab === "subscription" ? "#fff5eb" : "#ffffff",
            }}
          >
            Subscription Plans
          </button>

          <button
            onClick={() => setActiveTab("exam")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s ease",
              border:
                activeTab === "exam" ? "2px solid #ff7b00" : "2px solid #ddd",
              color: activeTab === "exam" ? "#ff7b00" : "#555",
              backgroundColor: activeTab === "exam" ? "#fff5eb" : "#ffffff",
            }}
          >
            Exam Plans
          </button>
        </div>

        {/* Table Section */}
        <div className="userlist6">
          <div className="bottomdashboard3">
            <table>
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Total Subscribed</th>
                  <th>View List</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="tableloading">
                      <img src={img} alt="Loading..." />
                    </td>
                  </tr>
                ) : data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="tableloading">
                      <p>No data available.</p>
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((plan, index) => (
                    <tr key={index}>
                      <td>
                        {activeTab === "subscription" ? plan.name : plan.title}
                      </td>
                      <td>{plan.price?.toFixed(2)}</td>
                      <td>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: truncateText(plan?.description, 15),
                          }}
                        />
                        {plan?.description?.replace(/<\/?[^>]+(>|$)/g, "")
                          ?.length > 15 && (
                          <button
                            onClick={() =>
                              openDescriptionModal(plan?.description)
                            }
                            style={{
                              color: "blue",
                              textDecoration: "underline",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            Show More
                          </button>
                        )}
                      </td>

                      <td>{plan.type || "-"}</td>
                      <td>{plan.userCount || 0}</td>

                      <td>
                        <Link
                          to={`/monthlysubscription/plan-details/${plan?._id}`}
                          className="link"
                        >
                          <LuEye
                            color="#000000"
                            size={20}
                            style={{ cursor: "pointer" }}
                          />
                        </Link>
                      </td>

                      <td className="div-icons">
                        {/* 👇 Hide edit button if activeTab === 'exam' */}
                        {activeTab === "subscription" && (
                          <Link
                            to={`/monthlysubscription/edit-plan/${plan?._id}`}
                          >
                            <FaEdit />
                          </Link>
                        )}
                        <MdDelete
                          onClick={() => handleDeleteClick(plan?._id)}
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

      {/* Optional inline styles for clarity (can move to CSS file) */}
      <style>
        {`
          .tabs-container {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
          }
          .tabs-container button {
            padding: 8px 16px;
            border: 1px solid #ccc;
            background: #f7f7f7;
            cursor: pointer;
            border-radius: 6px;
            font-weight: 500;
          }
          .active-tab {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
          }
          .inactive-tab:hover {
            background-color: #e6e6e6;
          }
        `}
      </style>
    </>
  );
};

export default HOC(MonthlySubscription);
