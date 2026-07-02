import React, { useCallback, useEffect, useState } from "react";

import HOC from "../../components/HOC/HOC";
import TopDashboard from "./TopDashboard";
import MiddleDashboard from "./MiddleDashboard";
import BottomDashboard from "./BottomDashboard";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

import img from "../../assest/loading1.gif";
import { useAdmin } from "../Admin Profile/AdminContext";

const Dashboard = () => {
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const { adminProfile } = useAdmin();
  const userType = adminProfile?.data?.userType;
  const permissions = adminProfile?.data?.permission || [];

  const fetchData = useCallback(async () => {
    await getApi(endPoints.getallCount, {
      setResponse: setData,
      setLoading: setLoading,
      errorMsg: "Failed to fetch data!",
    });
  }, []);

  const [bookingData, setBookingData] = useState([]);
  const [loading1, setLoading1] = useState(false);

  const fetchBookingData = useCallback(async () => {
    setBookingData([]);

    await getApi(endPoints.getallBookings(1, 5), {
      setResponse: setBookingData,
      setLoading: setLoading1,
      errorMsg: "Failed to fetch user data!",
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchBookingData();
  }, [fetchBookingData]);

  return (
    <>
      {loading && loading1 ? (
        <div className="normalloading">
          <img src={img} alt="" />
        </div>
      ) : (
        <div className="dashboardcontainer">
          <div className="dashboardtop">
            <TopDashboard Data={Data?.data} />
          </div>
          <div className="dashboardmiddle">
            <MiddleDashboard Data={Data?.data?.totalRevenue} />
          </div>
          {/* {userType === "ADMIN" || (permissions?.includes("Bookings")) ? (
            // <div className='dashboardmiddle'>
            //   <BottomDashboard data={bookingData} />
            // </div>
          ) : null} */}
        </div>
      )}
    </>
  );
};

export default HOC(Dashboard);
