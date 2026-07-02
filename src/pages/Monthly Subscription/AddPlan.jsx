import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import endPoints from "../../Repository/apiConfig";
import { postApi, getApi } from "../../Repository/Api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddPlan = () => {
  const navigate = useNavigate();

  // 🟠 Shared States
  const [activeTab, setActiveTab] = useState("subscription");
  const [loading, setLoading] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");

  // 🟣 Subscription Plan States
  const [subName, setSubName] = useState("");
  const [subType, setSubType] = useState("");
  const [subPrice, setSubPrice] = useState("");
  const [subDescription, setSubDescription] = useState("");

  // 🟢 Exam Plan States
  const [examTitle, setExamTitle] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examPrice, setExamPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  // 🧭 Fetch Main Categories
  const fetchMainCategories = async () => {
    await getApi(endPoints.getallMaincategory, {
      setResponse: (res) => setMainCategories(res?.data || []),
      setLoading,
      errorMsg: "Failed to fetch main categories!",
    });
  };

  useEffect(() => {
    fetchMainCategories();
  }, []);

  // 🧩 Handle Submit
  const handleSubmit = async () => {
    if (!selectedMainCategory) {
      alert("Please select a main category!");
      return;
    }

    let payload = {};
    let endpoint = "";

    if (activeTab === "subscription") {
      if (!subName || !subType || !subPrice || !subDescription) {
        alert("Please fill all required subscription fields!");
        return;
      }

      payload = {
        mainCategoryId: selectedMainCategory,
        name: subName,
        type: subType,
        price: Number(subPrice),
        description: subDescription,
      };
      endpoint = endPoints.addSubscription;
    } else {
      if (!examTitle || !examDescription || !examPrice) {
        alert("Please fill all required exam plan fields!");
        return;
      }

      payload = {
        mainCategoryId: selectedMainCategory,
        title: examTitle,
        description: examDescription,
        price: Number(examPrice),
        isActive: isActive,
      };
      endpoint = endPoints.addExamPlan;
    }

    await postApi(endpoint, payload, {
      setLoading,
      successMsg:
        activeTab === "subscription"
          ? "Subscription plan added successfully!"
          : "Exam plan added successfully!",
      errorMsg: "Failed to add plan!",
    });

    navigate("/monthlysubscription");
  };

  // Quill Toolbar Options
  const fullToolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["clean"],
  ];

  return (
    <>
      <div className="userprofilecontainer">
        <div className="partnerprofile-container">
          <div className="userprofile-header">
            <LiaArrowLeftSolid
              color="#000000"
              size={25}
              onClick={() => navigate(-1)}
            />
            <h6>Add Plan</h6>
          </div>
          <div className="addserivce-btn">
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* 🔶 Tabs for Subscription / Exam */}
        <div
          className="tabs-container"
          style={{
            marginTop: "15px",
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setActiveTab("subscription")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              border:
                activeTab === "subscription"
                  ? "2px solid #ff7b00"
                  : "2px solid #ddd",
              color: activeTab === "subscription" ? "#ff7b00" : "#555",
              backgroundColor:
                activeTab === "subscription" ? "#fff5eb" : "#ffffff",
            }}
          >
            Subscription Plan
          </button>
          <button
            onClick={() => setActiveTab("exam")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              border:
                activeTab === "exam" ? "2px solid #ff7b00" : "2px solid #ddd",
              color: activeTab === "exam" ? "#ff7b00" : "#555",
              backgroundColor: activeTab === "exam" ? "#fff5eb" : "#ffffff",
            }}
          >
            Exam Plan
          </button>
        </div>

        {/* 🔸 Shared Field */}
        <div className="addsubcategory-left-div" style={{ marginTop: "1rem" }}>
          <div className="addservice-left-div">
            <label>Main Category</label>
            <select
              value={selectedMainCategory}
              onChange={(e) => setSelectedMainCategory(e.target.value)}
            >
              <option value="">Choose Main Category</option>
              {mainCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 🟠 Subscription Plan Form */}
          {activeTab === "subscription" && (
            <>
              <div className="addservice-left-div">
                <label>Subscription Plan Name</label>
                <input
                  type="text"
                  placeholder="Enter plan name"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                />
              </div>

              <div className="addservice-left-div">
                <label>Price ($)</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={subPrice}
                  onChange={(e) => setSubPrice(e.target.value)}
                />
              </div>

              <div className="addservice-left-div">
                <label>Plan Duration</label>
                <select
                  value={subType}
                  onChange={(e) => setSubType(e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="Week">Week</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div className="addservice-left-div">
                <label>Description</label>
                <ReactQuill
                  theme="snow"
                  modules={{ toolbar: fullToolbarOptions }}
                  value={subDescription}
                  onChange={setSubDescription}
                />
              </div>
            </>
          )}

          {/* 🟢 Exam Plan Form */}
          {activeTab === "exam" && (
            <>
              <div className="addservice-left-div">
                <label>Exam Title</label>
                <input
                  type="text"
                  placeholder="Enter exam title"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                />
              </div>

              <div className="addservice-left-div">
                <label>Price (₹)</label>
                <input
                  type="number"
                  placeholder="Enter exam price"
                  value={examPrice}
                  onChange={(e) => setExamPrice(e.target.value)}
                />
              </div>

              <div className="addservice-left-div">
                <label>Description</label>
                <textarea
                  placeholder="Enter short description"
                  value={examDescription}
                  onChange={(e) => setExamDescription(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                ></textarea>
              </div>

              <div className="addservice-left-div">
                <label>Status</label>
                <select
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value === "true")}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HOC(AddPlan);
