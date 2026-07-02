import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

import img from "../../assest/loading1.gif";

import { FaEdit } from "react-icons/fa";

const AllHub = () => {
  const [hubData, setHubData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    await getApi(
      endPoints.getHub,
      {
        setResponse: setHubData,
        setLoading: setLoading,
        errorMsg: "Failed to fetch hubs!",
      }
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                ) : !hubData?.data ||
                  hubData?.data?.length === 0 ||
                  hubData?.status === 404 ? (
                  <tr>
                    <td colSpan="6" className="tableloading">
                      <p>No data available.</p>
                    </td>
                  </tr>
                ) : (
                  hubData?.data?.map((hub, index) => (
                    <tr key={hub._id || index}>
                      <td>#{index + 1}</td>
                      <td>{hub.name || "N/A"}</td>
                      <td>{hub.cityId?.name || hub.city?.name || "N/A"}</td>
                      <td>
                        {hub.mainCategoryId?.name ||
                          hub.mainCategory?.name ||
                          "N/A"}
                      </td>
                      <td
                        style={{
                          color: hub.active || hub.status ? "#3FB031" : "#B60B0B",
                        }}
                      >
                        {hub.active || hub.status ? "Active" : "Inactive"}
                      </td>
                      <td className="div-icons">
                        <Link to={`/hub/update-hub?id=${hub._id}`}>
                          <FaEdit />
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
    </>
  );
};

export default HOC(AllHub);