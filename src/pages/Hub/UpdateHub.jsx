import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import "./Hub.css";

const UpdateHub = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const hubIdFromUrl = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const [hubId, setHubId] = useState(hubIdFromUrl || "");

  const [cities, setCities] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);

  const [formData, setFormData] = useState({
    cityId: "",
    mainCategoryId: "",
    active: true,
    partnerIds: "",
    kml: null,
  });

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      setDropdownLoading(true);

      const cityRes = await getApi(endPoints.getAllcity);
      const categoryRes = await getApi(endPoints.getallMaincategory);

      const cityData =
        cityRes?.data ||
        cityRes?.cities ||
        cityRes?.city ||
        [];

      const categoryData =
        categoryRes?.data ||
        categoryRes?.categories ||
        categoryRes?.category ||
        [];

      setCities(Array.isArray(cityData) ? cityData : []);
      setMainCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      console.log("Dropdown fetch error:", error);
    } finally {
      setDropdownLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "active" ? value === "true" : value,
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

    if (!hubId) {
      alert("Please enter Hub ID");
      return;
    }

    if (!formData.cityId) {
      alert("Please select City ID");
      return;
    }

    if (!formData.mainCategoryId) {
      alert("Please select Main Category ID");
      return;
    }

    const data = new FormData();

    data.append("cityId", formData.cityId);
    data.append("mainCategoryId", formData.mainCategoryId);
    data.append("active", formData.active);

    const partnerIdsArray = formData.partnerIds
      .split(/[\n,]+/)
      .map((id) => id.trim())
      .filter((id) => id !== "");

    partnerIdsArray.forEach((id) => {
      data.append("partnerIds", id);
    });

    if (formData.kml) {
      data.append("kml", formData.kml);
    }

    try {
      await putApi(endPoints.updateHub(hubId), data, {
        setLoading,
        successMsg: "Hub updated successfully!",
        errorMsg: "Failed to update hub!",
      });

      navigate("/hub/get-hubs");
    } catch (error) {
      console.log("Update Hub Error:", error);
    }
  };

  return (
    <div className="hub-page">
      <h2 className="hub-title">Update Hub</h2>

      <div className="hub-tabs">
        <Link to="/hub/get-hubs" className="hub-tab">
          Get Hubs
        </Link>

        <Link to="/hub/create-hub" className="hub-tab">
          Create Hub
        </Link>

        <Link to="/hub/update-hub" className="hub-tab hub-tab-active">
          Update Hub
        </Link>
      </div>

      <form className="hub-form" onSubmit={handleSubmit}>
        <div className="hub-form-group">
          <label>Hub ID</label>

          <input
            type="text"
            placeholder="Enter Hub ID"
            value={hubId}
            onChange={(e) => setHubId(e.target.value)}
            required
          />
        </div>

        <div className="hub-form-group">
          <label>City ID</label>

          <select
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            required
            disabled={dropdownLoading}
          >
            <option value="">
              {dropdownLoading ? "Loading cities..." : "Select City"}
            </option>

            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.cityName || city.name || "Unnamed City"} - {city._id}
              </option>
            ))}
          </select>
        </div>

        <div className="hub-form-group">
          <label>Main Category ID</label>

          <select
            name="mainCategoryId"
            value={formData.mainCategoryId}
            onChange={handleChange}
            required
            disabled={dropdownLoading}
          >
            <option value="">
              {dropdownLoading ? "Loading categories..." : "Select Main Category"}
            </option>

            {mainCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name || "Unnamed Category"} - {category._id}
              </option>
            ))}
          </select>
        </div>

        <div className="hub-form-group">
          <label>Status</label>

          <select
            name="active"
            value={String(formData.active)}
            onChange={handleChange}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="hub-form-group">
          <label>Partner IDs</label>

          <textarea
            name="partnerIds"
            placeholder="Paste partner object IDs here, one per line or comma separated"
            value={formData.partnerIds}
            onChange={handleChange}
            rows="6"
          ></textarea>
        </div>

        <div className="hub-form-group">
          <label>Upload New KML File</label>

          <input type="file" accept=".kml" onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="hub-submit-btn"
          disabled={loading || dropdownLoading}
        >
          {loading ? "Updating..." : "Update Hub"}
        </button>
      </form>
    </div>
  );
};

export default HOC(UpdateHub);