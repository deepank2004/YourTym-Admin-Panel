import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import endPoints from "../../Repository/apiConfig";
import { getApi } from "../../Repository/Api";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assest/loading1.gif";

const Coupons = () => {
  const navigate = useNavigate();
  const [couponData, setCouponData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    await getApi(endPoints.getallCoupon, {
      setResponse: setCouponData,
      setLoading: setLoading,
      errorMsg: "Failed to fetch coupon data!",
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const uniqueCoupons =
    couponData?.service?.filter(
      (coupon, index, self) =>
        index === self.findIndex((c) => c.title === coupon.title)
    ) || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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
    return `${date.getDate().toString().padStart(2, "0")} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  return (
    <div className="userlistcontainer">
      <div className="userlist1">
        <div className="userlist2">
          <h6>Offers & Coupons</h6>
        </div>
        <div className="userlist3">
          <div className="userlist5">
            <button
              style={{ margin: "10px" }}
              onClick={() => {
                fetch(
                  "https://yourtym.com/api/api/v1/admin/Coupan/deleteallCoupan",
                  {
                    method: "DELETE",
                    headers: {
                      Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjcxMDMwY2I2MTEzODYxMzlhMGI0YSIsImlhdCI6MTc1NDE5ODE0MiwiZXhwIjoxNzg1NzM0MTQyfQ.UrnbciE8pdn0hNKIbkPE7aQS-1mm36xSzGAJQb77ODI",
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Deleted all coupons:", data);
                    fetchData(); // 🔹 Refresh coupon list after deletion
                  })
                  .catch((err) => console.error(err));
              }}
            >
              Delete All Coupons
            </button>

            <button
              onClick={() => navigate("/offers_coupons/coupons/add-coupon")}
            >
              Add Coupons
            </button>
          </div>
        </div>
      </div>

      <div className="servicetnasctioncontainer">
        <Link to={"/offers_coupons/offers"} className="link">
          <div className="servicetnasction">
            <h6>Offers</h6>
          </div>
        </Link>
        <Link to={"/offers_coupons/coupons"} className="link">
          <div className="servicetnasctionactive">
            <h6>Coupons</h6>
          </div>
        </Link>
      </div>

      <div className="userlist6">
        <div className="bottomdashboard3">
          <table>
            <thead>
              <tr>
                <th>Coupon Name</th>
                <th>Coupon Code</th>
                <th>Discount Type</th>
                <th>Discount Value</th>
                {/* <th>User Name</th> */}
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="tableloading">
                    <img src={img} alt="Loading..." />
                  </td>
                </tr>
              ) : uniqueCoupons.length === 0 ? (
                <tr>
                  <td colSpan="8" className="tableloading">
                    <p>No data available.</p>
                  </td>
                </tr>
              ) : (
                uniqueCoupons.map((coupon, index) => (
                  <tr key={index}>
                    <td>{coupon.title}</td>
                    <td>{coupon?.couponCode}</td>
                    <td>{coupon?.couponType}</td>
                    <td>{coupon?.discount}</td>
                    {/* <td>{coupon?.userId?.fullName}</td> */}
                    <td>{formatDate(coupon.activationDate)}</td>
                    <td>{formatDate(coupon.expirationDate)}</td>
                    <td
                      style={{
                        color:
                          coupon.status === "Active"
                            ? "#3FB031"
                            : coupon.status === "Pending"
                            ? "#E1B913"
                            : coupon.status === "Inactive"
                            ? "#B60B0B"
                            : "#0023D3",
                      }}
                    >
                      {coupon.status ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HOC(Coupons);
