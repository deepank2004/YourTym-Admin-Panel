import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import endPoints from "../../Repository/apiConfig";
import { getApi, postApi } from "../../Repository/Api";

const Addcoupon = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [discounttype, setDiscounttype] = useState("");
  const [description, setDescription] = useState("");
  const [startdate, setSatartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);

  const [UserOptions, setUserOptions] = useState([]);

  const fetchUser = useCallback(async () => {
    await getApi(endPoints.getallUser(1, limit), {
      setResponse: (response) => {
        setLimit(response?.pagination?.totalDocs);
        setUserOptions(response);
      },
      setLoading,
      errorMsg: "Failed to fetch user!",
    });
  }, [limit]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async () => {
    const fields = {
      title: title,
      desc: description,
      userId: userId,
      discount: discount,
      couponType: discounttype,
      expirationDate: endDate,
      activationDate: startdate,
    };

    await postApi(endPoints.addCoupom, fields, {
      setLoading,
      successMsg: "Coupan added successfully!",
      errorMsg: "Failed to add coupan!",
    });
    navigate("/offers_coupons/coupons");
  };

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
            <h6>Add coupon</h6>
          </div>
          <div className="addserivce-btn">
            <button disabled={loading} onClick={handleSubmit}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
        <div className="addbanner-container">
          <div className="addsubcategory-left-div">
            <div className="addservice-left-div">
              <label htmlFor="">Coupon Title</label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="addservice-left-div">
              <label htmlFor="">Coupon Discount percentage</label>
              <input
                type="text"
                placeholder="Enter discount percentage"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="addservice-left-div">
              <label htmlFor="">Discount Type</label>
              <select
                value={discounttype}
                onChange={(e) => setDiscounttype(e.target.value)}
              >
                <option value="">Select</option>
                <option value="PERMANENT">Permanent</option>
              </select>
            </div>
            <div className="addservice-left-div">
              <label htmlFor="">Select User</label>
              <select
                name="user"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="">Select</option>
                <option value="all">All</option> {/* Added All option */}
                {loading ? (
                  <option value="">Loading...</option>
                ) : UserOptions?.data?.length === 0 ? (
                  <option value="">No data</option>
                ) : (
                  UserOptions?.data?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.user?.fullName}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="addservice-left-div">
              <label htmlFor="">Start Date </label>
              <input
                type="date"
                value={startdate}
                onChange={(e) => setSatartDate(e.target.value)}
              />
            </div>
            <div className="addservice-left-div">
              <label htmlFor="">End Date </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="addservice-left-div">
            <label htmlFor="">Description</label>
            <textarea
              name=""
              id=""
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(Addcoupon);
