import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { useNavigate, useParams } from "react-router-dom";
import endPoints from "../../Repository/apiConfig";
import { getApi } from "../../Repository/Api";

import { LiaArrowLeftSolid } from "react-icons/lia";
import img from "../../assest/loading1.gif";

import { formatDate } from "../../utils/utils";
import { AssignPartnerModal } from "../../components/Modals/Modals";

const BookingDetails = ({ active }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const fetchData = useCallback(async () => {
    await getApi(endPoints.getbookingbyid(id), {
      setResponse: setBookingData,
      setLoading: setLoading,
      errorMsg: "Failed to fetch booking data!",
    });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  return (
    <>
      <AssignPartnerModal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        orderId={id}
        fetchData={fetchData}
      />

      <div className="userprofilecontainer">
        <div className="partnerprofile-container">
          <div className="userprofile-header">
            <LiaArrowLeftSolid
              color="#000000"
              size={25}
              onClick={() => navigate(-1)}
            />
            <h6>Booking Details</h6>
          </div>
          <div className="userlist5">
            <button onClick={() => setShowAssignModal(true)}>
              Assign Partner
            </button>
          </div>
        </div>
        {loading ? (
          <div className="normalloading">
            <img src={img} alt="" />
          </div>
        ) : !bookingData?.data ? (
          <div className="normalloading">
            <p>No data available.</p>
          </div>
        ) : (
          <div className="bookingdetails-container">
            <div className="userbookings-main">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Service Name</th>
                    <th>Main Category Name</th>
                    <th>Total Time</th>
                    <th>Quantity</th>
                    <th>Original Price</th>
                    <th>Discount Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData?.data?.services?.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="tableloading">
                        <p>No data available.</p>
                      </td>
                    </tr>
                  ) : (
                    bookingData?.data?.services?.map((order, index) => (
                      <tr key={index}>
                        <td>{bookingData?.data?.orderId}</td>
                        <td>{order?.serviceId?.title || "N/A"}</td>
                        <td>
                          {order?.serviceId?.mainCategoryId.name || "N/A"}
                        </td>
                        <td>{order?.serviceId?.totalTime || "N/A"}</td>
                        <td>{order?.quantity || "N/A"}</td>
                        <td>
                          {order?.serviceId?.location[0].originalPrice || 0}
                        </td>
                        <td>
                          {order?.serviceId?.location[0].discountPrice || 0}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="userbookings-main" style={{ marginTop: "20px" }}>
              <table>
                <thead>
                  <tr>
                    <th>package Name</th>
                    <th>Main Category Name</th>
                    <th>Total Time</th>
                    <th>Package Type</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData?.data?.packages?.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="tableloading">
                        <p>No data available.</p>
                      </td>
                    </tr>
                  ) : (
                    bookingData?.data?.packages?.map((order, index) => (
                      <tr key={index}>
                        <td>{order?.packageId?.title}</td>
                        <td>
                          {order?.packageId?.mainCategoryId?.name || "N/A"}
                        </td>
                        <td>{order?.packageId?.totalTime || "N/A"}</td>
                        <td>{order?.packageId?.packageType || "N/A"}</td>
                        <td>{order?.quantity || "N/A"}</td>
                        <td>{order?.price || 0}</td>
                        <td>{order?.total || 0}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="bookingdetails-timing">
              <label htmlFor="">User Detail</label>
              <div className="userbookings-main">
                <table>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>User ID</th>
                      <th>Phone Number</th>
                      <th>Email ID</th>
                      <th>Gender</th>
                      <th>House Type</th>
                      <th>House Flat</th>
                      <th>Apartment</th>
                      <th>Landmark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!bookingData?.data?.userId ? (
                      <tr>
                        <td colSpan="10" className="tableloading">
                          <p>No data available.</p>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{bookingData?.data?.userId?.fullName}</td>
                        <td>{bookingData?.data?.userId?.userId}</td>
                        <td>{bookingData?.data?.userId?.phone}</td>
                        <td>{bookingData?.data?.userId?.email}</td>
                        <td>{bookingData?.data?.userId?.gender}</td>
                        <td>{bookingData?.data?.houseType || "-"}</td>
                        <td>{bookingData?.data?.houseFlat || "-"}</td>
                        <td>{bookingData?.data?.appartment || "-"}</td>
                        <td>{bookingData?.data?.landMark || "-"}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bookingdetails-timing">
              <label htmlFor="">Partner Detail</label>
              <div className="userbookings-main">
                <table>
                  <thead>
                    <tr>
                      <th>Partner Name</th>
                      <th>Employee id</th>
                      <th>Phone Number</th>
                      <th>Gender</th>
                      <th>Email ID</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!bookingData?.data?.partnerId ? (
                      <tr>
                        <td colSpan="10" className="tableloading">
                          <p>No data available.</p>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{bookingData?.data?.partnerId?.fullName}</td>
                        <td>{bookingData?.data?.partnerId?.userId}</td>
                        <td>{bookingData?.data?.partnerId?.phone}</td>
                        <td>{bookingData?.data?.partnerId?.gender}</td>
                        <td>{bookingData?.data?.partnerId?.email}</td>
                        <td>{bookingData?.data?.partnerId?.address1}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bookingdetails-timing">
              <label htmlFor="">Payment Details</label>
              <div className="userbookings-main">
                <table>
                  <thead>
                    <tr>
                      <th>Total Amount</th>
                      <th>Additional Fee</th>
                      <th>Paid Amount</th>
                      <th>Admin Earnings</th>
                      <th>Partner Earnings</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Payment Method</th>
                      <th>Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rs. {bookingData?.data?.totalAmount || "N/A"}</td>
                      <td>Rs. {bookingData?.data?.additionalFee || "N/A"}</td>
                      <td>Rs. {bookingData?.data?.paidAmount || "N/A"}</td>
                      <td>Rs. {bookingData?.data?.adminEarnings || "N/A"}</td>
                      <td>Rs. {bookingData?.data?.partnerEarnings || "N/A"}</td>
                      <td>{bookingData?.data?.paymentStatus || "N/A"}</td>
                      <td>
                        {formatDate(
                          bookingData?.data?.transctionId?.date || "N/A"
                        )}
                      </td>
                      <td>
                        {bookingData?.data?.transctionId?.paymentMode || "N/A"}
                      </td>
                      <td> 123345668 </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bookingdetails-timing">
              <label htmlFor="">Extra Payment Details</label>
              <div className="userbookings-main">
                <table>
                  <thead>
                    <tr>
                      <th>Customer Sign</th>
                      <th>Extra Comment</th>
                      <th>Extra PaymentMode</th>
                      <th>Extr Product Price</th>
                      <th>Working Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{bookingData?.data?.customerSign || "N/A"}</td>
                      <td>{bookingData?.data?.extrComment || "N/A"}</td>
                      <td>{bookingData?.data?.extrPaymentMode || "N/A"}</td>
                      <td>{bookingData?.data?.extrProductPrice || "N/A"}</td>
                      <td>{bookingData?.data?.workingComment || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bookingdetails-timing">
              <label htmlFor="">Working Image</label>
              <div className="patnerdocument-method-content">
                {bookingData?.data?.workingImage?.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="tableloading">
                      <p>No data available.</p>
                    </td>
                  </tr>
                ) : (
                  bookingData?.data?.workingImage?.map((img, index) => (
                    <div className="patnerdocument-method-document" key={index}>
                      <img src={img} alt="No-Image" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HOC(BookingDetails);
