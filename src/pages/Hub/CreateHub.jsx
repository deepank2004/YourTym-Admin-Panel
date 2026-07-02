import React, { useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import "./Hub.css";

const CreateHub = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cityId: "",
    mainCategoryId: "",
    active: true,
    kml: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      kml: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("cityId", formData.cityId);
    data.append("mainCategoryId", formData.mainCategoryId);
    data.append("active", formData.active);

    if (formData.kml) {
      data.append("kml", formData.kml);
    }

    await postApi(endPoints.addHub, data, {
      setLoading,
      successMsg: "Hub created successfully!",
      errorMsg: "Failed to create hub!",
    });

    navigate("/hub/get-hubs");
  };

  return (
    <div className="hub-page">
      <h2 className="hub-title">Create Hub</h2>

      <div className="hub-tabs">
        <Link to="/hub/get-hubs" className="hub-tab">
          Get Hubs
        </Link>

        <Link
          to="/hub/create-hub"
          className="hub-tab hub-tab-active"
        >
          Create Hub
        </Link>

        <Link to="/hub/update-hub" className="hub-tab">
          Update Hub
        </Link>
      </div>

      <form className="hub-form" onSubmit={handleSubmit}>
        <div className="hub-form-group">
          <label>City ID</label>

          <input
            type="text"
            name="cityId"
            placeholder="Enter City ID"
            value={formData.cityId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="hub-form-group">
          <label>Main Category ID</label>

          <input
            type="text"
            name="mainCategoryId"
            placeholder="Enter Main Category ID"
            value={formData.mainCategoryId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="hub-form-group">
          <label>Status</label>

          <select
            name="active"
            value={formData.active}
            onChange={handleChange}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <div className="hub-form-group">
          <label>Upload KML File</label>

          <input
            type="file"
            accept=".kml"
            onChange={handleFileChange}
            required
          />
        </div>

        <button
          type="submit"
          className="hub-submit-btn"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Hub"}
        </button>
      </form>
    </div>
  );
};

export default HOC(CreateHub);