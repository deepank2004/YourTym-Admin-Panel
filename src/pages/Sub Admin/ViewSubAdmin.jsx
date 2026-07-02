import React, { useCallback, useEffect, useState } from "react";

import { LiaArrowLeftSolid } from "react-icons/lia";

import { useNavigate, useParams } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import endPoints from "../../Repository/apiConfig";
import { getApi } from "../../Repository/Api";

import img1 from "../../assest/loading1.gif";
import img2 from "../../assest/user.webp";

const ViewSubAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState("");

  const fetchData = useCallback(async () => {
    await getApi(endPoints.getuserbyid(id), {
      setResponse: setData,
      setLoading: setLoading,
      errorMsg: "Failed to fetch data!",
    });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Add 5 hours and 30 minutes to convert UTC to IST
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${date.getDate().toString().padStart(2, "0")} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    return formattedDate;
  };

  const dummydata = [
    { name: "Dashboard" },
    { name: "Users Lists" },
    { name: "Partners Lists" },
    { name: "Bookings" },
    { name: "Transaction Lists" },
    { name: "Services Management" },
    { name: "Packages" },
    { name: "Slot" },
    { name: "Booked Sessions" },
    { name: "Payout Management" },
    { name: "Wallet" },
    { name: "Monthly Subscription" },
    { name: "Referral History" },
    { name: "Banners" },
    { name: "Offers & Coupons" },
    { name: "Push Notification" },
    { name: "Location" },
    { name: "Charges" },
    { name: "Training Videos" },
    { name: "Testimonials" },
    { name: "All Leaves" },
    { name: "Insurance Plans" },
    { name: "Consent Forms" },
    { name: "Traning Report" },
    { name: "Policy Setting" },
    { name: "Live Chat" },
    { name: "Help & Support" },
    { name: "Sub admin" },
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
            <h6>{data?.data?.fullName} Details</h6>
          </div>
        </div>
        {loading ? (
          <div className="normalloading">
            <img src={img1} alt="" />
          </div>
        ) : (
          <>
            <div className="userprofile-main">
              <div className="userprofile-profileimage">
                <img src={data?.data?.data?.image || img2} alt="no image" />
              </div>
              <div className="userprofile-content">
                <div className="userprofile-content-inputes">
                  <label htmlFor="">Name</label>
                  <input type="text" value={data?.data?.data?.fullName} />
                </div>
                <div className="userprofile-content-inputes">
                  <label htmlFor="">Sub Admin ID</label>
                  <input type="text" value={data?.data?.data?.userId} />
                </div>
                <div className="userprofile-content-inputes">
                  <label htmlFor="">Email ID</label>
                  <input type="text" value={data?.data?.data?.email} />
                </div>
                <div className="userprofile-content-inputes">
                  <label htmlFor="">Phone Number</label>
                  <input type="text" value={data?.data?.data?.phone} />
                </div>
                <div className="userprofile-content-inputes">
                  <label htmlFor="">Registered Date</label>
                  <input
                    type="text"
                    value={formatDate(data?.data?.data?.createdAt)}
                  />
                </div>
              </div>
            </div>
            <div className="addnewadmin-container">
              <h6>Permission for Sub admin</h6>
              <div className="addnewadmin-main">
                {dummydata.map((item, index) => (
                  <div className="addnewadmin-div" key={index}>
                    <span>{item.name}</span>
                    <div className="userlist7">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={
                            data?.data?.data?.permission?.includes(item.name) ||
                            false
                          }
                          readOnly
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HOC(ViewSubAdmin);
