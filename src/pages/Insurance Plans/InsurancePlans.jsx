import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import HOC from "../../components/HOC/HOC";
import { getAuthHeaders } from "../../components/BaseURl/BaseUrl";

const walletActions = {
  add: {
    title: "Add Credit Recharge",
    button: "Add Credit",
    endpoint: (partnerId) =>
      `https://yourtym.in/api/v1/admin/wallet/addWallet/user/${partnerId}`,
  },
  deduct: {
    title: "Deduct Credit Recharge",
    button: "Deduct Credit",
    endpoint: (partnerId) =>
      `https://yourtym.in/api/v1/admin/wallet/deductWallet/user/${partnerId}`,
  },
};

const AddCreditRecharge = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedPartnerId = searchParams.get("partnerId") || "";
  const selectedAction = searchParams.get("action") === "deduct" ? "deduct" : "add";
  const [partnerId, setPartnerId] = useState(selectedPartnerId);
  const [amounts, setAmounts] = useState({ add: "", deduct: "" });
  const [loadingAction, setLoadingAction] = useState("");
  const [messages, setMessages] = useState({ add: "", deduct: "" });

  const handleSubmit = async (event, action) => {
    event.preventDefault();
    const numericAmount = Number(amounts[action]);

    if (!partnerId || !amounts[action]) {
      setMessages((previous) => ({ ...previous, [action]: "Please fill in all fields." }));
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setMessages((previous) => ({
        ...previous,
        [action]: "Please enter an amount greater than zero.",
      }));
      return;
    }

    setLoadingAction(action);
    setMessages((previous) => ({ ...previous, [action]: "" }));

    try {
      const response = await axios.post(
        walletActions[action].endpoint(partnerId),
        { balance: numericAmount },
        getAuthHeaders()
      );

      toast.success(
        response?.data?.message ||
          `Amount ${action === "deduct" ? "deducted from" : "added to"} wallet successfully!`
      );
      setAmounts((previous) => ({ ...previous, [action]: "" }));
      navigate(-1);
    } catch (error) {
      setMessages((previous) => ({
        ...previous,
        [action]:
          error?.response?.data?.message ||
          `Failed to ${action === "deduct" ? "deduct from" : "add to"} wallet.`,
      }));
    } finally {
      setLoadingAction("");
    }
  };

  const renderCard = (action) => {
    const config = walletActions[action];
    const isSelected = selectedAction === action;

    return (
      <div
        key={action}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: isSelected
            ? "0 0 0 2px #FF5534, 0 2px 8px rgba(0,0,0,0.1)"
            : "0 2px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h5 style={{ marginBottom: "20px" }}>{config.title}</h5>
        <form onSubmit={(event) => handleSubmit(event, action)}>
          <div className="mb-3">
            <label className="form-label fw-bold">Partner ID</label>
            <input
              type="text"
              placeholder="Enter Partner ID"
              value={partnerId}
              onChange={(event) => setPartnerId(event.target.value)}
              className="form-control"
              readOnly={Boolean(selectedPartnerId)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter Amount"
              value={amounts[action]}
              onChange={(event) =>
                setAmounts((previous) => ({ ...previous, [action]: event.target.value }))
              }
              className="form-control"
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "#FF5534", borderColor: "#FF5534" }}
            className="btn w-100 text-white"
            disabled={Boolean(loadingAction)}
          >
            {loadingAction === action ? "Processing..." : config.button}
          </button>
        </form>

        {messages[action] && (
          <div
            className="mt-3 p-2 text-center"
            style={{ background: "#f8d7da", color: "#721c24", borderRadius: "4px" }}
          >
            {messages[action]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="userlistcontainer">
      <div className="userlist1">
        <div className="userlist2">
          <h6>Credit Recharge</h6>
        </div>
      </div>

      <div className="userlist6">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
          {renderCard("add")}
          {renderCard("deduct")}
        </div>
      </div>
    </div>
  );
};

export default HOC(AddCreditRecharge);
