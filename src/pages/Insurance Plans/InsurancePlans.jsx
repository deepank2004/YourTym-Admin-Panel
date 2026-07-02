import React, { useState } from "react";
import axios from "axios";
import HOC from "../../components/HOC/HOC";

const AddCreditRecharge = () => {
  const [partnerId, setPartnerId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!partnerId || !amount) {
      setMessage("⚠ Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `https://yourtym.com/api/api/v1/admin/wallet/addWallet/user/${partnerId}`,
        { balance: Number(amount) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjFjYzM5MzI5ODViMmM3MTllMTQxNyIsImlhdCI6MTc1NDg3OTEzOSwiZXhwIjoxNzg2NDE1MTM5fQ.WswPutFZGiIX5V1EzU-flmb4eYjcRCnBg9JLgf92CL4",
          },
        }
      );

      if (res.status === 200) {
        setMessage("✅ Credit added successfully!");
      } else {
        setMessage("❌ Something went wrong!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error adding credit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="userlistcontainer">
      {/* Top Bar Title */}
      <div className="userlist1">
        <div className="userlist2">
          <h6>Add Credit Recharge</h6>
        </div>
      </div>

      {/* Form Section */}
      <div className="userlist6">
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: "500px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Partner ID</label>
              <input
                type="text"
                placeholder="Enter Partner ID"
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Amount</label>
              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: "#FF5534", borderColor: "#FF5534" }}
              className="btn w-100 text-white"
              disabled={loading}
            >
              {loading ? "Processing..." : "Add Credit"}
            </button>
          </form>

          {message && (
            <div
              className="mt-3 p-2 text-center"
              style={{
                background: message.includes("✅")
                  ? "#d4edda"
                  : message.includes("⚠")
                  ? "#fff3cd"
                  : "#f8d7da",
                color: message.includes("✅")
                  ? "#155724"
                  : message.includes("⚠")
                  ? "#856404"
                  : "#721c24",
                borderRadius: "4px",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HOC(AddCreditRecharge);
