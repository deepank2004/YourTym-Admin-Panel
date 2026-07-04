import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link } from "react-router-dom";
import { getApi, postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import img from "../../assest/loading1.gif";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa";

const AllHub = () => {
  const [hubData, setHubData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);

  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const [hubAreas, setHubAreas] = useState([]);
  const [areaLoading, setAreaLoading] = useState(false);

  const [partnerIds, setPartnerIds] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    await getApi(endPoints.getHub, {
      setResponse: setHubData,
      setLoading,
      errorMsg: "Failed to fetch hubs!",
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hubs = Array.isArray(hubData?.data)
    ? hubData.data
    : Array.isArray(hubData)
    ? hubData
    : [];

  const getHubName = (hub) => {
    if (hub?.name) return hub.name;

    const cityName = hub?.cityId?.name || hub?.city?.name || "";
    const categoryName =
      hub?.mainCategoryId?.name || hub?.mainCategory?.name || "";

    return cityName && categoryName ? `${cityName} - ${categoryName}` : "N/A";
  };

  const handleViewHub = async (hub) => {
    setSelectedHub(hub);
    setHubAreas([]);
    setDetailsOpen(true);

    try {
      const res = await getApi(endPoints.getHubAreas(hub._id), {
        setLoading: setAreaLoading,
        errorMsg: "Failed to fetch hub areas!",
      });

      const areaData =
        res?.data ||
        res?.areas ||
        res?.hubAreas ||
        res?.result ||
        [];

      setHubAreas(Array.isArray(areaData) ? areaData : []);
    } catch (error) {
      console.log("Fetch hub areas error:", error);
    }
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedHub(null);
    setHubAreas([]);
  };

  const openBulkModal = (area) => {
    setSelectedArea(area);
    setPartnerIds("");
    setBulkOpen(true);
  };

  const closeBulkModal = () => {
    setBulkOpen(false);
    setSelectedArea(null);
    setPartnerIds("");
  };

  const handleSavePartners = async () => {
    if (!selectedHub?._id) {
      alert("Hub ID not found");
      return;
    }

    if (!selectedArea?._id) {
      alert("Hub Area ID not found");
      return;
    }

    const idsArray = partnerIds
      .split(/[\n,\s]+/)
      .map((id) => id.trim())
      .filter(Boolean);

    const uniquePartnerIds = [...new Set(idsArray)];

    if (uniquePartnerIds.length === 0) {
      alert("Please enter at least one partner _id");
      return;
    }

    try {
      await postApi(
        endPoints.addBulkPartnersToHub(selectedHub._id, selectedArea._id),
        {
          partnerIds: uniquePartnerIds,
        },
        {
          setLoading: setSaving,
          successMsg: "Partners added successfully!",
          errorMsg: "Failed to add partners!",
        }
      );

      closeBulkModal();
      closeDetails();
      fetchData();
    } catch (error) {
      console.log("Bulk partner error:", error);
    }
  };

  return (
    <>
      <div className="userlistcontainer">
        <div className="userlist1">
          <div className="userlist2">
            <h6>Hub</h6>
          </div>

          <div className="userlist3">
            <div className="userlist5">
              <Link to="/hub/create-hub">
                <button>Add new</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="servicetnasctioncontainer">
          <Link to="/hub/get-hubs" className="link">
            <div className="servicetnasctionactive">
              <h6>Get Hubs</h6>
            </div>
          </Link>

          <Link to="/hub/create-hub" className="link">
            <div className="servicetnasction">
              <h6>Create Hub</h6>
            </div>
          </Link>

          <Link to="/hub/update-hub" className="link">
            <div className="servicetnasction">
              <h6>Update Hub</h6>
            </div>
          </Link>
        </div>

        <div className="userlist6">
          <div className="bottomdashboard3">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Hub Name</th>
                  <th>City</th>
                  <th>Main Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="tableloading">
                      <img src={img} alt="" />
                    </td>
                  </tr>
                ) : hubs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="tableloading">
                      <p>No data available.</p>
                    </td>
                  </tr>
                ) : (
                  hubs.map((hub, index) => (
                    <tr key={hub._id || index}>
                      <td>#{index + 1}</td>
                      <td>{getHubName(hub)}</td>
                      <td>{hub.cityId?.name || hub.city?.name || "N/A"}</td>
                      <td>
                        {hub.mainCategoryId?.name ||
                          hub.mainCategory?.name ||
                          "N/A"}
                      </td>
                      <td
                        style={{
                          color:
                            hub.active || hub.status ? "#3FB031" : "#B60B0B",
                        }}
                      >
                        {hub.active || hub.status ? "Active" : "Inactive"}
                      </td>
                      <td className="div-icons hub-action-icons">
                        <Link to={`/hub/update-hub?id=${hub._id}`}>
                          <FaEdit />
                        </Link>

                        <button
                          type="button"
                          className="hub-eye-btn"
                          onClick={() => handleViewHub(hub)}
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {detailsOpen && selectedHub && (
        <div className="hub-modal-overlay">
          <div className="hub-modal hub-large-modal">
            <div className="hub-modal-header">
              <h3>Hub Details</h3>

              <button className="hub-modal-close" onClick={closeDetails}>
                <FaTimes />
              </button>
            </div>

            <div className="hub-modal-body">
              <div className="hub-detail-group">
                <label>Hub ID</label>
                <p>{selectedHub._id}</p>
              </div>

              <div className="hub-detail-group">
                <label>Hub Name</label>
                <p>{getHubName(selectedHub)}</p>
              </div>

              <div className="hub-detail-group">
                <label>Covered Areas</label>

                {areaLoading ? (
                  <p>Loading areas...</p>
                ) : hubAreas.length === 0 ? (
                  <p>No areas found for this hub.</p>
                ) : (
                  <div className="hub-area-list">
                    {hubAreas.map((area, index) => (
                      <div className="hub-area-card" key={area._id || index}>
                        <div>
                          <h5>{area.name || area.slug || `Area ${index + 1}`}</h5>
                          <p>{area._id}</p>
                        </div>

                        <button
                          type="button"
                          className="hub-area-add-btn"
                          onClick={() => openBulkModal(area)}
                        >
                          Add Bulk Partners
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {bulkOpen && selectedHub && selectedArea && (
        <div className="hub-modal-overlay">
          <div className="hub-modal">
            <div className="hub-modal-header">
              <h3>Add Bulk Partners</h3>

              <button className="hub-modal-close" onClick={closeBulkModal}>
                <FaTimes />
              </button>
            </div>

            <div className="hub-modal-body">
              <div className="hub-detail-group">
                <label>Hub ID</label>
                <p>{selectedHub._id}</p>
              </div>

              <div className="hub-detail-group">
                <label>Hub Area ID</label>
                <p>{selectedArea._id}</p>
              </div>

              <div className="hub-detail-group">
                <label>Area Name</label>
                <p>{selectedArea.name || selectedArea.slug || "N/A"}</p>
              </div>

              <div className="hub-detail-group">
                <label>Partner Mongo IDs</label>

                <textarea
                  value={partnerIds}
                  onChange={(e) => setPartnerIds(e.target.value)}
                  placeholder={`Paste partner MongoDB _id here:

6a4613d6d9fe51aff58f1946
6a4613d6d9fe51aff58f1947`}
                ></textarea>

                <span className="hub-helper-text">
                  Paste partner IDs using new lines, commas, or spaces.
                </span>
              </div>
            </div>

            <div className="hub-modal-footer">
              <button
                type="button"
                className="hub-cancel-btn"
                onClick={closeBulkModal}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="hub-save-btn"
                onClick={handleSavePartners}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Partners"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HOC(AllHub);