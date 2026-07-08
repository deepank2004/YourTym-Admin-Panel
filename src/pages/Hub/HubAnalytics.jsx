import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import "./Hub.css";

const HubAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const [cities, setCities] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [filters, setFilters] = useState({
    cityId: "",
    mainCategoryId: "",
    hubAreaId: "",
    active: true,
  });

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      setDropdownLoading(true);

      const cityRes = await getApi(endPoints.getAllcity);
      const categoryRes = await getApi(endPoints.getallMaincategory);

      setCities(Array.isArray(cityRes?.data) ? cityRes.data : []);
      setMainCategories(Array.isArray(categoryRes?.data) ? categoryRes.data : []);
    } catch (error) {
      console.log("Dropdown error:", error);
    } finally {
      setDropdownLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const fetchAnalytics = async () => {
    try {
      await getApi(endPoints.getHubAnalytics(filters), {
        setResponse: setAnalytics,
        setLoading,
        errorMsg: "Failed to fetch hub analytics!",
      });
    } catch (error) {
      console.log("Hub analytics error:", error);
    }
  };

  const data = analytics?.data || analytics || {};
  const summary = data?.hubOverallSummary || data?.summary || {};
  const areas = data?.allHubAreaWiseOrders || [];

  return (
    <div className="hub-page">
      <h2 className="hub-title">Hub Analytics</h2>

      <div className="hub-tabs">
        <Link to="/hub/get-hubs" className="hub-tab">Get Hubs</Link>
        <Link to="/hub/create-hub" className="hub-tab">Create Hub</Link>
        <Link to="/hub/update-hub" className="hub-tab">Update Hub</Link>
        <Link to="/hub/hub-analytics" className="hub-tab hub-tab-active">
          Hub Analytics
        </Link>
      </div>

      <div className="hub-form">
        <div className="hub-form-group">
          <label>City</label>
          <select name="cityId" value={filters.cityId} onChange={handleChange}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.cityName || city.name || "Unnamed City"} - {city._id}
              </option>
            ))}
          </select>
        </div>

        <div className="hub-form-group">
          <label>Main Category</label>
          <select
            name="mainCategoryId"
            value={filters.mainCategoryId}
            onChange={handleChange}
          >
            <option value="">Select Main Category</option>
            {mainCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name || "Unnamed Category"} - {category._id}
              </option>
            ))}
          </select>
        </div>

        <div className="hub-form-group">
          <label>Hub Area ID</label>
          <input
            type="text"
            name="hubAreaId"
            placeholder="Enter Hub Area ID"
            value={filters.hubAreaId}
            onChange={handleChange}
          />
        </div>

        <div className="hub-form-group">
          <label>Status</label>
          <select name="active" value={String(filters.active)} onChange={handleChange}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <button
          type="button"
          className="hub-submit-btn"
          onClick={fetchAnalytics}
          disabled={loading || dropdownLoading}
        >
          {loading ? "Loading..." : "Get Analytics"}
        </button>
      </div>

      {analytics && (
        <>
          <div className="hub-analytics-cards">
            <div className="hub-analytics-card">
              <h4>Total Orders</h4>
              <p>{summary.totalOrders || 0}</p>
            </div>

            <div className="hub-analytics-card">
              <h4>Revenue</h4>
              <p>₹{Number(summary.revenue || 0).toFixed(2)}</p>
            </div>

            <div className="hub-analytics-card">
              <h4>No. Of Partners</h4>
              <p>{summary.activePartners || 0}</p>
            </div>
          </div>

          <div className="bottomdashboard3">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Area Name</th>
                  <th>Hub Area ID</th>
                  <th>Total Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {areas.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="tableloading">
                      No area analytics found.
                    </td>
                  </tr>
                ) : (
                  areas.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>#{index + 1}</td>
                      <td>{item.hubArea?.name || item.hubArea?.slug || "N/A"}</td>
                      <td>{item.hubArea?._id || "N/A"}</td>
                      <td>{item.totalOrders || 0}</td>
                      <td>₹{Number(item.revenue || 0).toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default HOC(HubAnalytics);